'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

export default function CategoryProductList({ products }: { products: Product[] }) {
  const [sortOrder, setSortOrder] = useState('default');

  const sortedProducts = [...products];

  if (sortOrder === 'low-to-high') {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sortOrder === 'high-to-low') {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#e2ebe3] bg-[#fbfdfb] px-4 py-3">
        <span className="text-sm text-gray-600">সাজান</span>
        <select
          value={sortOrder}
          onChange={event => setSortOrder(event.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম: কম থেকে বেশি</option>
          <option value="high-to-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mb-3 text-xs text-gray-500">
        মোট {products.length.toLocaleString('bn-BD')}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
