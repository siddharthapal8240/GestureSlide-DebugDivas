import { useState, useEffect } from 'react';
import { FaUpload, FaHistory, FaPlay, FaTimes } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('new-presentation');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [presentations, setPresentations] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadMessage('');
      setIsUploaded(false);
      setPdfUrl('');
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setUploadMessage('');
    setIsUploaded(false);
    setPdfUrl('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Please select a file first');
      return;
    }

    setIsLoading(true);
    setUploadMessage('');

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage('File uploaded successfully');
      setIsUploaded(true);
      setPdfUrl(response.data.pdfUrl);
    } catch (error) {
      setUploadMessage('Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartPresentation = async () => {
    if (!pdfUrl) {
      setUploadMessage('No uploaded file to present');
      return;
    }

    setIsLoading(true);
    setUploadMessage('Starting presentation...');

    try {
      await axios.post('http://localhost:5001/api/start', { pdfUrl });
      setUploadMessage('Presentation started!');
    } catch (error) {
      setUploadMessage('Failed to start presentation.');
      console.error('Start presentation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPresentations = async () => {
    setHistoryLoading(true);
    setHistoryError('');
    try {
      const response = await axios.get('http://localhost:5001/api/presentations');
      setPresentations(response.data);
    } catch (error) {
      setHistoryError('Failed to load presentation history.');
      console.error('Fetch presentations error:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleView = (pdfUrl) => {
    window.open(pdfUrl, '_blank'); // Open PDF in new tab
  };

  const handlePlay = async (pdfUrl) => {
    try {
      await axios.post('http://localhost:5001/api/start', { pdfUrl });
      alert('Presentation started!');
    } catch (error) {
      console.error('Start presentation error:', error);
      alert('Failed to start presentation.');
    }
  };

  useEffect(() => {
    if (selectedTab === 'history') {
      fetchPresentations();
    }
  }, [selectedTab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-xl shadow-2xl border border-blue-500/30 overflow-hidden">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex">
              <button
                onClick={() => setSelectedTab('new-presentation')}
                className={`${
                  selectedTab === 'new-presentation'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium transition-colors duration-200`}
              >
                New Presentation
              </button>
              <button
                onClick={() => setSelectedTab('history')}
                className={`${
                  selectedTab === 'history'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium transition-colors duration-200`}
              >
                History
              </button>
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'history' && (
              <div className="overflow-x-auto">
                {historyLoading ? (
                  <div className="text-center py-12 text-gray-400">Loading history...</div>
                ) : historyError ? (
                  <div className="text-center py-12 text-red-400">{historyError}</div>
                ) : presentations.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">No presentation history available.</div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Created Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {presentations.map((presentation) => (
                        <tr key={presentation._id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            {new Date(presentation.uploadedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-4">
                              <button
                                onClick={() => handleView(presentation.pdfUrl)}
                                className="text-blue-400 hover:text-blue-300 transition duration-200"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handlePlay(presentation.pdfUrl)}
                                className="text-green-400 hover:text-green-300 transition duration-200"
                              >
                                <FaPlay className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {selectedTab === 'new-presentation' && (
              <div className="text-center py-12">
                <div className="bg-gray-900/50 p-8 rounded-xl border border-blue-500/30">
                  {!selectedFile && (
                    <>
                      <FaUpload className="mx-auto h-12 w-12 text-blue-400" />
                      <h3 className="mt-4 text-xl font-medium text-white">New Presentation</h3>
                      <p className="mt-2 text-gray-400">Upload your PowerPoint or PDF presentation</p>
                    </>
                  )}

                  {!selectedFile ? (
                    <div className="mt-8">
                      <input
                        type="file"
                        className="hidden"
                        id="file-upload"
                        accept=".ppt,.pptx,.pdf"
                        onChange={handleFileSelect}
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-300 shadow-lg"
                      >
                        Select File
                      </label>
                    </div>
                  ) : (
                    <div className="mt-8">
                      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-4 mb-6 flex items-center justify-between">
                        <span className="text-gray-300">{selectedFile.name}</span>
                        <button
                          onClick={clearSelectedFile}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      <div className="mb-8 max-w-3xl mx-auto bg-gray-800 rounded-lg p-4 aspect-[4/3]">
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Preview will appear here
                        </div>
                      </div>

                      {!isUploaded && (
                        <button
                          onClick={handleUpload}
                          disabled={isLoading}
                          className={`bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {isLoading ? 'Uploading...' : 'Upload'}
                        </button>
                      )}

                      {isUploaded && (
                        <button
                          onClick={handleStartPresentation}
                          disabled={isLoading}
                          className={`bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {isLoading ? 'Starting...' : 'Start Presenting'}
                        </button>
                      )}

                      {uploadMessage && (
                        <p className={`mt-4 ${uploadMessage.includes('failed') ? 'text-red-400' : 'text-green-400'}`}>
                          {uploadMessage}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;