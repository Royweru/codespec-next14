import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-normal p-24">
      <UserButton afterSignOutUrl="/" />T This is the main page
    </main>
  );
}
