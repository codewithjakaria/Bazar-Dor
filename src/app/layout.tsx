import type { Metadata } from 'next';
import { Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Toaster from '@/components/layout/Toaster';
const notoSerifBengali = Noto_Serif_Bengali({
  variable: '--font-noto-serif-bengali',
  subsets: ['bengali', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'বাজার দর | আজকের বাজারের দাম',
  description: 'বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-bengali">
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
