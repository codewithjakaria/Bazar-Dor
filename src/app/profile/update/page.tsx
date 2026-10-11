import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileUpdateForm from '@/components/auth/ProfileUpdateForm';
import { auth } from '@/lib/auth';

export const instant = false;

export default async function ProfileUpdatePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin?reason=protected');
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <ProfileUpdateForm name={session.user.name} />
    </main>
  );
}
