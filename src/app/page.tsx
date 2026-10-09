import { Suspense } from 'react';
import Hero from '@/components/home/Hero';
import ProductSections from '@/components/home/ProductSections';

export default function Page() {
  return (
    <main className="flex-1 bg-[#f0f5f0]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Hero />

        <Suspense fallback={<p className="py-8 text-gray-500">পণ্য লোড হচ্ছে…</p>}>
          <ProductSections />
        </Suspense>
      </div>
    </main>
  );
}
