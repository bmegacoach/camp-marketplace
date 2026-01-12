import { useState } from 'react';
import { Wallet, Mail, ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { useStore } from '../store';

export function Login() {
  const { login, isLoading, setActiveTab } = useStore();
  const [loginMethod, setLoginMethod] = useState<'wallet' | 'email'>('wallet');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    setActiveTab('marketplace');
  };

  const handleWalletConnect = async () => {
    // Simulate wallet connection
    await login('wallet@user.com', '');
    setActiveTab('marketplace');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-electric mx-auto flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to CAMP</h1>
          <p className="text-slate-400">AI Agent Marketplace</p>
        </div>

        {/* Login Card */}
        <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
          {/* Method Toggle */}
          <div className="flex bg-slate-800 rounded-lg p-1 mb-6">
            <button
              onClick={() => setLoginMethod('wallet')}
              className={`flex-1 py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-all ${
                loginMethod === 'wallet' ? 'bg-electric text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wallet size={18} />
              Wallet
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-all ${
                loginMethod === 'email' ? 'bg-electric text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail size={18} />
              Email
            </button>
          </div>

          {loginMethod === 'wallet' ? (
            <div className="space-y-3">
              <button
                onClick={handleWalletConnect}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-electric/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <span className="text-white font-medium">MetaMask</span>
                </div>
                <ArrowRight className="text-slate-400 group-hover:text-electric transition-colors" size={20} />
              </button>

              <button
                onClick={handleWalletConnect}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-electric/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <span className="text-white font-medium">Coinbase Wallet</span>
                </div>
                <ArrowRight className="text-slate-400 group-hover:text-electric transition-colors" size={20} />
              </button>

              <button
                onClick={handleWalletConnect}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-electric/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold">W</span>
                  </div>
                  <span className="text-white font-medium">WalletConnect</span>
                </div>
                <ArrowRight className="text-slate-400 group-hover:text-electric transition-colors" size={20} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-electric rounded-lg text-white font-semibold hover:bg-electric-700 transition-all disabled:bg-electric/50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
              <p className="text-center text-slate-400 text-sm">
                Don't have an account?{' '}
                <button type="button" className="text-electric hover:underline">
                  Sign up
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: Shield, label: 'Secure' },
            { icon: Zap, label: 'Fast' },
            { icon: Users, label: 'Trusted' },
          ].map((feature, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-lg bg-slate-800/50 border border-slate-700 mx-auto flex items-center justify-center mb-2">
                <feature.icon className="text-electric" size={20} />
              </div>
              <p className="text-slate-400 text-sm">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
