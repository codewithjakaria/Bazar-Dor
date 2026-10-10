'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from '@/lib/api';

export default function NavLinks({ categories }: { categories: Category[] }) {
  const currentPath = usePathname();

  return (
    <ul className="flex w-max min-w-full flex-nowrap gap-1">
      {categories.map(cat => {
        const link = `/category/${cat.slug}`;
        const isActive = currentPath === link;

        return (
          <li key={cat.id}>
            <Link
              href={link}
              className={
                isActive
                  ? 'flex gap-1 px-3 py-1.5 text-sm rounded-lg whitespace-nowrap bg-green-100 text-green-800 font-semibold'
                  : 'flex gap-1 px-3 py-1.5 text-sm rounded-lg whitespace-nowrap text-gray-600 hover:bg-gray-100'
              }
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
