import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getProducts } from '@/lib/api';
import { auth } from '@/lib/auth';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// URL থেকে slug নিয়ে সেই পণ্যটি বের করি
async function ProductDetails({ params }: PageProps) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find(item => item.slug === slug);

  if (!product) {
    notFound();
  }

  let unitName = 'কেজি';
  if (product.unit === 'litre') unitName = 'লিটার';
  if (product.unit === 'dozen') unitName = 'ডজন';
  if (product.unit === 'piece') unitName = 'পিস';

  const lowestPrice = Math.min(...product.markets.map(market => market.min));
  const highestPrice = Math.max(...product.markets.map(market => market.max));
  const priceDifference = product.today - product.yesterday;

  let changeArrow = '—';
  let changeColor = 'text-gray-500';
  if (product.change.dir === 'up') {
    changeArrow = '▲';
    changeColor = 'text-red-500';
  }
  if (product.change.dir === 'down') {
    changeArrow = '▼';
    changeColor = 'text-green-600';
  }

  return (
    <>
      <p className="mb-5 text-xs text-gray-500">
        <Link href="/" className="hover:text-green-700">হোম</Link>
        <span className="mx-2">›</span>
        <span>{product.categoryNameBn}</span>
        <span className="mx-2">›</span>
        <span>{product.nameBn}</span>
      </p>

      {/* Product-এর নাম ও আজকের দাম */}
      <section className="mb-4 flex flex-col justify-between gap-5 rounded-2xl border border-[#e2ebe3] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:p-7">
        <div className="flex items-center gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-[#f0f5ef] text-3xl">
            {product.image}
          </span>
          <div>
            <h1 className="text-xl font-bold text-[#26352b] sm:text-2xl">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              {unitName} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-xs text-gray-600">
              গতকালের তুলনায় আজ দাম{' '}
              {priceDifference > 0 ? 'বেড়েছে' : priceDifference < 0 ? 'কমেছে' : 'একই আছে'}{' '}
              {Math.abs(priceDifference).toLocaleString('bn-BD')} টাকা
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#f0f5ef] px-5 py-3 text-center sm:min-w-28">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-bold text-[#26352b]">
            {product.today.toLocaleString('bn-BD')}
          </p>
          <p className="text-xs text-gray-500">টাকা / {unitName}</p>
          <p className={`mt-1 text-xs font-bold ${changeColor}`}>
            {changeArrow} {Math.abs(product.change.pct).toLocaleString('bn-BD')}%
          </p>
        </div>
      </section>

      {/* সর্বনিম্ন, সর্বোচ্চ এবং গড় দাম */}
      <section className="rounded-2xl border border-[#e2ebe3] bg-[#fbfdfb] p-4 sm:p-6">
        <h2 className="mb-3 text-sm font-bold text-[#26352b]">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-[#e2ebe3] p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 font-bold text-green-700">
              {lowestPrice.toLocaleString('bn-BD')} টাকা
            </p>
            <p className="mt-1 text-[11px] text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-[#e2ebe3] p-4">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-1 font-bold text-red-500">
              {highestPrice.toLocaleString('bn-BD')} টাকা
            </p>
            <p className="mt-1 text-[11px] text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-[#e2ebe3] p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="mt-1 font-bold text-green-700">
              {product.today.toLocaleString('bn-BD')} টাকা
            </p>
            <p className="mt-1 text-[11px] text-gray-500">প্রতি {unitName}-এর হিসাব</p>
          </div>
        </div>

        {/* প্রতিটি বাজারের আলাদা দাম */}
        <h2 className="mb-3 mt-5 text-sm font-bold text-[#26352b]">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#e2ebe3]">
          <table className="w-full min-w-[620px] text-left text-xs">
            <thead className="bg-[#f7faf7] text-gray-500">
              <tr>
                <th className="px-3 py-3 font-semibold">বাজার</th>
                <th className="px-3 py-3 font-semibold">বিভাগ</th>
                <th className="px-3 py-3 font-semibold">সর্বনিম্ন</th>
                <th className="px-3 py-3 font-semibold">সর্বোচ্চ</th>
                <th className="px-3 py-3 text-right font-semibold">গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map(market => {
                const averagePrice = (market.min + market.max) / 2;

                return (
                  <tr key={market.market} className="border-t border-[#dfe5df] even:bg-[#f5f8f5]">
                    <td className="px-3 py-3">{market.market}</td>
                    <td className="px-3 py-3">{market.division}</td>
                    <td className="px-3 py-3">{market.min.toLocaleString('bn-BD')} টাকা</td>
                    <td className="px-3 py-3">{market.max.toLocaleString('bn-BD')} টাকা</td>
                    <td className="px-3 py-3 text-right font-semibold">
                      {averagePrice.toLocaleString('bn-BD', { maximumFractionDigits: 2 })} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default async function Page({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  return (
    <main className="flex-1 bg-[#f0f5f0]">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
        <Suspense fallback={<p className="py-8 text-gray-500">পণ্যের তথ্য লোড হচ্ছে…</p>}>
          <ProductDetails params={params} />
        </Suspense>
      </div>
    </main>
  );
}
