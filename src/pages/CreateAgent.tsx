import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Rocket, Info, Check, AlertCircle } from 'lucide-react';
import { useStore } from '../store';
import { CreateAgentForm, AgentCategory } from '../types';

const categories: AgentCategory[] = ['Finance', 'Trading', 'Healthcare', 'Logistics', 'Legal', 'Creative'];

export function CreateAgent() {
  const { isAuthenticated, setActiveTab, createAgent } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateAgentForm>({
    defaultValues: {
      revenueCreator: 40,
      revenueHolders: 30,
      revenueTreasury: 20,
      revenueEcosystem: 10,
    }
  });

  const revenueCreator = watch('revenueCreator');
  const revenueHolders = watch('revenueHolders');
  const revenueTreasury = watch('revenueTreasury');
  const revenueEcosystem = watch('revenueEcosystem');
  const totalRevenue = (revenueCreator || 0) + (revenueHolders || 0) + (revenueTreasury || 0) + (revenueEcosystem || 0);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Rocket size={64} className="text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Login Required</h2>
        <p className="text-slate-400 mb-6">You need to be logged in to create an AI agent</p>
        <button
          onClick={() => setActiveTab('login')}
          className="px-6 py-3 bg-electric rounded-lg text-white font-medium hover:bg-electric-700 transition-all"
        >
          Login / Connect Wallet
        </button>
      </div>
    );
  }

  const onSubmit = async (data: CreateAgentForm) => {
    if (totalRevenue !== 100) return;
    
    setIsSubmitting(true);
    try {
      await createAgent({
        name: data.name,
        symbol: data.symbol.toUpperCase(),
        description: data.description,
        category: data.category,
        totalSupply: data.initialSupply,
        websiteUrl: data.websiteUrl,
        githubUrl: data.githubUrl,
        revenueSplit: {
          creator: data.revenueCreator,
          holders: data.revenueHolders,
          treasury: data.revenueTreasury,
          ecosystem: data.revenueEcosystem,
        },
      });
      setSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
          <Check size={40} className="text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Agent Created Successfully!</h2>
        <p className="text-slate-400 mb-6">Your AI agent is now live on the marketplace</p>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('marketplace')}
            className="px-6 py-3 bg-electric rounded-lg text-white font-medium hover:bg-electric-700 transition-all"
          >
            View Marketplace
          </button>
          <button
            onClick={() => { setSuccess(false); }}
            className="px-6 py-3 bg-slate-700 rounded-lg text-white font-medium hover:bg-slate-600 transition-all"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create AI Agent</h1>
        <p className="text-slate-400">Deploy your AI agent as a LayerZero OFT token on Base</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Agent Name *</label>
              <input
                {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Min 3 characters' } })}
                placeholder="e.g. AlphaTrader AI"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <label className="block text-slate-400 text-sm mb-2">Token Symbol *</label>
              <input
                {...register('symbol', { 
                  required: 'Symbol is required', 
                  minLength: { value: 2, message: 'Min 2 characters' },
                  maxLength: { value: 10, message: 'Max 10 characters' },
                  pattern: { value: /^[A-Za-z]+$/, message: 'Letters only' }
                })}
                placeholder="e.g. ALPHA"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white uppercase focus:outline-none focus:border-electric"
              />
              {errors.symbol && <p className="text-red-400 text-xs mt-1">{errors.symbol.message}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-slate-400 text-sm mb-2">Category *</label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div className="mt-4">
            <label className="block text-slate-400 text-sm mb-2">Description *</label>
            <textarea
              {...register('description', { required: 'Description is required', minLength: { value: 50, message: 'Min 50 characters' } })}
              rows={4}
              placeholder="Describe what your AI agent does and its unique capabilities..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric resize-none"
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>
        </div>

        {/* Tokenomics */}
        <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Tokenomics</h2>
          
          <div>
            <label className="block text-slate-400 text-sm mb-2">Initial Supply *</label>
            <input
              {...register('initialSupply', { required: 'Initial supply is required' })}
              type="number"
              placeholder="e.g. 1000000"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
            />
            {errors.initialSupply && <p className="text-red-400 text-xs mt-1">{errors.initialSupply.message}</p>}
          </div>
        </div>

        {/* Revenue Split */}
        <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Revenue Distribution</h2>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
              totalRevenue === 100 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {totalRevenue === 100 ? <Check size={16} /> : <AlertCircle size={16} />}
              <span className="text-sm font-medium">Total: {totalRevenue}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'revenueCreator', label: 'Creator', color: 'electric' },
              { name: 'revenueHolders', label: 'Holders', color: 'green-400' },
              { name: 'revenueTreasury', label: 'Treasury', color: 'purple-400' },
              { name: 'revenueEcosystem', label: 'Ecosystem', color: 'orange-400' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-slate-400 text-sm mb-2">{field.label} %</label>
                <input
                  {...register(field.name as keyof CreateAgentForm, { valueAsNumber: true })}
                  type="number"
                  min={0}
                  max={100}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-slate-800/50 rounded-lg flex items-start gap-2">
            <Info size={16} className="text-slate-400 mt-0.5 shrink-0" />
            <p className="text-slate-400 text-sm">
              Revenue from agent usage will be distributed according to these percentages. Total must equal 100%.
            </p>
          </div>
        </div>

        {/* Optional Links */}
        <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Optional Links</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Website URL</label>
              <input
                {...register('websiteUrl')}
                type="url"
                placeholder="https://..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">GitHub URL</label>
              <input
                {...register('githubUrl')}
                type="url"
                placeholder="https://github.com/..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || totalRevenue !== 100}
          className="w-full py-4 bg-electric rounded-lg text-white font-semibold hover:bg-electric-700 transition-all disabled:bg-electric/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Deploying Agent...
            </>
          ) : (
            <>
              <Rocket size={20} />
              Deploy Agent
            </>
          )}
        </button>

        <p className="text-slate-500 text-sm text-center">
          By deploying, you agree to the platform terms and conditions. Deployment requires gas fees on Base network.
        </p>
      </form>
    </div>
  );
}
