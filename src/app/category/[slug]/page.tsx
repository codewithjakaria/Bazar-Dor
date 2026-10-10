import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import CategoryProductList from '@/components/products/CategoryProductList';
import ProductLoading from '@/components/products/ProductLoading';
import { getCategories, getProductsByCategory } from '@/lib/api';

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function CategoryProducts({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(item => item.slug === slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <>
      <section className="mb-4 flex min-w-0 items-center gap-3 rounded-2xl border border-[#e2ebe3] bg-[#fbfdfb] p-4 sm:gap-4 sm:p-6">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#f0f5ef] text-2xl sm:size-14 sm:text-3xl">
          {category.icon}
        </span>
        <div className="min-w-0">
          <h1 className="break-words text-xl font-bold text-[#26352b]">{category.nameBn}</h1>
          <p className="mt-1 text-xs text-gray-500">
            {products.length.toLocaleString('bn-BD')}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      {products.length > 0 ? (
        <CategoryProductList products={products} />
      ) : (
        <section className="rounded-2xl bg-white p-8 text-center">
          <p className="text-gray-700">এই category-তে কোনো পণ্য পাওয়া যায় নাই ।</p>
          <Link href="/" className="mt-4 inline-block text-green-700 hover:underline">
            হোম পেজে ফিরে যান
          </Link>
        </section>
      )}
    </>
  );
}

export default function Page({ params }: PageProps) {
  return (
    <main className="flex-1 bg-[#f0f5f0]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Suspense fallback={<ProductLoading count={6} />}>
          <CategoryProducts params={params} />
        </Suspense>
      </div>
    </main>
  );
}
