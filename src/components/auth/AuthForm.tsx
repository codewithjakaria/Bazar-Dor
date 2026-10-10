'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const isSignup = mode === 'signup';
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    try {
      const result = isSignup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        toast.error(result.error.message || 'আবার চেষ্টা করুন');
        return;
      }

      toast.success(isSignup ? 'আপনার account তৈরি হয়েছে' : 'সাইন ইন হয়েছে');
      router.push(isSignup ? '/signin' : '/');
      router.refresh();
    } catch {
      toast.error('যোগাযোগ করা যাচ্ছে না, আবার চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialLogin(provider: 'google' | 'github') {
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: '/',
      });

      if (result.error) {
        toast.error(result.error.message || 'আবার চেষ্টা করুন');
      }
    } catch {
      toast.error('যোগাযোগ করা যাচ্ছে না, আবার চেষ্টা করুন');
    }
  }

  return (
    <section className="w-full max-w-md rounded-2xl border border-[#e2ebe3] bg-white p-5 shadow-sm sm:p-8">
      <h1 className="text-xl font-bold leading-snug text-[#26352b] sm:text-2xl">
        {isSignup ? 'নতুন account খুলুন' : 'আপনার account-এ সাইন ইন করুন'}
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        {isSignup ? 'তথ্য দিয়ে account তৈরি করুন।' : 'আপনার account-এর তথ্য দিন।'}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {isSignup && (
          <label className="block text-sm font-medium text-gray-700">
            নাম
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-1 min-h-11 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-700"
            />
          </label>
        )}

        <label className="block text-sm font-medium text-gray-700">
          ইমেইল
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 min-h-11 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-700"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          পাসওয়ার্ড
          <input
            name="password"
            type="password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            minLength={8}
            required
            className="mt-1 min-h-11 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-700"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 px-4 py-2.5 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? 'অপেক্ষা করুন…' : isSignup ? 'সাইন আপ' : 'সাইন ইন'}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
        <span className="h-px flex-1 bg-gray-200" />
        অথবা
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          className="min-h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('github')}
          className="min-h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
        >
          GitHub
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        {isSignup ? 'আগে থেকেই account আছে?' : 'নতুন account দরকার?'}{' '}
        <Link
          href={isSignup ? '/signin' : '/signup'}
          className="font-semibold text-green-700 hover:underline"
        >
          {isSignup ? 'সাইন ইন করুন' : 'সাইন আপ করুন'}
        </Link>
      </p>
    </section>
  );
}
