import type { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  let unitName = 'প্রতি কেজি';

  if (product.unit === 'litre') unitName = 'প্রতি লিটার';
  if (product.unit === 'dozen') unitName = 'প্রতি ডজন';
  if (product.unit === 'piece') unitName = 'প্রতি পিস';

  let arrow = '—';
  let badgeColor = 'bg-gray-100 text-gray-600';

  if (product.change.dir === 'up') {
    arrow = '▲';
    badgeColor = 'bg-red-50 text-red-600';
  }

  if (product.change.dir === 'down') {
    arrow = '▼';
    badgeColor = 'bg-green-50 text-green-700';
  }

  return (
    <article className="rounded-2xl border border-[#e2ebe3] bg-[#fbfdfb] p-4">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-[#f0f5ef] text-2xl">
          {product.image}
        </span>
        <div>
          <h3 className="text-sm font-bold text-[#26352b]">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">{unitName}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="font-bold text-[#26352b]">
            {product.today.toLocaleString('bn-BD')} টাকা
          </p>
        </div>

        <span className={`rounded-full px-2 py-1 text-xs ${badgeColor}`}>
          {arrow} {Math.abs(product.change.pct).toLocaleString('bn-BD')}%
        </span>
      </div>
    </article>
  );
}
