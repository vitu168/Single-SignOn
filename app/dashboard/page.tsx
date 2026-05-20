"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const { createClient } = await import("@/lib/supabase");
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) { router.push("/signin"); return; }
    setUser(data.user);
    setLoading(false);
  }, [router]);

  useEffect(() => { loadUser(); }, [loadUser]);

  async function handleSignOut() {
    const { createClient } = await import("@/lib/supabase");
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/signin");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5FA] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const name = user?.user_metadata?.full_name ?? user?.email ?? "User";
  const email = user?.email ?? "";
  const avatar = user?.user_metadata?.avatar_url;
  const provider = user?.app_metadata?.provider ?? "email";

  return (
    <div className="min-h-screen bg-[#F5F5FA] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-3 h-11 w-11 rounded-2xl bg-accent-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-xs text-slate-500">You&apos;re signed in</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 text-center">

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            {avatar ? (
              <img src={avatar} alt={name} className="w-16 h-16 rounded-full ring-2 ring-accent-200" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-accent-600 flex items-center justify-center text-2xl font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User info */}
          <h2 className="text-base font-bold text-slate-900 mb-0.5">{name}</h2>
          <p className="text-xs text-slate-500 mb-3">{email}</p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-50 border border-accent-200 text-accent-700 text-[11px] font-medium mb-6">
            via {provider}
          </span>

          {/* Status */}
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 mb-5">
            <p className="text-xs font-semibold text-green-700">Signed in successfully</p>
            <p className="text-[11px] text-green-600 mt-0.5">Session active across all connected apps</p>
          </div>

          {/* User ID */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5 mb-6 text-left">
            <p className="text-[10px] text-slate-400 mb-1 font-semibold uppercase tracking-wide">User ID</p>
            <p className="text-xs text-slate-600 font-mono break-all">{user?.id}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
