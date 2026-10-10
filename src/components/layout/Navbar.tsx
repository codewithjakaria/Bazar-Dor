import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { getCategories } from '@/lib/api';
import BanglaDate from '@/components/common/BanglaDate';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import PriceTicker from './PriceTicker';
export default async function Navbar() {
  const categories = await getCategories().catch(() => []);

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">

        <div className="flex items-center justify-between py-3">
  
          <Link href="/" className="flex min-w-0 items-center gap-2 text-gray-900">
            <Image src="/logo-icon.png" alt="বাজার দর" width={40} height={40} className="size-9 shrink-0 sm:size-10" />
            <div className="min-w-0">
              <h1 className="block whitespace-nowrap text-lg font-bold leading-tight text-gray-900">
                বাজার দর
              </h1>
              <p className="whitespace-nowrap text-xs text-gray-500">
                <BanglaDate />
              </p>
            </div>
          </Link>

          <AuthButtons />
        </div>
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="nav-scrollbar -mx-3 overflow-x-auto border-t border-gray-100 px-3 py-2 overscroll-x-contain sm:mx-0 sm:border-0 sm:px-0"
        >
          <Suspense fallback={<div className="h-8" />}>
            <NavLinks categories={categories} />
          </Suspense>
        </nav>
      </div>

      <Suspense fallback={<div className="h-8 border-t border-gray-100 bg-[#fbfdfb]" />}>
        <PriceTicker />
      </Suspense>
    </header>
  );
}
