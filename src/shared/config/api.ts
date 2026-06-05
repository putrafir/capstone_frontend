

interface ApiConfig {
  BASE_URL: string;
  ENDPOINTS: {
    // Dashboard
    DASHBOARD_STATS: string;
    SAVED_CREATORS: string;
    MESSAGES: string;
    
    // Campaign
    CAMPAIGNS: string;
    CAMPAIGN_DETAIL: (id: string) => string;
    CAMPAIGN_MESSAGES: (creatorId: number) => string;
    CAMPAIGN_SEND_MESSAGE: (creatorId: number) => string;
    
    // Search & Smart Matching
    SEARCH_CREATORS: string;
    
    // Budget Optimization
    STRATEGIES: string;
    INFLUENCERS: string;
    BRIEFING_TEMPLATES: string;
    
    // Payments & Invoices
    PAYMENTS: string;
    INVOICE: (id: string) => string;
    PAYMENT_METHODS: string;

    // Fake Followers Feature
    FAKE_FOLLOWERS: string; 
  };
  TIMEOUT: number;
}

const API_CONFIG: ApiConfig = {
  // Menggunakan env variable, fallback ke mock path jika kosong
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",

  TIMEOUT: 10000, // 10 detik

  ENDPOINTS: {
    // Dashboard
    DASHBOARD_STATS:      "/api/mock/dashboard/stats",
    SAVED_CREATORS:       "/api/mock/creators/saved",
    MESSAGES:             "/api/mock/messages",

    // Campaign
    CAMPAIGNS:            "/api/mock/campaigns",
    CAMPAIGN_DETAIL:      (id) => `/api/mock/campaigns/${id}`,
    CAMPAIGN_MESSAGES:    (creatorId) => `/api/mock/campaigns/messages/${creatorId}`,
    CAMPAIGN_SEND_MESSAGE:(creatorId) => `/api/mock/campaigns/messages/${creatorId}`,
    
    // Search & Smart Matching
    SEARCH_CREATORS:      "/api/mock/creators",

    // Budget Optimization
    STRATEGIES:           "/api/mock/budget/strategies",
    INFLUENCERS:          "/api/mock/budget/influencers",
    BRIEFING_TEMPLATES:   "/api/mock/budget/templates",

    // Payments & Invoices
    PAYMENTS:             "/api/mock/payments",
    INVOICE:              (id) => `/api/mock/invoices/${id}`,
    PAYMENT_METHODS:      "/api/mock/payment-methods",

    // Fake Followers Feature
    FAKE_FOLLOWERS:       "/api/mock/fake-followers",
  },
};

export default API_CONFIG;
