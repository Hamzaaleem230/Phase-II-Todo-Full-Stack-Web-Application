'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <h1 className="text-xl font-bold"><Link href="/">Todo App</Link></h1>
        <div className="space-x-4">
            <Link href="/tasks" className="bg-blue-600 hover:bg-blue-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium">
                Tasks
            </Link>
          <Link href="/login" className="text-gray-300 hover:text-white font-medium">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
          >
            Sign Up
          </Link>
        </div>
      </nav>
  );
}
