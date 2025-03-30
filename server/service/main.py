import cv2
import numpy as np
from cvzone.HandTrackingModule import HandDetector
import requests
from pdf2image import convert_from_bytes
import sys

# Parameters
width, height = 1280, 720
gestureThreshold = 300
delay = 30
hs, ws = int(120 * 1), int(213 * 1)

cap = cv2.VideoCapture(1)  # Adjust to 0 if 1 doesn’t work
if not cap.isOpened():
    print("Error: Could not open camera.")
    sys.exit(1)
cap.set(3, width)
cap.set(4, height)

detectorHand = HandDetector(detectionCon=0.8, maxHands=1)

buttonPressed = False
counter = 0
imgNumber = 0

def load_pdf_from_url(pdf_url):
    try:
        response = requests.get(pdf_url)
        if response.status_code != 200:
            raise Exception(f"Failed to download PDF: HTTP {response.status_code}")
        images = convert_from_bytes(response.content, dpi=200)
        return [np.array(img) for img in images]
    except Exception as e:
        print(f"Error loading PDF: {e}")
        sys.exit(1)

def create_whiteboard():
    # Create a white image with the same dimensions as other slides
    whiteboard = np.ones((height, width, 3), dtype=np.uint8) * 255  # White in BGR
    return whiteboard

def main(pdf_url):
    global imgNumber, counter, buttonPressed
    pathImages = load_pdf_from_url(pdf_url)
    if not pathImages:
        print("No images loaded from PDF.")
        sys.exit(1)
    print(f"Loaded {len(pathImages)} slides from PDF.")

    # Initialize annotations and whiteboard flags as lists, one per slide
    annotations = [[] for _ in range(len(pathImages))]
    isWhiteboard = [False] * len(pathImages)  # Track which slides are whiteboards
    annotationNumber = -1  
    annotationStart = False

    while True:
        success, img = cap.read()
        if not success:
            print("Error: Failed to capture webcam image.")
            break
        img = cv2.flip(img, 1)

        if imgNumber >= len(pathImages):
            imgNumber = 0

        imgCurrent = cv2.resize(pathImages[imgNumber], (width, height)).copy()

        hands, img = detectorHand.findHands(img)
        cv2.line(img, (0, gestureThreshold), (width, gestureThreshold), (0, 255, 0), 10)

        if hands and not buttonPressed:
            hand = hands[0]
            cx, cy = hand["center"]
            lmList = hand["lmList"]
            fingers = detectorHand.fingersUp(hand)

            xVal = int(np.interp(lmList[8][0], [width // 2, width], [0, width]))
            yVal = int(np.interp(lmList[8][1], [150, height - 150], [0, height]))
            indexFinger = (xVal, yVal)

            if cy <= gestureThreshold:
                if fingers == [1, 0, 0, 0, 0]:
                    print("Left Swipe - Previous Slide")
                    buttonPressed = True
                    if imgNumber > 0:
                        imgNumber -= 1
                        annotationNumber = len(annotations[imgNumber]) - 1 if annotations[imgNumber] else -1
                        annotationStart = False
                elif fingers == [0, 0, 0, 0, 1]:
                    print("Right Swipe - Next Slide")
                    buttonPressed = True
                    if imgNumber < len(pathImages) - 1:
                        imgNumber += 1
                        annotationNumber = len(annotations[imgNumber]) - 1 if annotations[imgNumber] else -1
                        annotationStart = False
                elif fingers == [0, 1, 1, 1, 1]:  # Four fingers up (except thumb)
                    print("Adding Whiteboard as Next Slide")
                    buttonPressed = True
                    whiteboard = create_whiteboard()
                    pathImages.insert(imgNumber + 1, whiteboard)
                    annotations.insert(imgNumber + 1, [])
                    isWhiteboard.insert(imgNumber + 1, True)  # Mark as whiteboard
                    imgNumber += 1  # Move to the new whiteboard
                    annotationNumber = -1
                    annotationStart = False

            if fingers == [0, 1, 0, 0, 0]:
                if not annotationStart:
                    annotationStart = True
                    annotationNumber += 1
                    if annotationNumber >= len(annotations[imgNumber]):
                        annotations[imgNumber].append([])  
                annotations[imgNumber][annotationNumber].append(indexFinger)
                cv2.circle(imgCurrent, indexFinger, 12, (0, 0, 255), cv2.FILLED)
            elif fingers == [0, 1, 1, 0, 0]:
                cv2.circle(imgCurrent, indexFinger, 12, (0, 0, 255), cv2.FILLED)
            elif fingers == [0, 1, 1, 1, 0]:  # Three fingers (undo)
                buttonPressed = True
                if annotations[imgNumber]:  # If there are annotations, undo the last one
                    print("Undoing Last Annotation")
                    annotations[imgNumber].pop(-1)
                    annotationNumber -= 1
                    annotationStart = False
                elif isWhiteboard[imgNumber]:  # If no annotations and it’s a whiteboard, delete it
                    print("Deleting Whiteboard Slide")
                    del pathImages[imgNumber]
                    del annotations[imgNumber]
                    del isWhiteboard[imgNumber]
                    if imgNumber >= len(pathImages):  # Adjust if deleted last slide
                        imgNumber = len(pathImages) - 1
                    if imgNumber < 0:  # Prevent negative index
                        imgNumber = 0
                    annotationNumber = len(annotations[imgNumber]) - 1 if annotations[imgNumber] else -1
                    annotationStart = False
            else:
                annotationStart = False
        else:
            annotationStart = False

        if buttonPressed:
            counter += 1
            if counter > delay:
                counter = 0
                buttonPressed = False

        # Draw all annotations for the current slide
        for annotation in annotations[imgNumber]:
            for j in range(1, len(annotation)):
                cv2.line(imgCurrent, annotation[j - 1], annotation[j], (0, 0, 200), 12)

        imgSmall = cv2.resize(img, (ws, hs))
        imgCurrent[0:hs, width - ws:width] = imgSmall

        cv2.imshow("Slides", imgCurrent)
        cv2.imshow("Image", img)

        key = cv2.waitKey(1)
        if key == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python main.py <pdf_url>")
        sys.exit(1)
    pdf_url = sys.argv[1]
    main(pdf_url)