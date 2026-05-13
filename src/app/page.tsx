import Link from "next/link";
import { PageHeader } from "./components/layout/PageHeader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title="Coffee Game" />
      <section className="flex flex-1 items-center justify-center">
        <div className="trialZone flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
            <p>Cette pénurie de café est aussi mystérieuse qu'inquiétante ! Seule une équipe d'aventuriers aguerrie, coordonnée, intrépide, vertueuse, ouverte d'esprit, bienveillante, dynamique, joyeuse, rapide, réactive, solaire, magnanime, flexible, avec une excellente alimentation, une vitesse aérobie hors norme, un parcours atypique, une répartie piquante, un amour sans limite pour la nature, des compétences indéniables en patisserie et un odorat hors-pair aurait une chance de venir à bout de cette périlleuse mission. Faites vos lacets, passez aux toilettes, ajustez vos bretelles, prenez une grande respiration et quand vous vous sentez enfin prets pour l'aventure, cliquez sur le bouton ci-dessous. Attention ! Une fois lancés, il n'y aura pas de retour en arrière...</p>
          <Link
            href="/trials/first"
            className="rounded-full bg-black/20 px-4 py-2 text-sm font-medium transition hover:bg-black/30"
          >
            Démarrer
          </Link>
        </div>
      </section>
    </main>
  );
}
