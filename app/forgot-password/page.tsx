"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { createClient } = await import("@/lib/supabase");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <AuthLayout>
        <div className="text-center py-8">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-accent-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Check your email</h2>
          <p className="text-sm text-slate-500 mb-6">
            We sent a reset link to{" "}
            <span className="font-semibold text-slate-700">{email}</span>.
          </p>
          <Link href="/signin" className="text-sm font-semibold text-accent-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {/* Header */}
      <div className="mb-7 text-center">
        <div className="mx-auto mb-3 h-11 w-11 rounded-2xl bg-accent-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-slate-900">Forgot password?</h1>
        <p className="mt-1 text-xs text-slate-500">We&apos;ll send you a reset link</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        {error && (
          <div className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Email <span className="text-rose-500">*</span>
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" required
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition" />
          </div>
          <button type="submit" disabled={loading}
            className="mt-1 w-full rounded-xl bg-accent-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-5 text-center text-xs text-slate-500">
        Remember your password?{" "}
        <Link href="/signin" className="font-semibold text-accent-600 hover:underline">Sign In</Link>
      </p>
    </AuthLayout>
  );
}
