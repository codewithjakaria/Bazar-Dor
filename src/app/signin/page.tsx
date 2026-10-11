import { Suspense } from 'react';
import AuthForm from '@/components/auth/AuthForm';

type PageProps = {
  searchParams: Promise<{ reason?: string }>;
};

async function SignInContent({ searchParams }: PageProps) {
  const { reason } = await searchParams;

  return (
    <AuthForm mode="signin" showProtectedMessage={reason === 'protected'} />
  );
}

export default function SignInPage({ searchParams }: PageProps) {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <Suspense fallback={null}>
        <SignInContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
