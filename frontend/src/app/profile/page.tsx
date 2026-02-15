'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    const storedEmail = localStorage.getItem('userEmail');
    setEmail(storedEmail);

    if (storedEmail) {
      const nameFromEmail = storedEmail.split('@')[0];
      setUsername(nameFromEmail);
    }
  }, [router]);

  const firstLetter = email ? email[0].toUpperCase() : '?';

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white px-4 sm:px-6 lg:px-8">

      <div className="
        w-full 
        max-w-sm 
        sm:max-w-md 
        md:max-w-lg 
        bg-white/5 
        backdrop-blur-xl 
        border border-white/10 
        rounded-2xl 
        p-6 
        sm:p-8 
        md:p-10 
        shadow-2xl
      ">

        {/* Avatar */}
        <div className="
          w-16 h-16 
          sm:w-20 sm:h-20 
          md:w-24 md:h-24 
          mx-auto 
          rounded-full 
          bg-blue-600 
          flex 
          items-center 
          justify-center 
          text-2xl 
          sm:text-3xl 
          md:text-4xl 
          font-bold 
          mb-4 sm:mb-6
        ">
          {firstLetter}
        </div>

        {/* Username */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
          {username || 'User'}
        </h1>

        {/* Info Section */}
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base">

          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-gray-400">Email</span>
            <span className="truncate max-w-[60%] text-right">
              {email || 'N/A'}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-gray-400">Account</span>
            <span>Active</span>
          </div>

        </div>

        <button
          onClick={() => router.push('/tasks')}
          className="
            w-full 
            mt-6 sm:mt-8 
            bg-blue-600 
            hover:bg-blue-700 
            py-2.5 sm:py-3 
            text-sm sm:text-base 
            rounded-lg 
            font-semibold 
            transition
          "
        >
          Back to Tasks
        </button>

      </div>
    </main>
  );
}
