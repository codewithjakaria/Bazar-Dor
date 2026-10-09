import { getProducts } from '@/lib/api';
import ProductGrid from './ProductGrid';

export default async function ProductSections() {
  const products = await getProducts();

  // দামের পরিবর্তন অনুযায়ী বেড়েছে এমন পণ্যগুলো সামনে আনি
  const increasedProducts = products
    .filter(product => product.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // কমেছে এমন পণ্যগুলো সামনে আনি
  const decreasedProducts = products
    .filter(product => product.change.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <section className="mb-8">
        <h2 className="mb-3 font-bold text-[#26352b]">
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={increasedProducts} />
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-bold text-[#26352b]">
          <span className="text-green-600">▼</span> আজ দাম কমেছে
        </h2>
        <ProductGrid products={decreasedProducts} />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-36">
        <h2 className="font-bold text-[#26352b]">সব পণ্য</h2>
        <p className="mb-3 mt-1 text-xs text-gray-500">
          মোট {products.length.toLocaleString('bn-BD')}টি পণ্য
        </p>
        <ProductGrid products={products} />
      </section>
    </>
  );
}
