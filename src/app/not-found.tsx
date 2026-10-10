import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <section className="w-full max-w-lg rounded-2xl border border-[#e2ebe3] bg-white p-8 text-center shadow-sm">
        <p className="text-5xl font-bold text-green-700">৪০৪</p>
        <h1 className="mt-4 text-xl font-bold text-[#26352b]">এই পেজটি পাওয়া যায়নি</h1>
        <p className="mt-2 text-sm text-gray-500">লিংকটি ঠিক আছে কি না দেখে আবার চেষ্টা করুন।</p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}
