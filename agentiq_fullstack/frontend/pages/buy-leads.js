// pages/buy-leads.js
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function BuyLeads() {
  const { user } = useUser();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/my-leads"); // Adjust to real API
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    }
    fetchLeads();
  }, []);

  return (
    <main className="p-10 bg-white min-h-screen">
      <SignedIn>
        <h1 className="text-3xl font-bold mb-6">Your Purchased Leads</h1>
        {leads.length === 0 ? (
          <p className="text-gray-500">You haven’t bought any leads yet.</p>
        ) : (
          <table className="w-full text-left border mt-6">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Company</th>
                <th className="border px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{lead.name}</td>
                  <td className="border px-4 py-2">{lead.company}</td>
                  <td className="border px-4 py-2">{lead.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SignedIn>

      <SignedOut>
        <p className="text-red-500">You must be signed in to view this page.</p>
      </SignedOut>
    </main>
  );
}
