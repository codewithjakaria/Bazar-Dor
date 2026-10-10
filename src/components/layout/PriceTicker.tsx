import { getProducts } from '@/lib/api';
import type { Product } from '@/types';

function getUnitName(unit: Product['unit']) {
  if (unit === 'kg') return 'কেজি';
  if (unit === 'litre') return 'লিটার';
  if (unit === 'dozen') return 'ডজন';
  return 'পিস';
}

export default async function PriceTicker() {
  let products: Product[] = [];

  try {
    products = (await getProducts()).slice(0, 8);
  } catch {
    return null;
  }

  return (
    <div className="overflow-hidden border-t border-gray-100 bg-[#fbfdfb] py-2">
      <div className="price-ticker flex w-max items-center gap-7 whitespace-nowrap px-4">
        {[...products, ...products].map((product, index) => (
          <span key={`${product.id}-${index}`} className="flex items-center gap-2 text-xs text-gray-600">
            <span>{product.image}</span>
            <span>{product.nameBn}</span>
            <span>{product.today.toLocaleString('bn-BD')} টাকা/{getUnitName(product.unit)}</span>
            <span className={product.change.dir === 'down' ? 'text-green-600' : 'text-red-500'}>
              {product.change.dir === 'up' ? '▲' : product.change.dir === 'down' ? '▼' : '—'}{' '}
              {Math.abs(product.change.pct).toLocaleString('bn-BD')}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
