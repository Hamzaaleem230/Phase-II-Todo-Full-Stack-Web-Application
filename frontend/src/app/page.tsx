import Link from "next/link";
// import { redirect } from "next/navigation";

export default function Home() {
  // ❌ redirect yahan comment rakho warna hero dikhega hi nahi
  // redirect("/tasks");

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6">
        
        <div className="bg-blue-600 p-4 rounded-xl mt-8 mb-6">
          ✅
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Stay organized, <br /> get things done
        </h2>

        <p className="text-gray-400 max-w-xl mb-8">
          A simple and elegant task management app to help you
          focus on what matters most.
        </p>

        <div className="flex gap-4">
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            Get Started Free
          </Link>
          <Link
            href="/login"
            className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/5"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-28 px-6 pb-20">
        <Feature title="Simple & Fast" desc="Create and manage tasks in seconds with an intuitive interface." />
        <Feature title="Secure" desc="Your tasks are private and protected." />
        <Feature title="Responsive" desc="Works beautifully on desktop and mobile devices." />
      </section>

    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
