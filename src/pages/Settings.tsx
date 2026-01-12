import { useState } from 'react';
import { User, Bell, Shield, Wallet, Globe, Save, Check } from 'lucide-react';
import { useStore } from '../store';

export function Settings() {
  const { user, isAuthenticated, setActiveTab } = useStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    twitter: user?.socialLinks?.twitter || '',
    github: user?.socialLinks?.github || '',
    linkedin: user?.socialLinks?.linkedin || '',
    notifications: true,
    emailNotifications: true,
    twoFactor: false,
    defaultNetwork: 'base',
  });

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <User size={64} className="text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-slate-400 mb-6">Login to manage your account settings</p>
        <button
          onClick={() => setActiveTab('login')}
          className="px-6 py-3 bg-electric rounded-lg text-white font-medium hover:bg-electric-700 transition-all"
        >
          Login
        </button>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-48 shrink-0">
          <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeSection === section.id
                    ? 'bg-electric text-white'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <section.icon size={18} />
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
              
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-electric to-blue-400 flex items-center justify-center text-white font-bold text-2xl">
                  {formData.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm hover:bg-slate-700 transition-all">
                    Change Avatar
                  </button>
                  <p className="text-slate-500 text-xs mt-1">JPG, PNG or GIF. Max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-3">Social Links</label>
                <div className="space-y-3">
                  {[
                    { key: 'twitter', placeholder: 'Twitter username' },
                    { key: 'github', placeholder: 'GitHub username' },
                    { key: 'linkedin', placeholder: 'LinkedIn profile URL' },
                  ].map((field) => (
                    <input
                      key={field.key}
                      type="text"
                      value={formData[field.key as keyof typeof formData] as string}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Notification Settings</h2>
              
              {[
                { key: 'notifications', label: 'Push Notifications', description: 'Receive push notifications for important updates' },
                { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email updates about your portfolio' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{item.label}</p>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, [item.key]: !formData[item.key as keyof typeof formData] })}
                    className={`w-12 h-6 rounded-full transition-all ${
                      formData[item.key as keyof typeof formData] ? 'bg-electric' : 'bg-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-all ${
                      formData[item.key as keyof typeof formData] ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Security Settings</h2>
              
              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => setFormData({ ...formData, twoFactor: !formData.twoFactor })}
                  className={`w-12 h-6 rounded-full transition-all ${
                    formData.twoFactor ? 'bg-electric' : 'bg-slate-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-all ${
                    formData.twoFactor ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="p-4 bg-slate-800/30 rounded-lg">
                <p className="text-white font-medium mb-2">Change Password</p>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
                  />
                  <button className="px-4 py-2 bg-electric rounded-lg text-white font-medium hover:bg-electric-700 transition-all">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'wallet' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Connected Wallets</h2>
              
              <div className="p-4 bg-slate-800/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">MetaMask</p>
                    <p className="text-slate-400 text-sm font-mono">{user?.walletAddress || '0x1234...5678'}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Primary</span>
              </div>

              <button className="w-full py-3 bg-slate-800 border border-slate-700 border-dashed rounded-lg text-slate-400 hover:text-white hover:border-electric/50 transition-all">
                + Add Another Wallet
              </button>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Preferences</h2>
              
              <div>
                <label className="block text-slate-400 text-sm mb-2">Default Network</label>
                <select
                  value={formData.defaultNetwork}
                  onChange={(e) => setFormData({ ...formData, defaultNetwork: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
                >
                  <option value="base">Base</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="solana">Solana</option>
                </select>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-electric rounded-lg text-white font-medium hover:bg-electric-700 transition-all"
            >
              {saved ? <Check size={20} /> : <Save size={20} />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
