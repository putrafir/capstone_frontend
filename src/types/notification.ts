// ============================================================
// FILE: src/types/notification.ts
// ============================================================

export type NotificationType =
  | "campaign_created"
  | "creator_reply"
  | "payment_success"
  | "content_revision"
  | "campaign_completed"
  | "campaign_started"
  | "creator_negotiation";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string; 
  read: boolean;
  href?: string; 
  avatarUrl?: string;
}