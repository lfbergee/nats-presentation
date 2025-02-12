"use client";

import { insertSlide } from "@/lib/actions/insertSlide";
import { useTransition } from "react";

const slideNumber = 4;
const title = "Hva syns du om å";
const question = "jobbe med auth?";
const type = "interactive";
const notes = `
  Vi er heller ikke spesielt glad i løsningen.

          Så å bytte den ut med noe annet er en god idé. Og vi har vært
          pliktoppfyllende og grundige utviklere, så vi har holdt oss unna
          monolitten og splitta opp alt i mange små mikrotjenester. Så hver
          enkelt del er liten "self-contained", så hver del kan oppdateres
          og oppgraders for seg selv.

          Bortsett fra autentisering da. Den er distribuert over alle tjenestene,
          fordelt over flere team. Som gjør at vi må støtte to autentiseringslønsninger
          over en periode i alle tjenestene eller gjøre en big bang release på tvers
          av systemene.
  `;

export default function Page({}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await insertSlide(`slide.${slideNumber}`, {
        type,
        question,
        options: ["👍 Eneste jeg vil", "🫳 Hvis jeg må", "👎 Aldri"],
        title,
        notes,
      });
    });
  };
  return (
    <div className="grid grid-rows-[1fr_1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <div className="flex flex-col prose">
        <h2>{title}</h2>
        <p>{type}</p>
        <p>{notes}</p>
      </div>

      <button onClick={handleClick} className="btn btn-primary">
        Insert slide {slideNumber}
        {isPending && <span className="loading loading-spinner" />}
      </button>
    </div>
  );
}
