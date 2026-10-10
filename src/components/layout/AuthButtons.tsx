'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error('সাইন আউট করা যায়নি');
        return;
      }

      toast.success('সাইন আউট হয়েছে');
      setMenuOpen(false);
    } catch {
      toast.error('আবার চেষ্টা করুন');
    }
  }

  if (isPending) {
    return <div className="h-9" />;
  }

  if (session) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[#26352b] hover:bg-gray-50"
          aria-expanded={menuOpen}
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="প্রোফাইল ছবি"
              width={32}
              height={32}
              unoptimized
              className="size-8 rounded-full object-cover"
            />
          ) : (
            <span className="grid size-8 place-items-center rounded-full bg-[#e8f4eb] font-bold text-green-800">
              {session.user.name.slice(0, 1)}
            </span>
          )}
          <span className="max-w-24 truncate">{session.user.name}</span>
          <span className="text-xs">⌄</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-60 max-w-[calc(100vw-1.5rem)] rounded-xl border border-[#e2ebe3] bg-[#fbfdfb] p-3 shadow-lg">
            <div className="border-b border-[#e2ebe3] px-2 pb-3">
              <p className="truncate text-sm font-semibold text-[#26352b]">
                {session.user.name}
              </p>
              <p className="truncate text-xs text-gray-500">
                {session.user.email}
              </p>
            </div>
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-[#f0f5f0]"
            >
              <span aria-hidden="true">👤</span>
              আমার প্রোফাইল
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <span aria-hidden="true">↶</span>
              সাইন আউট
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex shrink-0 gap-1.5 sm:gap-2">
      <Link
        href="/signin"
        className="min-h-9 rounded-lg border border-gray-300 px-2 py-1.5 text-xs hover:bg-gray-100 sm:px-3 sm:text-sm"
      >
        সাইন ইন
      </Link>

    
      <Link
        href="/signup"
        className="min-h-9 rounded-lg bg-green-700 px-2 py-1.5 text-xs text-white hover:bg-green-800 sm:px-3 sm:text-sm"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
