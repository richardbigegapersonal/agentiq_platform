
// pages/dashboard.js
import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <SignedIn>
        <nav className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Welcome, {user?.firstName} 👋</h1>
          <UserButton afterSignOutUrl="/" />
        </nav>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard title="Lead Discovery" desc="AI scrapes LinkedIn to identify high-value prospects." link="/leads" />
          <ServiceCard title="Data Enrichment" desc="Fills in gaps in contact, company, and behavioral data." />
          <ServiceCard title="AI Outreach" desc="Crafts personalized outbound messages automatically." />
          <ServiceCard title="Feedback Analytics" desc="Learns from conversations to improve lead targeting." />
        </section>

        <section className="mt-16 text-gray-600">
          <h2 className="text-xl font-semibold mb-2">How It Works</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Connect your sales pipeline and CRMs.</li>
            <li>AI agents discover and enrich ideal leads.</li>
            <li>Outreach is initiated through personalized channels.</li>
            <li>Agents analyze outcomes and optimize future targeting.</li>
          </ol>
        </section>
      </SignedIn>

      <SignedOut>
        {router.push("/sign-in")}
      </SignedOut>
    </main>
  );
}

function ServiceCard({ title, desc, link = "#" }) {
  return (
    <Link href={link}>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl cursor-pointer transition-all">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </Link>
  );
}
