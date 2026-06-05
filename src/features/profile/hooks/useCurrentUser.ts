"use client";

import { useState, useEffect } from "react";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  coins: number;
  joinedAt: string;
  avatar?: string;
}

// ── Singleton state ──────────────────────────────────────────
const STORAGE_KEY = "fluensy_user_profile";

const MOCK_DEFAULT: CurrentUser = {
  id: "user-001",
  name: "Budi Santoso",
  email: "budi.santoso@brandco.id",
  company: "BrandCo Indonesia",
  role: "Brand Manager",
  coins: 1250,
  joinedAt: "2025-01-15",
};

let _user: CurrentUser = { ...MOCK_DEFAULT };
let _hydrated = false;
const _listeners = new Set<() => void>();

function notifyAll() {
  _listeners.forEach((fn) => fn());
}

function loadFromStorage(): Partial<CurrentUser> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}


export function updateUser(
  patch: Partial<Omit<CurrentUser, "id" | "coins" | "joinedAt">>
): void {
  _user = { ..._user, ...patch };
  
  try {
    const stored = loadFromStorage();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...stored, ...patch })
    );
  } catch {  }
  notifyAll();
}

// ── Hook ─────────────────────────────────────────────────────
export function useCurrentUser(): CurrentUser {
  const [, rerender] = useState(0);

  useEffect(() => {
    
    if (!_hydrated) {
      _hydrated = true;
      const saved = loadFromStorage();
      if (Object.keys(saved).length > 0) {
        _user = { ...MOCK_DEFAULT, ...saved };
        notifyAll();
      }
    }

    const trigger = () => rerender((n) => n + 1);
    _listeners.add(trigger);
    return () => { _listeners.delete(trigger); };
  }, []);

  return _user;
}