// Analytics Service for CAMP Marketplace
// Tracks user interactions, ecosystem navigation, and conversion events

export type AnalyticsEventType = 
  | 'page_view'
  | 'agent_view'
  | 'agent_trade_click'
  | 'wallet_connect'
  | 'wallet_disconnect'
  | 'ecosystem_link_click'
  | 'external_link_click'
  | 'search_query'
  | 'filter_change'
  | 'tab_change'
  | 'spotlight_interaction'
  | 'camper_profile_view'
  | 'build_agent_click';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  properties?: Record<string, unknown>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private userId: string | null = null;
  private isEnabled: boolean = true;

  constructor() {
    this.sessionId = this.generateSessionId();
    
    // Track page views on route changes
    if (typeof window !== 'undefined') {
      this.trackPageView();
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private createEvent(type: AnalyticsEventType, properties?: Record<string, unknown>): AnalyticsEvent {
    return {
      type,
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId || undefined,
    };
  }

  // Set user ID after wallet connection
  setUserId(userId: string | null): void {
    this.userId = userId;
  }

  // Enable/disable tracking
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  // Core tracking method
  track(type: AnalyticsEventType, properties?: Record<string, unknown>): void {
    if (!this.isEnabled) return;

    const event = this.createEvent(type, properties);
    this.events.push(event);

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('[Analytics]', type, properties);
    }

    // Send to analytics endpoint (placeholder for real implementation)
    this.sendToAnalytics(event);
  }

  // Send event to analytics backend
  private async sendToAnalytics(event: AnalyticsEvent): Promise<void> {
    // Placeholder for real analytics integration (e.g., Google Analytics, Mixpanel, Amplitude)
    // In production, replace with actual API call
    
    const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    if (analyticsEndpoint) {
      try {
        await fetch(analyticsEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        });
      } catch (error) {
        console.error('Analytics send error:', error);
      }
    }
  }

  // Convenience methods for common events
  trackPageView(pageName?: string): void {
    this.track('page_view', {
      page: pageName || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      referrer: typeof document !== 'undefined' ? document.referrer : '',
    });
  }

  trackAgentView(agentId: string, agentName: string, source?: string): void {
    this.track('agent_view', { agentId, agentName, source });
  }

  trackTradeClick(agentId: string, agentSymbol: string): void {
    this.track('agent_trade_click', { agentId, agentSymbol });
  }

  trackWalletConnect(address: string, chainId: number): void {
    this.track('wallet_connect', { 
      address: `${address.slice(0, 6)}...${address.slice(-4)}`,
      chainId,
    });
  }

  trackWalletDisconnect(): void {
    this.track('wallet_disconnect');
  }

  trackEcosystemLinkClick(linkId: string, linkUrl: string, linkLabel: string): void {
    this.track('ecosystem_link_click', { linkId, linkUrl, linkLabel });
  }

  trackExternalLink(url: string, label: string): void {
    this.track('external_link_click', { url, label });
  }

  trackSearch(query: string, resultsCount: number): void {
    this.track('search_query', { query, resultsCount });
  }

  trackTabChange(tabId: string, previousTab?: string): void {
    this.track('tab_change', { tabId, previousTab });
  }

  trackSpotlightInteraction(action: 'view' | 'trade' | 'share' | 'favorite', agentId: string): void {
    this.track('spotlight_interaction', { action, agentId });
  }

  trackBuildAgentClick(source: string): void {
    this.track('build_agent_click', { source });
  }

  // Get analytics summary (for debugging/admin)
  getSummary(): { totalEvents: number; eventCounts: Record<string, number> } {
    const eventCounts: Record<string, number> = {};
    this.events.forEach(event => {
      eventCounts[event.type] = (eventCounts[event.type] || 0) + 1;
    });
    return {
      totalEvents: this.events.length,
      eventCounts,
    };
  }

  // Clear events (for testing)
  clearEvents(): void {
    this.events = [];
  }
}

// Export singleton
export const analytics = new AnalyticsService();

// React hook for analytics
export const useAnalytics = () => {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackAgentView: analytics.trackAgentView.bind(analytics),
    trackTradeClick: analytics.trackTradeClick.bind(analytics),
    trackWalletConnect: analytics.trackWalletConnect.bind(analytics),
    trackWalletDisconnect: analytics.trackWalletDisconnect.bind(analytics),
    trackEcosystemLinkClick: analytics.trackEcosystemLinkClick.bind(analytics),
    trackExternalLink: analytics.trackExternalLink.bind(analytics),
    trackSearch: analytics.trackSearch.bind(analytics),
    trackTabChange: analytics.trackTabChange.bind(analytics),
    trackSpotlightInteraction: analytics.trackSpotlightInteraction.bind(analytics),
    trackBuildAgentClick: analytics.trackBuildAgentClick.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics),
  };
};
