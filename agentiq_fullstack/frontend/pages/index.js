"use client";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-24 px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Automate Your Sales Pipeline with AgentIQ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Discover, enrich, and close leads—faster. Let AI agents do the heavy lifting while you focus on growing revenue.
        </p>
        <SignedOut>
          <SignInButton>
            <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition">
              Get Started Free
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition">
              Go to Dashboard
            </button>
          </Link>
        </SignedIn>
      </section>

      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What AgentIQ Offers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <FeatureCard title="Lead Discovery" desc="AI scrapes LinkedIn & web to identify prospects that match your ICP." />
          <FeatureCard title="Data Enrichment" desc="Auto-completes missing firmographics, contact, and behavioral info." />
          <FeatureCard title="AI Outreach" desc="Sends personalized cold emails & InMails at scale with human tone." />
          <FeatureCard title="Feedback Loop" desc="Learns from response outcomes to optimize future messaging." />
        </div>
      </section>

      <section className="bg-gray-100 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Why Sales Teams Choose AgentIQ</h2>
          <p className="text-gray-700 text-lg mb-6">
            We help B2B companies triple outbound productivity, reduce CAC, and surface warmer leads using first-principles AI.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <Stat value="3x" label="More meetings booked" />
            <Stat value="-40%" label="Reduction in acquisition cost" />
            <Stat value="+65%" label="Open & reply rate uplift" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Choose a Plan That Fits</h2>
          <p className="text-gray-600 mb-12">Start free, scale as you grow. No contracts or surprises.</p>
          <div className="grid md:grid-cols-3 gap-10">
            <PricingPlan
              title="Starter"
              price="$0"
              features={["100 AI credits/month", "Basic lead discovery", "Limited enrichment"]}
              cta="Start Free"
            />
            <PricingPlan
              title="Pro"
              price="$99/mo"
              features={["Unlimited discovery", "AI outreach", "CRM integration"]}
              cta="Upgrade to Pro"
              highlight
            />
            <PricingPlan
              title="Enterprise"
              price="Custom"
              features={["Dedicated agents", "Custom integrations", "Onboarding support"]}
              cta="Contact Sales"
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-900 text-white py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your Sales Workflow?</h2>
          <p className="mb-6">Join 100+ teams using AgentIQ to sell smarter.</p>
          <SignedOut>
            <SignInButton>
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold">
                Sign Up Free
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold">
                Go to Dashboard
              </button>
            </Link>
          </SignedIn>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Resources & Legal</h2>
          <p className="text-gray-600 mb-8">Transparency builds trust. Review our policies and learn more about how we work.</p>
          <div className="flex justify-center gap-12 text-sm text-blue-700">
            <Link href="/buy-leads">Buy Leads</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

function PricingPlan({ title, price, features, cta, highlight }) {
  return (
    <div className={`border rounded-lg p-6 ${highlight ? "bg-indigo-50 border-indigo-400" : "bg-white"}`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold mb-4">{price}</p>
      <ul className="text-sm text-gray-600 mb-6 space-y-2">
        {features.map((f, i) => <li key={i}>• {f}</li>)}
      </ul>
      <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
        {cta}
      </button>
    </div>
  );
}
