// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <header className="text-center mb-10">
        <h1 className="text-6xl font-bold tracking-tight">AgentIQ</h1>
        <p className="text-xl mt-4 text-gray-500">Your AI Sales Team — Discover. Engage. Close.</p>
      </header>
      <div className="flex gap-4">
        <Link href="/sign-up">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700">Get Started</button>
        </Link>
        <Link href="/sign-in">
          <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-xl shadow-md hover:border-blue-700 hover:text-blue-700">Login</button>
        </Link>
      </div>
      <section className="mt-20 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-6">Why AgentIQ?</h2>
        <p className="text-gray-600 text-lg mb-4">
          AgentIQ revolutionizes the way B2B companies acquire and convert leads.
          With AI-powered discovery, automated outreach, and continuous learning,
          your sales workflow becomes smarter and faster.
        </p>
      </section>
    </main>
  );
}
