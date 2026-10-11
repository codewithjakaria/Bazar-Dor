import type { Product } from '@/types';

const BASE_URLS = [
  'https://openapi.programming-hero.com/api/bazardor',
  'https://api.api-store.workers.dev/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor',
];

export type Category = {
  id: string;
  slug: string;
  nameBn: string; 
  icon: string; 
};
export async function getCategories(): Promise<Category[]> {
  return getData<Category[]>('/categories');
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  return getData<Category>(`/categories/${encodeURIComponent(slug)}`);
}

export async function getProducts(): Promise<Product[]> {
  return getData<Product[]>('/products');
}

export async function getProductById(id: number): Promise<Product> {
  return getData<Product>(`/products/${id}`);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return getData<Product[]>(`/products?category=${encodeURIComponent(category)}`);
}

async function getData<T>(path: string): Promise<T> {
  let errorMessage = 'API থেকে data পাওয়া যায়নি';

  for (const baseUrl of BASE_URLS) {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        next: { revalidate: 300 },
      });

      if (res.ok) {
        return res.json();
      }

      errorMessage = `API error: ${res.status}`;
    } catch {
      errorMessage = 'API-এর সাথে যোগাযোগ করা যাচ্ছে না';
    }
  }

  throw new Error(errorMessage);
}
