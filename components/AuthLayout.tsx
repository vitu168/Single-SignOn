import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">

      {/* ── Left intro panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-accent-600 flex-col justify-between p-12 relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 left-1/4 w-64 h-64 rounded-full bg-white/5" />
        </div>

        {/* Logo + name */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Auth Platform</span>
          </div>
        </div>

        {/* Main copy */}
        <div className="relative space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              One login<br />for all your apps
            </h1>
            <p className="mt-4 text-blue-100 text-base leading-relaxed max-w-xs">
              Sign in once and access every app instantly. No more remembering multiple passwords.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {[
              "Works across all your apps & platforms",
              "Google & GitHub sign-in supported",
              "Secure accounts powered by Supabase",
              "Take notes, chat, and more",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-blue-100">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom tagline */}
        <div className="relative">
          <p className="text-blue-200 text-xs">
            Powering simple-yby and your other apps
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center bg-[#F5F5FA] px-6 py-12">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>

    </div>
  );
}
