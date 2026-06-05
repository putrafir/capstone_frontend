```
Import traces:
  Client Component Browser:
    ./src/app/payment/detail/[id]/page.tsx [Client Component Browser]
    ./src/app/payment/detail/[id]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/detail/[id]/page.tsx [Client Component SSR]
    ./src/app/payment/detail/[id]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/detail/[id]/page.tsx:7:1
Module not found: Can't resolve '@/components/payment/LoadingSkeleton'
   5 | import StatusBadge from "@/components/payment/StatusBadge";
   6 | import InvoiceSummary from "@/components/payment/InvoiceSummary";
>  7 | import { InvoiceDetailSkeleton } from "@/components/payment/LoadingSkeleton";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   8 | import ErrorState from "@/components/payment/ErrorState";
   9 | import { useInvoice } from "@/hooks/useInvoice";
  10 | import { ArrowLeft } from "lucide-react";

Import map: aliased to relative './src/components/payment/LoadingSkeleton' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/detail/[id]/page.tsx [Client Component Browser]
    ./src/app/payment/detail/[id]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/detail/[id]/page.tsx [Client Component SSR]
    ./src/app/payment/detail/[id]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/invoice/[campaignId]/page.tsx:8:1
Module not found: Can't resolve '@/components/payment/LoadingSkeleton'
   6 | import PaymentRow from "@/components/payment/PaymentRow";
   7 | import CampaignTabs from "@/components/payment/CampaignTabs";
>  8 | import { CampaignCardSkeleton } from "@/components/payment/LoadingSkeleton";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   9 | import ErrorState from "@/components/payment/ErrorState";
  10 | import EmptyState from "@/components/payment/EmptyState";
  11 | import { usePayments } from "@/hooks/usePayments";

Import map: aliased to relative './src/components/payment/LoadingSkeleton' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/invoice/[campaignId]/page.tsx [Client Component Browser]
    ./src/app/payment/invoice/[campaignId]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/invoice/[campaignId]/page.tsx [Client Component SSR]
    ./src/app/payment/invoice/[campaignId]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/page.tsx:8:1
Module not found: Can't resolve '@/components/payment/LoadingSkeleton'
   6 | import PaymentCard from "@/components/payment/PaymentCard";
   7 | import SearchBar from "@/components/payment/SearchBar";
>  8 | import LoadingSkeleton from "@/components/payment/LoadingSkeleton";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   9 | import ErrorState from "@/components/payment/ErrorState";
  10 | import EmptyState from "@/components/payment/EmptyState";
  11 | import { usePayments } from "@/hooks/usePayments";

Import map: aliased to relative './src/components/payment/LoadingSkeleton' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/page.tsx [Client Component Browser]
    ./src/app/payment/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/page.tsx [Client Component SSR]
    ./src/app/payment/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/page.tsx:6:1
Module not found: Can't resolve '@/components/payment/PaymentCard'
  4 | import Sidebar from "@/components/Sidebar";
  5 | import Topbar from "@/components/Topbar";
> 6 | import PaymentCard from "@/components/payment/PaymentCard";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  7 | import SearchBar from "@/components/payment/SearchBar";
  8 | import LoadingSkeleton from "@/components/payment/LoadingSkeleton";
  9 | import ErrorState from "@/components/payment/ErrorState";

Import map: aliased to relative './src/components/payment/PaymentCard' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/page.tsx [Client Component Browser]
    ./src/app/payment/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/page.tsx [Client Component SSR]
    ./src/app/payment/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/process/[id]/page.tsx:6:1
Module not found: Can't resolve '@/components/payment/PaymentMethodAccordion'
  4 | import Sidebar from "@/components/Sidebar";
  5 | import Topbar from "@/components/Topbar";
> 6 | import PaymentMethodAccordion from "@/components/payment/PaymentMethodAccordion";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  7 | import ErrorState from "@/components/payment/ErrorState";
  8 | import { useInvoice } from "@/hooks/useInvoice";
  9 | import { usePaymentMethods } from "@/hooks/usePaymentMethods";

Import map: aliased to relative './src/components/payment/PaymentMethodAccordion' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/process/[id]/page.tsx [Client Component Browser]
    ./src/app/payment/process/[id]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/process/[id]/page.tsx [Client Component SSR]
    ./src/app/payment/process/[id]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/invoice/[campaignId]/page.tsx:6:1
Module not found: Can't resolve '@/components/payment/PaymentRow'
  4 | import Sidebar from "@/components/Sidebar";
  5 | import Topbar from "@/components/Topbar";
> 6 | import PaymentRow from "@/components/payment/PaymentRow";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  7 | import CampaignTabs from "@/components/payment/CampaignTabs";
  8 | import { CampaignCardSkeleton } from "@/components/payment/LoadingSkeleton";
  9 | import ErrorState from "@/components/payment/ErrorState";

Import map: aliased to relative './src/components/payment/PaymentRow' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/invoice/[campaignId]/page.tsx [Client Component Browser]
    ./src/app/payment/invoice/[campaignId]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/invoice/[campaignId]/page.tsx [Client Component SSR]
    ./src/app/payment/invoice/[campaignId]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/page.tsx:7:1
Module not found: Can't resolve '@/components/payment/SearchBar'
   5 | import Topbar from "@/components/Topbar";
   6 | import PaymentCard from "@/components/payment/PaymentCard";
>  7 | import SearchBar from "@/components/payment/SearchBar";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   8 | import LoadingSkeleton from "@/components/payment/LoadingSkeleton";
   9 | import ErrorState from "@/components/payment/ErrorState";
  10 | import EmptyState from "@/components/payment/EmptyState";

Import map: aliased to relative './src/components/payment/SearchBar' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/page.tsx [Client Component Browser]
    ./src/app/payment/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/page.tsx [Client Component SSR]
    ./src/app/payment/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/detail/[id]/page.tsx:5:1
Module not found: Can't resolve '@/components/payment/StatusBadge'
  3 | import Sidebar from "@/components/Sidebar";
  4 | import Topbar from "@/components/Topbar";
> 5 | import StatusBadge from "@/components/payment/StatusBadge";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  6 | import InvoiceSummary from "@/components/payment/InvoiceSummary";
  7 | import { InvoiceDetailSkeleton } from "@/components/payment/LoadingSkeleton";
  8 | import ErrorState from "@/components/payment/ErrorState";

Import map: aliased to relative './src/components/payment/StatusBadge' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/detail/[id]/page.tsx [Client Component Browser]
    ./src/app/payment/detail/[id]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/detail/[id]/page.tsx [Client Component SSR]
    ./src/app/payment/detail/[id]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/api/mock/campaigns/[id]/route.ts:2:1
Module not found: Can't resolve '@/data/campaigns.json'
  1 | import { NextRequest, NextResponse } from "next/server";
> 2 | import data from "@/data/campaigns.json";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  3 |
  4 | type Campaign = (typeof data.campaigns)[number];
  5 | type CampaignDetail =

Import map: aliased to relative './src/data/campaigns.json' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


./src/app/api/mock/campaigns/messages/[creatorId]/route.ts:3:1
Module not found: Can't resolve '@/data/campaigns.json'
  1 |
  2 | import { NextRequest, NextResponse } from "next/server";
> 3 | import data from "@/data/campaigns.json";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  4 |
  5 | type MessagesData = typeof data.messages;
  6 |

Import map: aliased to relative './src/data/campaigns.json' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


./src/app/api/mock/campaigns/route.ts:3:1
Module not found: Can't resolve '@/data/campaigns.json'
  1 |
  2 | import { NextResponse } from "next/server";
> 3 | import data from "@/data/campaigns.json";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  4 |
  5 | export async function GET(): Promise<NextResponse> {
  6 |   await new Promise((r) => setTimeout(r, 500));

Import map: aliased to relative './src/data/campaigns.json' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


./src/app/api/mock/creators/saved/route.ts:3:1
Module not found: Can't resolve '@/data/dashboard.json'
  1 |
  2 | import { NextResponse } from "next/server";
> 3 | import data from "@/data/dashboard.json";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  4 |
  5 | export async function GET(): Promise<NextResponse> {
  6 |   await new Promise((r) => setTimeout(r, 500));

Import map: aliased to relative './src/data/dashboard.json' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


./src/app/api/mock/dashboard/stats/route.ts:3:1
Module not found: Can't resolve '@/data/dashboard.json'
  1 |
  2 | import { NextResponse } from "next/server";
> 3 | import data from "@/data/dashboard.json";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  4 |
  5 | export async function GET(): Promise<NextResponse> {
  6 |   await new Promise((r) => setTimeout(r, 600));

Import map: aliased to relative './src/data/dashboard.json' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


./src/app/api/mock/messages/route.ts:3:1
Module not found: Can't resolve '@/data/dashboard.json'
  1 |
  2 | import { NextResponse } from "next/server";
> 3 | import data from "@/data/dashboard.json";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  4 |
  5 | export async function GET(): Promise<NextResponse> {
  6 |   await new Promise((r) => setTimeout(r, 400));

Import map: aliased to relative './src/data/dashboard.json' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


./src/app/api/mock/invoices/[id]/route.ts:2:1
Module not found: Can't resolve '@/data/invoices.json'
  1 | import { NextRequest, NextResponse } from "next/server";
> 2 | import data from "@/data/invoices.json";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  3 |
  4 | function maybeError(): boolean {
  5 |   return Math.random() < 0.1;

Import map: aliased to relative './src/data/invoices.json' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


./src/app/api/mock/payment-methods/route.ts:2:1
Module not found: Can't resolve '@/data/paymentMethods.json'
  1 | import { NextResponse } from "next/server";
> 2 | import data from "@/data/paymentMethods.json";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  3 |
  4 | export async function GET(): Promise<NextResponse> {
  5 |   await new Promise((r) => setTimeout(r, 300));

Import map: aliased to relative './src/data/paymentMethods.json' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


./src/app/api/mock/payments/route.ts:2:1
Module not found: Can't resolve '@/data/payments.json'
  1 | import { NextResponse } from "next/server";
> 2 | import data from "@/data/payments.json";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  3 |
  4 | function maybeError(): boolean {
  5 |   return Math.random() < 0.1;

Import map: aliased to relative './src/data/payments.json' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


./src/app/api/mock/creators/route.ts:3:1
Module not found: Can't resolve '@/data/search.json'
  1 |
  2 | import { NextRequest, NextResponse } from "next/server";
> 3 | import data from "@/data/search.json";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  4 | import type { Creator } from "@/types";
  5 |
  6 | export async function GET(req: NextRequest): Promise<NextResponse> {

Import map: aliased to relative './src/data/search.json' inside of [project]/


https://nextjs.org/docs/messages/module-not-found


./src/app/budget/page.tsx:20:1
Module not found: Can't resolve '@/hooks/useBudgetForm'
  18 | import { createCampaignFromBudgetForm } from "@/services/managedCampaignService";
  19 | import { notifyManagedCampaignsUpdated } from "@/hooks/useManagedCampaigns";
> 20 | import { useBudgetForm, validateStep1 } from "@/hooks/useBudgetForm";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  21 | import type {
  22 |   Strategy,
  23 |   Influencer,

Import map: aliased to relative './src/hooks/useBudgetForm' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/budget/page.tsx [Client Component Browser]
    ./src/app/budget/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/budget/page.tsx [Client Component SSR]
    ./src/app/budget/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/profile/page.tsx:6:1
Module not found: Can't resolve '@/hooks/useCurrentUser'
  4 | import Sidebar from "@/components/Sidebar";
  5 | import Topbar from "@/components/Topbar";
> 6 | import { useCurrentUser } from "@/hooks/useCurrentUser";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  7 | import EditProfileModal from "@/components/dashboard/EditProfileModal";
  8 | import {
  9 |   User,

Import map: aliased to relative './src/hooks/useCurrentUser' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/profile/page.tsx [Client Component Browser]
    ./src/app/profile/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/profile/page.tsx [Client Component SSR]
    ./src/app/profile/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/detail/[id]/page.tsx:9:1
Module not found: Can't resolve '@/hooks/useInvoice'
   7 | import { InvoiceDetailSkeleton } from "@/components/payment/LoadingSkeleton";
   8 | import ErrorState from "@/components/payment/ErrorState";
>  9 | import { useInvoice } from "@/hooks/useInvoice";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  10 | import { ArrowLeft } from "lucide-react";
  11 |
  12 | function formatRupiah(n: number): string {

Import map: aliased to relative './src/hooks/useInvoice' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/detail/[id]/page.tsx [Client Component Browser]
    ./src/app/payment/detail/[id]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/detail/[id]/page.tsx [Client Component SSR]
    ./src/app/payment/detail/[id]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/process/[id]/page.tsx:8:1
Module not found: Can't resolve '@/hooks/useInvoice'
   6 | import PaymentMethodAccordion from "@/components/payment/PaymentMethodAccordion";
   7 | import ErrorState from "@/components/payment/ErrorState";
>  8 | import { useInvoice } from "@/hooks/useInvoice";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   9 | import { usePaymentMethods } from "@/hooks/usePaymentMethods";
  10 | import { ArrowLeft } from "lucide-react";
  11 |

Import map: aliased to relative './src/hooks/useInvoice' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/process/[id]/page.tsx [Client Component Browser]
    ./src/app/payment/process/[id]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/process/[id]/page.tsx [Client Component SSR]
    ./src/app/payment/process/[id]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/budget/page.tsx:19:1
Module not found: Can't resolve '@/hooks/useManagedCampaigns'
  17 | } from "@/services/budgetService";
  18 | import { createCampaignFromBudgetForm } from "@/services/managedCampaignService";
> 19 | import { notifyManagedCampaignsUpdated } from "@/hooks/useManagedCampaigns";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  20 | import { useBudgetForm, validateStep1 } from "@/hooks/useBudgetForm";
  21 | import type {
  22 |   Strategy,

Import map: aliased to relative './src/hooks/useManagedCampaigns' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/budget/page.tsx [Client Component Browser]
    ./src/app/budget/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/budget/page.tsx [Client Component SSR]
    ./src/app/budget/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/campaigns/page.tsx:10:1
Module not found: Can't resolve '@/hooks/useManagedCampaigns'
   8 | import Topbar from "@/components/Topbar";
   9 | import { fetchCampaigns } from "@/services/campaignService";
> 10 | import { useManagedCampaigns } from "@/hooks/useManagedCampaigns";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  11 | import type { Campaign, CampaignStatus } from "@/types/campaign";
  12 |
  13 | // ── Status badge ────────────────────────────────────────────

Import map: aliased to relative './src/hooks/useManagedCampaigns' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/campaigns/page.tsx [Client Component Browser]
    ./src/app/campaigns/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/campaigns/page.tsx [Client Component SSR]
    ./src/app/campaigns/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/notifications/page.tsx:5:1
Module not found: Can't resolve '@/hooks/useNotifications'
  3 | import Sidebar from "@/components/Sidebar";
  4 | import Topbar from "@/components/Topbar";
> 5 | import { useNotifications } from "@/hooks/useNotifications";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  6 | import { useRouter } from "next/navigation";
  7 | import type { Notification, NotificationType } from "@/types/notification";
  8 | import {

Import map: aliased to relative './src/hooks/useNotifications' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/notifications/page.tsx [Client Component Browser]
    ./src/app/notifications/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/notifications/page.tsx [Client Component SSR]
    ./src/app/notifications/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/process/[id]/page.tsx:9:1
Module not found: Can't resolve '@/hooks/usePaymentMethods'
   7 | import ErrorState from "@/components/payment/ErrorState";
   8 | import { useInvoice } from "@/hooks/useInvoice";
>  9 | import { usePaymentMethods } from "@/hooks/usePaymentMethods";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  10 | import { ArrowLeft } from "lucide-react";
  11 |
  12 | function formatRupiah(n: number): string {

Import map: aliased to relative './src/hooks/usePaymentMethods' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/process/[id]/page.tsx [Client Component Browser]
    ./src/app/payment/process/[id]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/process/[id]/page.tsx [Client Component SSR]
    ./src/app/payment/process/[id]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/invoice/[campaignId]/page.tsx:11:1
Module not found: Can't resolve '@/hooks/usePayments'
   9 | import ErrorState from "@/components/payment/ErrorState";
  10 | import EmptyState from "@/components/payment/EmptyState";
> 11 | import { usePayments } from "@/hooks/usePayments";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  12 | import { useState, useMemo } from "react";
  13 | import type { PaymentInfluencer } from "@/types";
  14 |

Import map: aliased to relative './src/hooks/usePayments' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/invoice/[campaignId]/page.tsx [Client Component Browser]
    ./src/app/payment/invoice/[campaignId]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/invoice/[campaignId]/page.tsx [Client Component SSR]
    ./src/app/payment/invoice/[campaignId]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/payment/page.tsx:11:1
Module not found: Can't resolve '@/hooks/usePayments'
   9 | import ErrorState from "@/components/payment/ErrorState";
  10 | import EmptyState from "@/components/payment/EmptyState";
> 11 | import { usePayments } from "@/hooks/usePayments";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  12 | import type { Campaign } from "@/types";
  13 |
  14 | export default function PaymentPage() {

Import map: aliased to relative './src/hooks/usePayments' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/payment/page.tsx [Client Component Browser]
    ./src/app/payment/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/payment/page.tsx [Client Component SSR]
    ./src/app/payment/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/budget/page.tsx:12:1
Module not found: Can't resolve '@/services/budgetService'
  10 | import Step3SmartMatching from "@/components/budget/Step3SmartMatching";
  11 | import Step4Briefing from "@/components/budget/Step4Briefing";
> 12 | import {
     | ^^^^^^^
> 13 |   fetchStrategies,
     | ^^^^^^^^^^^^^^^^^^
> 14 |   fetchInfluencers,
     | ^^^^^^^^^^^^^^^^^^^
> 15 |   fetchBriefingTemplates,
     | ^^^^^^^^^^^^^^^^^^^^^^^^^
> 16 |   createBriefingTemplate,
     | ^^^^^^^^^^^^^^^^^^^^^^^^^
> 17 | } from "@/services/budgetService";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  18 | import { createCampaignFromBudgetForm } from "@/services/managedCampaignService";
  19 | import { notifyManagedCampaignsUpdated } from "@/hooks/useManagedCampaigns";
  20 | import { useBudgetForm, validateStep1 } from "@/hooks/useBudgetForm";

Import map: aliased to relative './src/services/budgetService' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/budget/page.tsx [Client Component Browser]
    ./src/app/budget/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/budget/page.tsx [Client Component SSR]
    ./src/app/budget/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/campaigns/[id]/page.tsx:38:1
Module not found: Can't resolve '@/services/campaignService'
  36 | import Topbar from "@/components/Topbar";
  37 | import ChatModal from "@/components/dashboard/ChatModal";
> 38 | import { fetchCampaignDetail } from "@/services/campaignService";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  39 | import type {
  40 |   CampaignDetail,
  41 |   CampaignCreator,

Import map: aliased to relative './src/services/campaignService' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/campaigns/[id]/page.tsx [Client Component Browser]
    ./src/app/campaigns/[id]/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/campaigns/[id]/page.tsx [Client Component SSR]
    ./src/app/campaigns/[id]/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/campaigns/page.tsx:9:1
Module not found: Can't resolve '@/services/campaignService'
   7 | import Sidebar from "@/components/Sidebar";
   8 | import Topbar from "@/components/Topbar";
>  9 | import { fetchCampaigns } from "@/services/campaignService";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  10 | import { useManagedCampaigns } from "@/hooks/useManagedCampaigns";
  11 | import type { Campaign, CampaignStatus } from "@/types/campaign";
  12 |

Import map: aliased to relative './src/services/campaignService' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/campaigns/page.tsx [Client Component Browser]
    ./src/app/campaigns/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/campaigns/page.tsx [Client Component SSR]
    ./src/app/campaigns/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/dashboard/page.tsx:11:1
Module not found: Can't resolve '@/services/dashboardService'
   9 | import SavedCreators from "@/components/dashboard/SavedCreators";
  10 | import MessagesSection from "@/components/dashboard/MessagesSection";
> 11 | import {
     | ^^^^^^^
> 12 |   fetchDashboardStats,
     | ^^^^^^^^^^^^^^^^^^^^^^
> 13 |   fetchSavedCreators,
     | ^^^^^^^^^^^^^^^^^^^^^
> 14 |   fetchMessages,
     | ^^^^^^^^^^^^^^^^
> 15 | } from "@/services/dashboardService";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  16 | import type { DashboardStats, Creator, Message } from "@/types";
  17 |
  18 |

Import map: aliased to relative './src/services/dashboardService' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/dashboard/page.tsx [Client Component Browser]
    ./src/app/dashboard/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/dashboard/page.tsx [Client Component SSR]
    ./src/app/dashboard/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/saved-creators/page.tsx:9:1
Module not found: Can't resolve '@/services/dashboardService'
   7 | import Topbar from "@/components/Topbar";
   8 | import CreatorCard from "@/components/dashboard/CreatorCard";
>  9 | import { fetchSavedCreators } from "@/services/dashboardService";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  10 | import type { Creator } from "@/types";
  11 |
  12 | // Skeleton for one creator card

Import map: aliased to relative './src/services/dashboardService' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/saved-creators/page.tsx [Client Component Browser]
    ./src/app/saved-creators/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/saved-creators/page.tsx [Client Component SSR]
    ./src/app/saved-creators/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/fake-followers/page.tsx:7:1
Module not found: Can't resolve '@/services/fakeFollowersService'
   5 | import Topbar from "@/components/Topbar";
   6 | import AnalysisResultCard from "@/components/fake-followers/AnalysisResultCard";
>  7 | import { analyzeAccount } from "@/services/fakeFollowersService";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   8 | import type { FakeFollowersResult } from "@/types";
   9 |
  10 | const COIN_COST = 15;

Import map: aliased to relative './src/services/fakeFollowersService' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/fake-followers/page.tsx [Client Component Browser]
    ./src/app/fake-followers/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/fake-followers/page.tsx [Client Component SSR]
    ./src/app/fake-followers/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/budget/page.tsx:18:1
Module not found: Can't resolve '@/services/managedCampaignService'
  16 |   createBriefingTemplate,
  17 | } from "@/services/budgetService";
> 18 | import { createCampaignFromBudgetForm } from "@/services/managedCampaignService";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  19 | import { notifyManagedCampaignsUpdated } from "@/hooks/useManagedCampaigns";
  20 | import { useBudgetForm, validateStep1 } from "@/hooks/useBudgetForm";
  21 | import type {

Import map: aliased to relative './src/services/managedCampaignService' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/budget/page.tsx [Client Component Browser]
    ./src/app/budget/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/budget/page.tsx [Client Component SSR]
    ./src/app/budget/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


./src/app/search/page.tsx:20:1
Module not found: Can't resolve '@/services/searchService'
  18 | import Sidebar from "@/components/Sidebar";
  19 | import Topbar from "@/components/Topbar";
> 20 | import { fetchCreators } from "@/services/searchService";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  21 | import type { Creator } from "@/types";
  22 | import RateCardModal from "@/components/dashboard/RateCardModal";
  23 | import ChatModal from "@/components/dashboard/ChatModal";

Import map: aliased to relative './src/services/searchService' inside of [project]/


Import traces:
  Client Component Browser:
    ./src/app/search/page.tsx [Client Component Browser]
    ./src/app/search/page.tsx [Server Component]

  Client Component SSR:
    ./src/app/search/page.tsx [Client Component SSR]
    ./src/app/search/page.tsx [Server Component]

https://nextjs.org/docs/messages/module-not-found


    at <unknown> (./src/app/budget/page.tsx:5:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/campaigns/[id]/page.tsx:35:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/campaigns/page.tsx:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/dashboard/page.tsx:5:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/fake-followers/page.tsx:4:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/notifications/page.tsx:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/detail/[id]/page.tsx:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/invoice/[campaignId]/page.tsx:4:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/page.tsx:4:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/process/[id]/page.tsx:4:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/profile/page.tsx:4:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/saved-creators/page.tsx:6:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/search/page.tsx:18:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/dashboard/page.tsx:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/budget/page.tsx:6:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/campaigns/[id]/page.tsx:36:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/campaigns/page.tsx:8:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/dashboard/page.tsx:6:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/fake-followers/page.tsx:5:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/notifications/page.tsx:4:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/detail/[id]/page.tsx:4:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/invoice/[campaignId]/page.tsx:5:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/page.tsx:5:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/process/[id]/page.tsx:5:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/profile/page.tsx:5:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/saved-creators/page.tsx:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/search/page.tsx:19:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/budget/page.tsx:8:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/budget/page.tsx:9:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/budget/page.tsx:10:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/budget/page.tsx:11:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/budget/page.tsx:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/campaigns/[id]/page.tsx:37:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/search/page.tsx:23:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/saved-creators/page.tsx:8:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/profile/page.tsx:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/dashboard/page.tsx:10:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/dashboard/page.tsx:8:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/search/page.tsx:22:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/dashboard/page.tsx:9:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/fake-followers/page.tsx:6:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/invoice/[campaignId]/page.tsx:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/invoice/[campaignId]/page.tsx:10:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/page.tsx:10:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/detail/[id]/page.tsx:8:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/invoice/[campaignId]/page.tsx:9:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/page.tsx:9:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/process/[id]/page.tsx:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/detail/[id]/page.tsx:6:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/detail/[id]/page.tsx:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/invoice/[campaignId]/page.tsx:8:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/page.tsx:8:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/page.tsx:6:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/process/[id]/page.tsx:6:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/invoice/[campaignId]/page.tsx:6:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/page.tsx:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/detail/[id]/page.tsx:5:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/api/mock/campaigns/[id]/route.ts:2:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/api/mock/campaigns/messages/[creatorId]/route.ts:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/api/mock/campaigns/route.ts:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/api/mock/creators/saved/route.ts:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/api/mock/dashboard/stats/route.ts:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/api/mock/messages/route.ts:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/api/mock/invoices/[id]/route.ts:2:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/api/mock/payment-methods/route.ts:2:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/api/mock/payments/route.ts:2:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/api/mock/creators/route.ts:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/budget/page.tsx:20:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/profile/page.tsx:6:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/detail/[id]/page.tsx:9:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/process/[id]/page.tsx:8:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/budget/page.tsx:19:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/campaigns/page.tsx:10:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/notifications/page.tsx:5:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/process/[id]/page.tsx:9:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/invoice/[campaignId]/page.tsx:11:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/payment/page.tsx:11:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/budget/page.tsx:12:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/campaigns/[id]/page.tsx:38:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/campaigns/page.tsx:9:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/dashboard/page.tsx:11:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/saved-creators/page.tsx:9:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/fake-followers/page.tsx:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/budget/page.tsx:18:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./src/app/search/page.tsx:20:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
PS D:\capstoneku\New folder\terbaru\capstone_frontend> 
```