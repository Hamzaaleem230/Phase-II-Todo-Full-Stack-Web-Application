'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getToken } from '@/lib/auth';
import UserMenu from './UserMenu';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const token =
    typeof window !== 'undefined' ? getToken() : null;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <h1 className="text-lg sm:text-xl font-bold text-white">
            <Link href="/">Todo App</Link>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/tasks"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm lg:text-base transition"
            >
              Tasks
            </Link>

            {!token ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white font-medium text-sm lg:text-base"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-sm lg:text-base text-white transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <UserMenu />
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4">

            <Link
              href="/tasks"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-center"
            >
              Tasks
            </Link>

            {!token ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-white font-medium text-center"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white text-center"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div onClick={() => setMenuOpen(false)}>
                <UserMenu />
              </div>
            )}

          </div>
        )}
      </div>
    </nav>
  );
}
