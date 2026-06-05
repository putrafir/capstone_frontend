// migrate-feature-based.js

const fs = require("fs");
const path = require("path");

const SRC = path.join(process.cwd(), "src");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function move(oldPath, newPath) {
  const src = path.join(SRC, oldPath);
  const dest = path.join(SRC, newPath);

  if (!fs.existsSync(src)) {
    console.log(`SKIP: ${oldPath}`);
    return;
  }

  ensureDir(path.dirname(dest));
  fs.renameSync(src, dest);

  console.log(`MOVE: ${oldPath} -> ${newPath}`);
}

const moves = [
  // BUDGET
  ["components/budget", "features/budget/components"],
  ["hooks/useBudgetForm.ts", "features/budget/hooks/useBudgetForm.ts"],
  ["services/budgetService.ts", "features/budget/services/budgetService.ts"],

  // CAMPAIGNS
  ["hooks/useManagedCampaigns.ts", "features/campaigns/hooks/useManagedCampaigns.ts"],
  ["repositories/CampaignRepository.ts", "features/campaigns/repositories/CampaignRepository.ts"],
  ["repositories/LocalCampaignRepository.ts", "features/campaigns/repositories/LocalCampaignRepository.ts"],
  ["services/campaignService.ts", "features/campaigns/services/campaignService.ts"],
  ["services/managedCampaignService.ts", "features/campaigns/services/managedCampaignService.ts"],
  ["data/campaigns.json", "features/campaigns/data/campaigns.json"],
  ["types/campaign.ts", "features/campaigns/types/campaign.ts"],
  ["types/managedCampaign.ts", "features/campaigns/types/managedCampaign.ts"],

  // DASHBOARD
  ["components/dashboard", "features/dashboard/components"],
  ["services/dashboardService.ts", "features/dashboard/services/dashboardService.ts"],
  ["data/dashboard.json", "features/dashboard/data/dashboard.json"],

  // FAKE FOLLOWERS
  ["components/fake-followers", "features/fake-followers/components"],
  ["services/fakeFollowersService.ts", "features/fake-followers/services/fakeFollowersService.ts"],

  // NOTIFICATIONS
  ["hooks/useNotifications.ts", "features/notifications/hooks/useNotifications.ts"],
  ["types/notification.ts", "features/notifications/types/notification.ts"],
  ["data/notifications.ts", "features/notifications/data/notifications.ts"],

  // PAYMENT
  ["components/payment", "features/payment/components"],
  ["hooks/useInvoice.ts", "features/payment/hooks/useInvoice.ts"],
  ["hooks/usePaymentMethods.ts", "features/payment/hooks/usePaymentMethods.ts"],
  ["hooks/usePayments.ts", "features/payment/hooks/usePayments.ts"],
  ["services/invoiceService.ts", "features/payment/services/invoiceService.ts"],
  ["services/paymentMethodService.ts", "features/payment/services/paymentMethodService.ts"],
  ["services/paymentService.ts", "features/payment/services/paymentService.ts"],
  ["data/invoices.json", "features/payment/data/invoices.json"],
  ["data/paymentMethods.json", "features/payment/data/paymentMethods.json"],
  ["data/payments.json", "features/payment/data/payments.json"],

  // PROFILE
  ["hooks/useCurrentUser.ts", "features/profile/hooks/useCurrentUser.ts"],

  // SEARCH
  ["services/searchService.ts", "features/search/services/searchService.ts"],
  ["data/search.json", "features/search/data/search.json"],

  // SHARED
  ["components/Sidebar.tsx", "shared/components/layout/Sidebar.tsx"],
  ["components/Topbar.tsx", "shared/components/layout/Topbar.tsx"],
  ["components/StatCard.tsx", "shared/components/common/StatCard.tsx"],

  ["config/api.ts", "shared/config/api.ts"],

  ["lib/axios.ts", "shared/lib/axios.ts"],
  ["lib/rateCardHelper.ts", "shared/lib/rateCardHelper.ts"],

  ["types/index.ts", "shared/types/index.ts"],
];

console.log("=== START MIGRATION ===");

for (const [from, to] of moves) {
  move(from, to);
}

console.log("=== MIGRATION FINISHED ===");

// Hapus folder kosong
function removeEmpty(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  if (files.length === 0) {
    fs.rmdirSync(dir);
    return;
  }

  files.forEach(file => {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      removeEmpty(full);
    }
  });

  const remain = fs.readdirSync(dir);

  if (remain.length === 0) {
    fs.rmdirSync(dir);
  }
}

[
  "components",
  "hooks",
  "services",
  "repositories",
  "data",
  "config",
  "lib",
  "types"
].forEach(folder => {
  removeEmpty(path.join(SRC, folder));
});

console.log("=== EMPTY FOLDERS CLEANED ===");