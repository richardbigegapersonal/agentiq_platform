// pages/_app.js
import { ClerkProvider } from "@clerk/nextjs";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;


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


// pages/sign-in/[[...index]].js
import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />;
}


// pages/sign-up/[[...index]].js
import { SignUp } from "@clerk/nextjs";
export default function Page() {
  return <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />;
}


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
