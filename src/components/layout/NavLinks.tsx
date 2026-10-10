'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from '@/lib/api';

export default function NavLinks({ categories }: { categories: Category[] }) {
  const currentPath = usePathname();

  return (
    <ul className="flex w-max min-w-full flex-nowrap justify-start gap-1 sm:justify-center sm:gap-2">
      {categories.map(cat => {
        const link = `/category/${cat.slug}`;
        const isActive = currentPath === link;

        return (
          <li key={cat.id}>
            <Link
              href={link}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 sm:px-4 ${
                isActive
                  ? 'bg-green-700 font-semibold text-white'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-800'
              }`}
            >
              <span aria-hidden="true">{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
