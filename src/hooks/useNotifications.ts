"use client";


import { useState, useCallback } from "react";
import { MOCK_NOTIFICATIONS } from "@/data/notifications";
import type { Notification } from "@/types/notification";


let _notifications: Notification[] = [...MOCK_NOTIFICATIONS];
const _listeners: Set<() => void> = new Set();

function notify() {
  _listeners.forEach((fn) => fn());
}

export function useNotifications() {
  const [, rerender] = useState(0);

  const subscribe = useCallback(() => {
    const trigger = () => rerender((n) => n + 1);
    _listeners.add(trigger);
    return () => _listeners.delete(trigger);
  }, []);

  
  useState(() => {
    const unsub = subscribe();
    return unsub;
  });

  const notifications = _notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    _notifications = _notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    notify();
  }, []);

  const markAllAsRead = useCallback(() => {
    _notifications = _notifications.map((n) => ({ ...n, read: true }));
    notify();
  }, []);

  return { notifications, unreadCount, markAsRead, markAllAsRead };
}