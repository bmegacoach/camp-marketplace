import { useEffect, useState } from 'react';
import { Filter, Grid3X3, List, SortAsc } from 'lucide-react';
import { useStore } from '../store';
import { AgentCard } from '../components/Marketplace/AgentCard';
import { AgentCategory } from '../types';

const categories: (AgentCategory | 'All')[] = ['All', 'Finance', 'Trading', 'Healthcare', 'Logistics', 'Legal', 'Creative'];
const sortOptions = [
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'change-desc', label: 'Top Gainers' },
  { value: 'change-asc', label: 'Top Losers' },
  { value: 'volume-desc', label: 'Most Volume' },
  { value: 'holders-desc', label: 'Most Holders' },
];

export function Marketplace() {
  const { agents, agentsLoading, fetchAgents, setSelectedAgent, setActiveTab } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<AgentCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState('volume-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const filteredAgents = agents
    .filter(agent => selectedCategory === 'All' || agent.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-desc': return parseFloat(b.currentPrice) - parseFloat(a.currentPrice);
        case 'price-asc': return parseFloat(a.currentPrice) - parseFloat(b.currentPrice);
        case 'change-desc': return b.priceChange24h - a.priceChange24h;
        case 'change-asc': return a.priceChange24h - b.priceChange24h;
        case 'volume-desc': return parseFloat(b.volume24h) - parseFloat(a.volume24h);
        case 'holders-desc': return b.holdersCount - a.holdersCount;
        default: return 0;
      }
    });

  const handleAgentClick = (agent: typeof agents[0]) => {
    setSelectedAgent(agent);
    setActiveTab('agent-detail');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Agent Marketplace</h1>
          <p className="text-slate-400">Discover, trade, and invest in AI agents powered by LayerZero OFT</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-electric text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            <Grid3X3 size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-electric text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={18} className="text-slate-400" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-electric text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 ml-auto">
          <SortAsc size={18} className="text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-electric"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Agents', value: agents.length },
          { label: 'Total Volume', value: '$2.4M' },
          { label: 'Active Traders', value: '12.5K' },
          { label: 'Total Revenue', value: '$845K' },
        ].map((stat, i) => (
          <div key={i} className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Agent Grid */}
      {agentsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-700" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-slate-700 rounded" />
                  <div className="h-3 w-16 bg-slate-700 rounded" />
                </div>
              </div>
              <div className="h-8 w-32 bg-slate-700 rounded mb-4" />
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/50">
                <div className="h-10 bg-slate-700 rounded" />
                <div className="h-10 bg-slate-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} onClick={() => handleAgentClick(agent)} />
          ))}
        </div>
      )}

      {filteredAgents.length === 0 && !agentsLoading && (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg">No agents found in this category</p>
        </div>
      )}
    </div>
  );
}
