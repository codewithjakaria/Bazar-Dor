'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function ProfileForm({
  name,
  email,
  image: savedImage,
}: {
  name: string;
  email: string;
  image: string | null;
}) {
  const router = useRouter();
  const [image, setImage] = useState(savedImage || '');
  const [loading, setLoading] = useState(false);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('ছবির file বেছে নিন');
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error('ছবির size ৫০০ KB-এর কম রাখুন');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  }

  async function handleImageSave() {
    setLoading(true);

    try {
      const result = await authClient.updateUser({ image });

      if (result.error) {
        toast.error(result.error.message || 'ছবি update করা যায়নি');
        return;
      }

      toast.success('ছবি update হয়েছে');
    } catch {
      toast.error('আবার চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error('সাইন আউট করা যায়নি');
        return;
      }

      toast.success('সাইন আউট হয়েছে');
      router.push('/');
    } catch {
      toast.error('আবার চেষ্টা করুন');
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[#26352b]">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">আপনার account-এর তথ্য এখানে দেখুন।</p>
      </div>

      <section className="mb-4 flex flex-col items-center gap-4 rounded-2xl border border-[#e2ebe3] bg-[#fbfdfb] p-5 sm:flex-row">
        <div className="flex flex-col items-center">
          <label htmlFor="profile-image" className="cursor-pointer">
            {image ? (
              <Image
                src={image}
                alt="প্রোফাইল ছবি"
                width={64}
                height={64}
                unoptimized
                className="size-16 rounded-2xl object-cover"
              />
            ) : (
              <span className="grid size-16 place-items-center rounded-2xl bg-[#e8f4eb] text-2xl font-bold text-green-800">
                {name.slice(0, 1)}
              </span>
            )}
          </label>
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label htmlFor="profile-image" className="mt-1 cursor-pointer text-xs text-green-700 hover:underline">
            ছবি বদলান
          </label>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="font-semibold text-[#26352b]">{name}</p>
          <p className="break-all text-sm text-gray-500">{email}</p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          সাইন আউট
        </button>
      </section>

      <section className="rounded-2xl border border-[#e2ebe3] bg-[#fbfdfb] p-5 sm:p-6">
        <h2 className="mb-4 font-bold text-[#26352b]">তথ্য</h2>
        <label htmlFor="profile-name" className="mb-2 block text-sm font-medium text-gray-700">
          নাম
        </label>
        <input
          id="profile-name"
          value={name}
          readOnly
          className="min-h-11 w-full rounded-lg border border-[#e2ebe3] bg-[#fbfdfb] px-3 py-2.5 text-sm text-gray-700"
        />
        <Link
          href="/profile/update"
          className="mt-3 flex min-h-11 w-full items-center justify-center rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
        >
          আপডেট
        </Link>

        {image !== (savedImage || '') && (
          <button
            type="button"
            onClick={handleImageSave}
            disabled={loading}
            className="mt-3 w-full rounded-lg border border-green-700 px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50 disabled:opacity-60"
          >
            {loading ? 'অপেক্ষা করুন…' : 'ছবি update করুন'}
          </button>
        )}
      </section>
    </div>
  );
}
