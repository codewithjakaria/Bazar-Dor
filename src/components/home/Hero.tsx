import Image from 'next/image';
import Link from 'next/link';
import BanglaDate from '@/components/common/BanglaDate';

export default function Hero() {
  return (
    <section className="mb-8 flex flex-col items-center justify-between gap-5 rounded-3xl border border-[#e2ebe3] bg-[#fbfdfb] p-5 text-center sm:flex-row sm:p-8 sm:text-left">
      <div className="w-full sm:flex-1">
        <p className="mb-3 inline-block rounded-full bg-[#e8f4eb] px-3 py-1 text-xs text-green-700">
          <BanglaDate />
        </p>
        <h1 className="text-2xl font-bold leading-tight text-[#26352b] sm:text-3xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম এক জায়গায় দেখুন।
        </p>
        <Link
          href="#সব-পণ্য"
          className="mt-4 inline-block rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
        >
          সব পণ্য দেখুন
        </Link>
      </div>

      <Image
        src="/bazar-hero.png"
        alt="বাজারের পণ্যভর্তি ঝুড়ি"
        width={220}
        height={184}
        className="h-auto w-32 shrink-0 sm:w-44 md:w-52"
      />
    </section>
  );
}
