const fs = require("fs");
const path = require("path");

const SRC = path.join(process.cwd(), "src");

const replacements = {
  '@/hooks/useBudgetForm':
    '@/features/budget/hooks/useBudgetForm',

  '@/services/budgetService':
    '@/features/budget/services/budgetService',

  '@/hooks/useManagedCampaigns':
    '@/features/campaigns/hooks/useManagedCampaigns',

  '@/services/campaignService':
    '@/features/campaigns/services/campaignService',

  '@/services/managedCampaignService':
    '@/features/campaigns/services/managedCampaignService',

  '@/types/campaign':
    '@/features/campaigns/types/campaign',

  '@/types/managedCampaign':
    '@/features/campaigns/types/managedCampaign',

  '@/hooks/useInvoice':
    '@/features/payment/hooks/useInvoice',

  '@/hooks/usePaymentMethods':
    '@/features/payment/hooks/usePaymentMethods',

  '@/hooks/usePayments':
    '@/features/payment/hooks/usePayments',

  '@/services/invoiceService':
    '@/features/payment/services/invoiceService',

  '@/services/paymentMethodService':
    '@/features/payment/services/paymentMethodService',

  '@/services/paymentService':
    '@/features/payment/services/paymentService',

  '@/hooks/useNotifications':
    '@/features/notifications/hooks/useNotifications',

  '@/types/notification':
    '@/features/notifications/types/notification',

  '@/hooks/useCurrentUser':
    '@/features/profile/hooks/useCurrentUser',

  '@/services/searchService':
    '@/features/search/services/searchService',

  '@/services/dashboardService':
    '@/features/dashboard/services/dashboardService',

  '@/services/fakeFollowersService':
    '@/features/fake-followers/services/fakeFollowersService',

  '@/components/Sidebar':
    '@/shared/components/layout/Sidebar',

  '@/components/Topbar':
    '@/shared/components/layout/Topbar',

  '@/components/StatCard':
    '@/shared/components/common/StatCard',

  '@/config/api':
    '@/shared/config/api',

  '@/lib/axios':
    '@/shared/lib/axios',

  '@/lib/rateCardHelper':
    '@/shared/lib/rateCardHelper',

  '@/types':
    '@/shared/types',

  '@/data/campaigns.json':
    '@/features/campaigns/data/campaigns.json',

  '@/data/dashboard.json':
    '@/features/dashboard/data/dashboard.json',

  '@/data/search.json':
    '@/features/search/data/search.json',

  '@/data/invoices.json':
    '@/features/payment/data/invoices.json',

  '@/data/paymentMethods.json':
    '@/features/payment/data/paymentMethods.json',

  '@/data/payments.json':
    '@/features/payment/data/payments.json',

  '@/data/notifications':
    '@/features/notifications/data/notifications',
};

// budget components
[
  "Step1InputData",
  "Step2Strategy",
  "Step3SmartMatching",
  "Step4Briefing",
  "StepIndicator",
].forEach(name => {
  replacements[`@/components/budget/${name}`] =
    `@/features/budget/components/${name}`;
});

// payment components
[
  "CampaignTabs",
  "EmptyState",
  "ErrorState",
  "InvoiceSummary",
  "LoadingSkeleton",
  "PaymentCard",
  "PaymentMethodAccordion",
  "PaymentRow",
  "ProgressBar",
  "SearchBar",
  "StatusBadge",
].forEach(name => {
  replacements[`@/components/payment/${name}`] =
    `@/features/payment/components/${name}`;
});

// fake followers
[
  "AnalysisResultCard",
  "AuthenticityScoreRing",
  "FollowerBreakdownBar",
  "RiskBadge",
].forEach(name => {
  replacements[`@/components/fake-followers/${name}`] =
    `@/features/fake-followers/components/${name}`;
});

// dashboard components
[
  "ChatModal",
  "CreatorCard",
  "EditProfileModal",
  "MessagesSection",
  "PerformanceChart",
  "RateCardModal",
  "SavedCreators",
].forEach(name => {
  replacements[`@/components/${name}`] =
    `@/features/dashboard/components/${name}`;
});

function walk(dir) {
  const entries = fs.readdirSync(dir);

  for (const file of entries) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    if (!/\.(ts|tsx|js|jsx)$/.test(file)) {
      continue;
    }

    let content = fs.readFileSync(full, "utf8");

    let changed = false;

    for (const [oldPath, newPath] of Object.entries(replacements)) {
      if (content.includes(oldPath)) {
        content = content.split(oldPath).join(newPath);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(full, content);
      console.log("FIX:", full);
    }
  }
}

walk(SRC);

console.log("DONE");