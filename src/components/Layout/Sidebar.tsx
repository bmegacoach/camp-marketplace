import { Store, Briefcase, PlusCircle, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../store';

const navItems = [
  { id: 'marketplace', label: 'Marketplace', icon: Store },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'create', label: 'Create Agent', icon: PlusCircle },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, activeTab, setActiveTab, logout, isAuthenticated } = useStore();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-navy-50 border-r border-slate-700/50 transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-electric flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          {sidebarOpen && (
            <span className="text-white font-semibold text-lg">CAMP</span>
          )}
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-electric text-white'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <Icon size={22} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      {isAuthenticated && (
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <LogOut size={22} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      )}
    </aside>
  );
}
