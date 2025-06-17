import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PlayIcon,
  PauseIcon,
  DocumentTextIcon,
  MicrophoneIcon,
  ChartBarIcon,
  ClockIcon,
  EyeIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

interface PodcastItem {
  id: string;
  title: string;
  paperTitle: string;
  duration: string;
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  thumbnail: string;
  plays: number;
  description: string;
}

const Dashboard = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  // Mock data - in a real app, this would come from an API
  const podcasts: PodcastItem[] = [
    {
      id: '1',
      title: 'Neural Networks in Climate Modeling',
      paperTitle: 'Deep Learning Approaches to Climate Prediction: A Comprehensive Analysis',
      duration: '12:34',
      createdAt: '2024-01-15',
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop',
      plays: 45,
      description: 'An engaging exploration of how neural networks are revolutionizing climate modeling...',
    },
    {
      id: '2',
      title: 'Quantum Computing Breakthroughs',
      paperTitle: 'Recent Advances in Quantum Error Correction',
      duration: '15:22',
      createdAt: '2024-01-12',
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
      plays: 78,
      description: 'Discover the latest breakthroughs in quantum error correction and their implications...',
    },
    {
      id: '3',
      title: 'AI Ethics in Healthcare',
      paperTitle: 'Ethical Considerations in AI-Driven Medical Diagnosis',
      duration: '18:45',
      createdAt: '2024-01-10',
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      plays: 92,
      description: 'A thoughtful analysis of ethical challenges in AI healthcare applications...',
    },
    {
      id: '4',
      title: 'Renewable Energy Optimization',
      paperTitle: 'Machine Learning for Smart Grid Optimization',
      duration: '0:00',
      createdAt: '2024-01-14',
      status: 'processing',
      thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&h=200&fit=crop',
      plays: 0,
      description: 'Processing...',
    },
  ];

  const stats = [
    { label: 'Total Podcasts', value: '23', icon: MicrophoneIcon },
    { label: 'Total Plays', value: '1.2K', icon: PlayIcon },
    { label: 'Hours Created', value: '8.5', icon: ClockIcon },
    { label: 'Papers Processed', value: '45', icon: DocumentTextIcon },
  ];

  const togglePlay = (podcastId: string) => {
    if (currentlyPlaying === podcastId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(podcastId);
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
              <p className="text-xl text-gray-600 mt-2">
                Manage your research podcasts and track your progress
              </p>
            </div>
            <Link to="/upload" className="btn-primary mt-4 sm:mt-0">
              Upload New Paper
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your Podcast Library</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ChartBarIcon className="w-4 h-4" />
                <span>Sorted by recent</span>
              </div>
            </div>

            <div className="space-y-4">
              {podcasts.map((podcast, index) => (
                <motion.div
                  key={podcast.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-all duration-300 border border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 flex-shrink-0">
                      {podcast.status === 'completed' ? (
                        <img
                          src={podcast.thumbnail}
                          alt={podcast.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <MicrophoneIcon className="w-8 h-8 text-white" />
                        </div>
                      )}
                      
                      {/* Status Overlay */}
                      {podcast.status === 'processing' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {podcast.title}
                          </h3>
                          <p className="text-sm text-gray-600 truncate">
                            {podcast.paperTitle}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {podcast.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-4 ml-4">
                          {/* Stats */}
                          <div className="text-right text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <EyeIcon className="w-4 h-4" />
                              <span>{podcast.plays}</span>
                            </div>
                            <div>{podcast.duration}</div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2">
                            {podcast.status === 'completed' && (
                              <>
                                <button
                                  onClick={() => togglePlay(podcast.id)}
                                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                                >
                                  {currentlyPlaying === podcast.id ? (
                                    <PauseIcon className="w-5 h-5" />
                                  ) : (
                                    <PlayIcon className="w-5 h-5 ml-0.5" />
                                  )}
                                </button>
                                <button className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center transition-colors">
                                  <ShareIcon className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            
                            {podcast.status === 'processing' && (
                              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                Processing...
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {podcasts.length === 0 && (
              <div className="text-center py-12">
                <MicrophoneIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No podcasts yet</h3>
                <p className="text-gray-600 mb-6">
                  Upload your first research paper to create your first podcast
                </p>
                <Link to="/upload" className="btn-primary">
                  Upload Paper
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 