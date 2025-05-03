'use client';

import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
    >
      Sair
    </button>
  );
};

export default LogoutButton;
