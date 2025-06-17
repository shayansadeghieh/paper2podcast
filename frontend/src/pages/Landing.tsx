import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  MicrophoneIcon,
  SparklesIcon,
  CloudArrowUpIcon,
  PlayIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const Landing = () => {
  const features = [
    {
      icon: CloudArrowUpIcon,
      title: 'Easy Upload',
      description: 'Drag and drop your research papers or browse to upload. Supports PDF, DOC, and other formats.',
    },
    {
      icon: SparklesIcon,
      title: 'AI-Powered Analysis',
      description: 'Our advanced AI crawls the web to gather related information and context for your papers.',
    },
    {
      icon: MicrophoneIcon,
      title: 'Podcast Generation',
      description: 'Transform your research into engaging podcast summaries with natural voice synthesis.',
    },
  ];

  const stats = [
    { value: '1,000+', label: 'Papers Processed' },
    { value: '500+', label: 'Hours of Podcasts' },
    { value: '95%', label: 'User Satisfaction' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Turn Research Papers into
                  <span className="gradient-text block">Engaging Podcasts</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  AudioCrawl uses AI to analyze your research papers, crawl the web for additional context, 
                  and generate professional podcast summaries that make complex research accessible to everyone.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/upload" className="btn-primary inline-flex items-center">
                  Get Started <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
                <button className="btn-secondary inline-flex items-center">
                  <PlayIcon className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass rounded-3xl p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                  <div className="flex-1 h-3 bg-gray-200 rounded-full">
                    <div className="h-3 bg-blue-600 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Analyzing research paper...</div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-4/5"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-3/5"></div>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <MicrophoneIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Podcast ready!</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              How <span className="gradient-text">AudioCrawl</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our three-step process transforms complex research into digestible audio content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 text-center space-y-4 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">
              Ready to Transform Your Research?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of researchers who are making their work more accessible
            </p>
            <Link to="/upload" className="btn-primary inline-flex items-center text-lg px-8 py-4">
              Start Creating <ArrowRightIcon className="ml-2 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing; 