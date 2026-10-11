'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function AuthForm({
  mode,
  showProtectedMessage = false,
}: {
  mode: 'signin' | 'signup';
  showProtectedMessage?: boolean;
}) {
  const isSignup = mode === 'signup';
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showProtectedMessage) {
      toast.error('এই পেজটি দেখতে আগে সাইন ইন করুন');
    }
  }, [showProtectedMessage]);

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

      <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:text-sm"
        >
          <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5 shrink-0">
            <path fill="#FFC107" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z" />
            <path fill="#FF3D00" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z" />
            <path fill="#4CAF50" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2Z" />
            <path fill="#1976D2" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.2l6.8 5.2C14.2 15.6 18.7 12 24 12Z" />
          </svg>
          <span>Google দিয়ে চালিয়ে যান</span>
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('github')}
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:text-sm"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 fill-current">
            <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.5v-2c-3.4.7-4.1-1.4-4.1-1.4-.5-1.3-1.2-1.6-1.2-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.5 1.3a12.1 12.1 0 0 1 6.4 0C18 3.7 19 4 19 4c.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.4 0 4.8-2.9 5.9-5.6 6.2.4.3.8 1 .8 2v3.1c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z" />
          </svg>
          <span>GitHub দিয়ে চালিয়ে যান</span>
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
