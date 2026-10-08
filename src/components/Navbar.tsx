'use client';

import Link from 'next/link';
import Image from 'next/image';
import minnuLogo from '@/image/logominnu.png';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Brand Logo: Minnu */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <Image
              src={minnuLogo}
              alt="Minnu"
              width={110}
              height={44}
              priority
              className="h-[44px] w-auto max-h-[45px] max-w-[120px] object-contain"
              style={{ objectFit: 'contain' }}
            />
          </Link>
        </div>

        {/* Right Controls: DASHBOARD & Clerk Auth Controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300 px-4 py-1.5 text-[11px] font-bold tracking-wider text-slate-600 uppercase transition-all shadow-sm"
          >
            Dashboard
          </Link>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-xs font-semibold text-slate-600 hover:text-black transition-colors px-2.5 py-1.5 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-lg bg-black text-white hover:bg-slate-800 px-3.5 py-1.5 text-xs font-semibold transition-all shadow-sm cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-8 w-8 border border-slate-200 shadow-sm',
                  },
                }}
              />
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
}
