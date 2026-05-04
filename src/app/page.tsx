import Link from "next/link";
import { PageHeader } from "./components/layout/PageHeader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title="Coffee Game" />
      <section className="flex flex-1 items-center justify-center">
        <div className="trialZone flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
          <p>Commence l&apos;aventure par la première épreuve.</p>
          <Link
            href="/trials/1"
            className="rounded-full bg-black/20 px-4 py-2 text-sm font-medium transition hover:bg-black/30"
          >
            Démarrer
          </Link>
        </div>
      </section>
    </main>
  );
}
