"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match"); return; }
    setLoading(true);
    setError("");
    const { createClient } = await import("@/lib/supabase");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/dashboard");
  }

  return (
    <AuthLayout>
      {/* Header */}
      <div className="mb-7 text-center">
        <div className="mx-auto mb-3 h-11 w-11 rounded-2xl bg-accent-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-slate-900">Set new password</h1>
        <p className="mt-1 text-xs text-slate-500">Choose a strong password</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        {error && (
          <div className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              New Password <span className="text-rose-500">*</span>
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Min. 8 characters" minLength={8} required
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Confirm Password <span className="text-rose-500">*</span>
            </label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
              placeholder="Repeat password" minLength={8} required
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition" />
          </div>
          <button type="submit" disabled={loading}
            className="mt-1 w-full rounded-xl bg-accent-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
