import Link from "next/link";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { TicTacWHat } from "@/app/components/pages/TicTacWhat";

export default function TrialFourPage() {
  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title="Win a Game of Tic Tac Toe !" />
      <section className="flex flex-1 items-center justify-center">
        <div className="trialZone flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
          <TicTacWHat />
          <Link href="/" className="rounded-full bg-black/20 px-4 py-2 text-sm font-medium transition hover:bg-black/30">
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
