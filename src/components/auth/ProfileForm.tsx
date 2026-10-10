'use client';

import Image from 'next/image';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function ProfileForm({
  name: savedName,
  email,
  image: savedImage,
}: {
  name: string;
  email: string;
  image: string | null;
}) {
  const router = useRouter();
  const [name, setName] = useState(savedName);
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
        image: image || undefined,
      });

      if (result.error) {
        toast.error(result.error.message || 'নাম update করা যায়নি');
        return;
      }

      toast.success('নাম update হয়েছে');
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
    <div className="w-full max-w-3xl">
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

        <div className="flex-1 text-center sm:text-left">
          <p className="font-semibold text-[#26352b]">{name}</p>
          <p className="text-sm text-gray-500">{email}</p>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            নাম
            <input
              name="name"
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-700"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-4 py-2.5 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? 'অপেক্ষা করুন…' : 'আপডেট'}
          </button>
        </form>
      </section>
    </div>
  );
}
