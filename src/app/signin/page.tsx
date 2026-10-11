import AuthForm from '@/components/auth/AuthForm';

type PageProps = {
  searchParams: Promise<{ reason?: string }>;
};

export default async function SignInPage({ searchParams }: PageProps) {
  const { reason } = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <AuthForm mode="signin" showProtectedMessage={reason === 'protected'} />
    </main>
  );
}
