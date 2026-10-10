'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error('সাইন আউট করা যায়নি');
        return;
      }

      toast.success('সাইন আউট হয়েছে');
    } catch {
      toast.error('আবার চেষ্টা করুন');
    }
  }

  if (isPending) {
    return <div className="h-9" />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          {session.user.name}
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg bg-green-700 px-3 py-1.5 text-sm text-white hover:bg-green-800"
        >
          সাইন আউট
        </button>
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
