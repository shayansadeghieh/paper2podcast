import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  podcastUrl?: string;
}

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading',
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate file upload and processing
    newFiles.forEach((uploadedFile) => {
      simulateUpload(uploadedFile.id);
    });
  }, []);

  const simulateUpload = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === 'uploading') {
            const newProgress = Math.min(file.progress + 10, 100);
            if (newProgress === 100) {
              clearInterval(uploadInterval);
              setTimeout(() => simulateProcessing(fileId), 500);
              return { ...file, progress: newProgress, status: 'processing' };
            }
            return { ...file, progress: newProgress };
          }
          return file;
        })
      );
    }, 200);
  };

  const simulateProcessing = (fileId: string) => {
    // Simulate AI processing
    setTimeout(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            return {
              ...file,
              status: 'completed',
              progress: 100,
              podcastUrl: '/api/podcast/' + fileId,
            };
          }
          return file;
        })
      );
    }, 3000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <SparklesIcon className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <DocumentTextIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'AI is analyzing and creating podcast...';
      case 'completed':
        return 'Podcast ready!';
      case 'error':
        return 'Error processing file';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">
              Upload Your <span className="gradient-text">Research Papers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Drop your research papers here and let AudioCrawl transform them into engaging podcast summaries
            </p>
          </div>

          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`glass rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? 'border-2 border-blue-400 bg-blue-50/50 scale-105'
                : 'border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
            }`}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={{ y: isDragActive ? -10 : 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                <CloudArrowUpIcon className="w-10 h-10 text-white" />
              </div>
              
              {isDragActive ? (
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-blue-600">Drop your files here!</h3>
                  <p className="text-gray-600">Release to upload your research papers</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">
                    Drag & drop your papers here
                  </h3>
                  <p className="text-gray-600">
                    or <span className="text-blue-600 font-medium">browse files</span> from your computer
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, DOC, DOCX, TXT • Max 10MB per file
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Upload Queue */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Processing Queue</h2>
              <div className="space-y-3">
                {uploadedFiles.map((uploadedFile) => (
                  <motion.div
                    key={uploadedFile.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {getStatusIcon(uploadedFile.status)}
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {uploadedFile.file.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {getStatusText(uploadedFile.status)}
                          </p>
                          
                          {/* Progress Bar */}
                          {uploadedFile.status !== 'completed' && (
                            <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${uploadedFile.progress}%`,
                                }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {uploadedFile.status === 'completed' && (
                          <button className="btn-primary text-sm px-4 py-2">
                            Listen to Podcast
                          </button>
                        )}
                        <button
                          onClick={() => removeFile(uploadedFile.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <XCircleIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">💡 Tips for Best Results</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Upload clear, well-formatted research papers for better analysis</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Papers with abstracts and clear sections work best</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Processing time depends on paper length and complexity</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Upload; 