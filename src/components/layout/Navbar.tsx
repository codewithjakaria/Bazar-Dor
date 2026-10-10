import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { getCategories } from '@/lib/api';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import PriceTicker from './PriceTicker';
export default async function Navbar() {
  const categories = await getCategories().catch(() => []);

  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex items-center justify-between py-3">
  
          <Link href="/" className="flex min-w-0 items-center gap-2 text-gray-900">
            <Image src="/logo-icon.png" alt="বাজার দর" width={40} height={40} />
            <div className="min-w-0">
              <h1 className="block whitespace-nowrap text-lg font-bold leading-tight text-gray-900">
                বাজার দর
              </h1>
              <p className="whitespace-nowrap text-xs text-gray-500">{today}</p>
            </div>
          </Link>

          <AuthButtons />
        </div>
        <nav className="overflow-x-auto pb-2">
          <NavLinks categories={categories} />
        </nav>
      </div>

      <Suspense fallback={<div className="h-8 border-t border-gray-100 bg-[#fbfdfb]" />}>
        <PriceTicker />
      </Suspense>
    </header>
  );
}
