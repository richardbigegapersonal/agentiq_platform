import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in</p>;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Welcome, {user.fullName}</h1>
      <p className="mt-2">This is your AgentIQ Dashboard.</p>
    </main>
  );
}
