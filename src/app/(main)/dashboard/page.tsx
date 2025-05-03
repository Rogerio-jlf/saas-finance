// src/app/dashboard/page.tsx
import LogoutButton from '@/components/LogoutButton';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login'); // Redireciona para login se não estiver autenticado
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Bem-vindo, {session.user?.name}!</h1>
      <p className="text-gray-600">Você está autenticado no sistema.</p>
      <LogoutButton />
    </main>
  );
}
