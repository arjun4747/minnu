'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Sparkles, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/search';

  const [email, setEmail] = useState('recruiter@githire.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setError('Invalid recruiter credentials. Please verify your details or use the demo login.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await signIn('credentials', {
        email: 'demo.recruiter@devfind.com',
        password: 'demopassword',
        redirect: false,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError('Failed to sign in with demo credentials.');
      }
    } catch (err) {
      setError('Failed to sign in with demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-7 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm relative">
      <div className="text-center">
        {/* Brand Logo in Login */}
        <div className="mx-auto flex items-center justify-center gap-2.5 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white shadow-sm">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <path d="M18 15V9a9 9 0 0 0-9-9" />
              <path d="M6 9v12" />
            </svg>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-950 select-none">
            Git<span className="text-emerald-600">Hire</span>
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-950">
          Recruiter Sign In
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Access GitHire’s live GitHub developer sourcing engine.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      {/* One-Click Demo Button */}
      <button
        type="button"
        onClick={handleDemoLogin}
        disabled={loading}
        className="group flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 transition-all hover:bg-emerald-100 shadow-sm active:scale-95 disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
        <span>One-Click Demo Recruiter Login</span>
      </button>

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-slate-200" />
        <span className="absolute bg-white px-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Or with credentials
        </span>
      </div>

      <form className="space-y-4" onSubmit={handleCredentialsSubmit}>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Work Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Mail className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="recruiter@githire.com"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Lock className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In as Recruiter'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        <span>Protected Recruiter Route &bull; Demo Access Enabled</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-[#fafafa]">
      <Suspense
        fallback={
          <div className="w-full max-w-md animate-pulse rounded-3xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-400">
            Loading Recruiter Portal...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
