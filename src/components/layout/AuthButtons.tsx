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
          <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-[#e2ebe3] bg-white p-1 shadow-lg">
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-[#f0f5f0]"
            >
              আমার প্রোফাইল
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              সাইন আউট
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Link
        href="/signin"
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
      >
        সাইন ইন
      </Link>

    
      <Link
        href="/signup"
        className="px-3 py-1.5 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
