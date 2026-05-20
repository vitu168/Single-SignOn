"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/signin");
        return;
      }
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/signin");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const name = user?.user_metadata?.full_name ?? user?.email ?? "User";
  const email = user?.email ?? "";
  const avatar = user?.user_metadata?.avatar_url;
  const provider = user?.app_metadata?.provider ?? "email";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl text-center">

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            {avatar ? (
              <img src={avatar} alt={name} className="w-16 h-16 rounded-full border-2 border-indigo-500" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User Info */}
          <h2 className="text-xl font-bold text-white mb-1">{name}</h2>
          <p className="text-gray-400 text-sm mb-2">{email}</p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
            Signed in via {provider}
          </span>

          {/* Success message */}
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-6">
            <p className="text-green-400 text-sm font-medium">You are signed in successfully</p>
            <p className="text-gray-400 text-xs mt-1">Your session is active across all connected apps</p>
          </div>

          {/* User ID (for developers) */}
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700 mb-6 text-left">
            <p className="text-xs text-gray-500 mb-1">User ID</p>
            <p className="text-xs text-gray-300 font-mono break-all">{user?.id}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full py-2.5 px-4 rounded-lg border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
