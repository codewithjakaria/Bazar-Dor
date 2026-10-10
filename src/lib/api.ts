import type { Product } from '@/types';

const BASE_URL = 'https://api.abcz.workers.dev/api/bazardor';

export type Category = {
  id: string;
  slug: string;
  nameBn: string; 
  icon: string; 
};
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, { cache: 'force-cache' });
  const data = await res.json();
  return data;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Products আনতে সমস্যা হয়েছে: ${res.status}`);
  }

  return res.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?category=${category}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Products আনতে সমস্যা হয়েছে: ${res.status}`);
  }

  return res.json();
}
