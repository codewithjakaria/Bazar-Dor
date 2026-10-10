'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';

export default function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const [message, setMessage] = useState('');
  const isSignup = mode === 'signup';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Login setup পরের ধাপে যুক্ত হবে।');
  }

  return (
    <section className="w-full max-w-md rounded-2xl border border-[#e2ebe3] bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-[#26352b]">
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
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-700"
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
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-700"
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
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-700"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-700 px-4 py-2.5 font-semibold text-white hover:bg-green-800"
        >
          {isSignup ? 'সাইন আপ' : 'সাইন ইন'}
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
          onClick={() => setMessage('Google login পরের ধাপে চালু হবে।')}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => setMessage('GitHub login পরের ধাপে চালু হবে।')}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
        >
          GitHub
        </button>
      </div>

      {message && <p role="status" className="mt-4 text-sm text-amber-700">{message}</p>}

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
