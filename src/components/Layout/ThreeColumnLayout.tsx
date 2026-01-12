import { ReactNode } from 'react';
import { Flame, Trophy, Filter } from 'lucide-react';

interface ThreeColumnLayoutProps {
  leftColumn: {
    title: string;
    content: ReactNode;
  };
  centerColumn: ReactNode;
  rightColumn: {
    title: string;
    tabs?: { id: string; label: string }[];
    activeTab?: string;
    onTabChange?: (tab: string) => void;
    content: ReactNode;
  };
}

export default function ThreeColumnLayout({
  leftColumn,
  centerColumn,
  rightColumn,
}: ThreeColumnLayoutProps) {
  return (
    <div className="container-main py-8">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column - Trending */}
        <div className="xl:col-span-3">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="w-5 h-5 text-semantic-warning" />
              <h2 className="text-heading-lg font-semibold text-text-primary">
                {leftColumn.title}
              </h2>
            </div>
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
              {leftColumn.content}
            </div>
          </div>
        </div>

        {/* Center Column - Spotlight */}
        <div className="xl:col-span-6">
          {centerColumn}
        </div>

        {/* Right Column - Top Performers */}
        <div className="xl:col-span-3">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-rank-gold" />
                <h2 className="text-heading-lg font-semibold text-text-primary">
                  {rightColumn.title}
                </h2>
              </div>
            </div>

            {/* Tabs if provided */}
            {rightColumn.tabs && (
              <div className="flex gap-2 mb-4">
                {rightColumn.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => rightColumn.onTabChange?.(tab.id)}
                    className={`px-3 py-1.5 rounded-sm text-body-sm font-medium transition-all ${
                      rightColumn.activeTab === tab.id
                        ? 'bg-accent-primary-muted text-accent-primary'
                        : 'bg-bg-surface text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
              {rightColumn.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
