import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  EnvelopeIcon,
  BellIcon,
  ShieldCheckIcon,
  CogIcon,
  ChartBarIcon,
  AcademicCapIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface UserProfile {
  name: string;
  email: string;
  title: string;
  institution: string;
  bio: string;
  avatar: string;
  joinedDate: string;
  totalPodcasts: number;
  totalPlays: number;
  totalHours: number;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    title: 'Assistant Professor',
    institution: 'Stanford University',
    bio: 'Researcher focused on artificial intelligence, machine learning, and their applications in climate science. Passionate about making complex research accessible through innovative communication methods.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b68565c1?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2023-09-15',
    totalPodcasts: 23,
    totalPlays: 1247,
    totalHours: 8.5,
  });

  const [editForm, setEditForm] = useState(profile);
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    podcastReady: true,
    weeklyDigest: false,
    collaborationRequests: true,
  });

  const achievements = [
    { title: 'First Podcast', description: 'Created your first research podcast', earned: true },
    { title: 'Popular Creator', description: 'Reached 1000+ total plays', earned: true },
    { title: 'Consistent Publisher', description: 'Published 10+ podcasts', earned: true },
    { title: 'Collaboration Expert', description: 'Collaborated with 5+ researchers', earned: false },
    { title: 'Thought Leader', description: 'Reached 10,000+ total plays', earned: false },
  ];

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
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
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text">Profile Settings</h1>
            <p className="text-xl text-gray-600 mt-2">
              Manage your account and preferences
            </p>
          </div>

          {/* Profile Overview */}
          <div className="glass rounded-3xl p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-2xl object-cover"
                />
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-lg text-gray-600">{profile.title}</p>
                    <p className="text-gray-500">{profile.institution}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-secondary md:ml-4"
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{profile.totalPodcasts}</div>
                <div className="text-sm text-gray-600">Total Podcasts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{profile.totalPlays.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Plays</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{profile.totalHours}h</div>
                <div className="text-sm text-gray-600">Content Created</div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold mb-6">Edit Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={editForm.institution}
                    onChange={(e) => setEditForm({ ...editForm, institution: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button onClick={handleCancel} className="btn-secondary">
                  <XMarkIcon className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-primary">
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Achievements */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <AcademicCapIcon className="w-6 h-6 mr-2 text-blue-600" />
              Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.title}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    achievement.earned
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    >
                      <CheckIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <BellIcon className="w-6 h-6 mr-2 text-blue-600" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {key === 'emailUpdates' && 'Receive email notifications about your account'}
                      {key === 'podcastReady' && 'Get notified when your podcasts are ready'}
                      {key === 'weeklyDigest' && 'Weekly summary of your activity'}
                      {key === 'collaborationRequests' && 'Notifications about collaboration invites'}
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Account Actions */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <ShieldCheckIcon className="w-6 h-6 mr-2 text-blue-600" />
              Account & Security
            </h3>
            <div className="space-y-4">
              <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Change Password</h4>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <CogIcon className="w-5 h-5 text-gray-400" />
                </div>
              </button>
              
              <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Export Data</h4>
                    <p className="text-sm text-gray-600">Download your account data</p>
                  </div>
                  <ChartBarIcon className="w-5 h-5 text-gray-400" />
                </div>
              </button>
              
              <button className="w-full text-left p-4 rounded-lg border border-red-200 hover:bg-red-50 transition-colors text-red-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-red-500">Permanently delete your account and data</p>
                  </div>
                  <XMarkIcon className="w-5 h-5 text-red-400" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile; 