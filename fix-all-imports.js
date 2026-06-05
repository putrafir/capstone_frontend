// fix-all-imports.js

const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "src");

const rules = {
  "@/components/dashboard/ChatModal":
    "@/features/dashboard/components/ChatModal",

  "@/components/dashboard/CreatorCard":
    "@/features/dashboard/components/CreatorCard",

  "@/components/dashboard/MessagesSection":
    "@/features/dashboard/components/MessagesSection",

  "@/components/dashboard/SavedCreators":
    "@/features/dashboard/components/SavedCreators",

  "@/components/dashboard/EditProfileModal":
    "@/features/dashboard/components/EditProfileModal",

  "@/components/dashboard/PerformanceChart":
    "@/features/dashboard/components/PerformanceChart",

  "@/components/dashboard/RateCardModal":
    "@/features/dashboard/components/RateCardModal",

  "@/components/payment/SearchBar":
    "@/features/payment/components/SearchBar",

  "@/components/payment/StatusBadge":
    "@/features/payment/components/StatusBadge",

  "@/components/payment/PaymentCard":
    "@/features/payment/components/PaymentCard",

  "@/components/payment/LoadingSkeleton":
    "@/features/payment/components/LoadingSkeleton",

  "@/components/payment/ErrorState":
    "@/features/payment/components/ErrorState",

  "@/components/payment/EmptyState":
    "@/features/payment/components/EmptyState",

  "@/components/payment/InvoiceSummary":
    "@/features/payment/components/InvoiceSummary",

  "@/components/payment/PaymentMethodAccordion":
    "@/features/payment/components/PaymentMethodAccordion",

  "@/components/payment/PaymentRow":
    "@/features/payment/components/PaymentRow",

  "@/components/payment/CampaignTabs":
    "@/features/payment/components/CampaignTabs",

  "@/components/payment/ProgressBar":
    "@/features/payment/components/ProgressBar",

  "@/data/campaigns.json":
    "@/features/campaigns/data/campaigns.json",

  "@/data/dashboard.json":
    "@/features/dashboard/data/dashboard.json",

  "@/data/invoices.json":
    "@/features/payment/data/invoices.json",

  "@/data/paymentMethods.json":
    "@/features/payment/data/paymentMethods.json",

  "@/data/payments.json":
    "@/features/payment/data/payments.json",

  "@/data/search.json":
    "@/features/search/data/search.json",

  "@/data/notifications":
    "@/features/notifications/data/notifications",

  "@/components/Sidebar":
    "@/shared/components/layout/Sidebar",

  "@/components/Topbar":
    "@/shared/components/layout/Topbar",

  "@/components/StatCard":
    "@/shared/components/common/StatCard",

  "@/config/api":
    "@/shared/config/api",

  "@/lib/axios":
    "@/shared/lib/axios",

  "@/lib/rateCardHelper":
    "@/shared/lib/rateCardHelper",

  "@/types":
    "@/shared/types",

  "@/hooks/useNotifications":
    "@/features/notifications/hooks/useNotifications",

  "@/hooks/useCurrentUser":
    "@/features/profile/hooks/useCurrentUser",

  "@/hooks/useInvoice":
    "@/features/payment/hooks/useInvoice",

  "@/hooks/usePaymentMethods":
    "@/features/payment/hooks/usePaymentMethods",

  "@/hooks/usePayments":
    "@/features/payment/hooks/usePayments",

  "@/services/searchService":
    "@/features/search/services/searchService",

  "@/services/dashboardService":
    "@/features/dashboard/services/dashboardService",

  "@/services/paymentService":
    "@/features/payment/services/paymentService",

  "@/services/paymentMethodService":
    "@/features/payment/services/paymentMethodService",

  "@/services/invoiceService":
    "@/features/payment/services/invoiceService",

  "@/services/campaignService":
    "@/features/campaigns/services/campaignService",

  "@/services/managedCampaignService":
    "@/features/campaigns/services/managedCampaignService",
};

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    if (!/\.(ts|tsx|js|jsx)$/.test(file)) continue;

    let content = fs.readFileSync(full, "utf8");
    let changed = false;

    for (const [oldPath, newPath] of Object.entries(rules)) {
      if (content.includes(oldPath)) {
        content = content.replaceAll(oldPath, newPath);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(full, content, "utf8");
      console.log("FIXED:", full);
    }
  }
}

walk(root);

console.log("DONE");