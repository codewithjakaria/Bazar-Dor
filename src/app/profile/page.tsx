import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileForm from '@/components/auth/ProfileForm';
import { auth } from '@/lib/auth';

export const instant = false;

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <ProfileForm
        name={session.user.name}
        email={session.user.email}
        image={session.user.image ?? null}
      />
    </main>
  );
}
