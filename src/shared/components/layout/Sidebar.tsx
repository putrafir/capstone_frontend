"use client";


import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  TrendingUp,
  Users,
  Megaphone,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  LucideIcon,
} from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Megaphone, label: "Manage Campaign", href: "/campaigns" },
  { icon: DollarSign, label: "Payment", href: "/payment" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    
    const authKeys = ["token", "user", "auth", "session", "fluensy_user", "fluensy_token"];
    authKeys.forEach((key) => {
      try { localStorage.removeItem(key); } catch {  }
    });

    // 2. Hapus seluruh localStorage jika diperlukan (opsional – uncomment untuk clear all)
    // try { localStorage.clear(); } catch { /* ignore */ }

    
    try { sessionStorage.clear(); } catch { }

    
    document.cookie.split(";").forEach((c) => {
      const key = c.trim().split("=")[0];
      if (key) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });

    // 5. Redirect ke halaman login
    router.push("/login");
  };

  return (
    <aside
      className={`relative flex flex-col bg-sky-950 transition-all duration-300 ease-in-out shrink-0 sticky top-0 h-screen ${collapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="w-10 h-10 shrink-0 flex items-center justify-center">
          <img
            src="/logo.svg"
            alt="Fluensy Icon"
            className="w-full h-full object-contain"
          />
        </div>

        {!collapsed && (
          <div className="h-6 shrink-0 flex items-center">
            <img
              src="/text-logo.svg"
              alt="Fluensy Text"
              className="h-full w-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-7 z-10 w-8 h-8 bg-white border border-sky-950 rounded-md shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-sky-950" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-sky-950" />
        )}
      </button>

      {/* Navigation — flex-1 agar mendorong logout ke bawah */}
      <nav className="flex flex-col gap-1 px-3 mt-2 flex-1 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 ${isActive ? "bg-white/20" : "hover:bg-white/10"
                }`}
              title={collapsed ? label : undefined}
            >
              <Icon
                className="w-5 h-5 text-white shrink-0"
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {!collapsed && (
                <span
                  className={`text-white text-lg whitespace-nowrap ${isActive ? "font-semibold" : "font-normal"
                    }`}
                >
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-3 border-t border-white/20" />

      {/* Profile */}
      <div className="px-3 pt-4">
        <Link
          href="/profile"
          title={collapsed ? "Profile" : undefined}
          className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 ${pathname === "/profile"
            ? "bg-white/20"
            : "hover:bg-white/10"
            }`}
        >
          <User
            className="w-5 h-5 text-white shrink-0"
            strokeWidth={pathname === "/profile" ? 2.5 : 1.8}
          />

          {!collapsed && (
            <span
              className={`text-white text-lg whitespace-nowrap ${pathname === "/profile"
                ? "font-semibold"
                : "font-normal"
                }`}
            >
              Profile
            </span>
          )}
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-3 border-t border-white/20" />

      {/* Logout — selalu di paling bawah */}
      <div className="px-3 py-4">
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl w-full text-left transition-all duration-200 hover:bg-red-500/20 group"
        >
          <LogOut
            className="w-5 h-5 text-red-300 group-hover:text-red-200 shrink-0"
            strokeWidth={1.8}
          />
          {!collapsed && (
            <span className="text-red-300 group-hover:text-red-200 text-lg whitespace-nowrap font-normal">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}