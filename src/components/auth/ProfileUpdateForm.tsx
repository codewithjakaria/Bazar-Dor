'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function ProfileUpdateForm({ name }: { name: string }) {
  const router = useRouter();
  const [newName, setNewName] = useState(name);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.updateUser({ name: newName.trim() });

      if (result.error) {
        toast.error(result.error.message || 'নাম update করা যায়নি');
        return;
      }

      toast.success('তথ্য update হয়েছে');
      router.push('/profile');
      router.refresh();
    } catch {
      toast.error('আবার চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full max-w-lg rounded-2xl border border-[#e2ebe3] bg-[#fbfdfb] p-5 sm:p-6">
      <h1 className="mb-4 text-xl font-bold text-[#26352b]">তথ্য update করুন</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          নাম
          <input
            name="name"
            type="text"
            value={newName}
            onChange={event => setNewName(event.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-700"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 px-4 py-2.5 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? 'অপেক্ষা করুন…' : 'তথ্য update করুন'}
        </button>
      </form>

      <Link href="/profile" className="mt-4 block text-center text-sm text-green-700 hover:underline">
        profile-এ ফিরে যান
      </Link>
    </section>
  );
}
