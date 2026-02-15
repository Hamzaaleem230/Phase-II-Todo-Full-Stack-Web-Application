'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/lib/auth';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('userEmail');
      setEmail(storedEmail);
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('userEmail'); // Clean email on logout
    router.push('/login');
    router.refresh();
  };

  const firstLetter = email ? email[0].toUpperCase() : '?';

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center hover:bg-blue-700 transition"
      >
        {firstLetter}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 sm:mt-3 w-36 sm:w-44 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden animate-slideDown z-50">
          <button
            onClick={() => {
              setOpen(false);
              router.push('/profile');
            }}
            className="w-full text-left px-4 py-3 text-sm sm:text-base hover:bg-white/10 transition"
          >
            👤 Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm sm:text-base text-red-400 hover:bg-white/10 transition"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
}
