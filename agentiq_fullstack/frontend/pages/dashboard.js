// pages/dashboard.js
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, useUser, UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = await getToken();
        const res = await fetch("/api/proxy/leads/my-leads", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch leads");
        }

        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error("Error fetching leads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [getToken]);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <SignedIn>
        <nav className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Welcome, {user?.firstName} 👋</h1>
          <UserButton afterSignOutUrl="/" />
        </nav>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <ServiceCard title="Lead Discovery" desc="AI scrapes LinkedIn to identify high-value prospects." link="/buy-leads" />
          <ServiceCard title="Data Enrichment" desc="Fills in gaps in contact, company, and behavioral data." />
          <ServiceCard title="AI Outreach" desc="Crafts personalized outbound messages automatically." />
          <ServiceCard title="Feedback Analytics" desc="Learns from conversations to improve lead targeting." />
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4">Your Purchased Leads</h2>
          {loading ? (
            <p>Loading your leads...</p>
          ) : leads.length === 0 ? (
            <p className="text-gray-500">No leads purchased yet.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads.map((lead) => (
                <li key={lead.id} className="bg-white p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-lg">{lead.name}</h3>
                  <p className="text-sm text-gray-600">{lead.title}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="text-gray-600">
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
