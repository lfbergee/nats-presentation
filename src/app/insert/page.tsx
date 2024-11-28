"use client";

import { insertSlide } from "@/lib/insertSlide";
import { useTransition } from "react";

export default function Page({}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await insertSlide("slide.18", {
        type: "image",
        image: "/procrast.jpg",
        title: "",
        notes: `Så går dette inn i boka
        som nok et eksempel på at prokastinering
        lønner seg. Det er kanskje ikke lærdommen
        fortjener, men det er den dere får.

        Men siden Petter er her i dag, som er
        direktør for utvikling og dermed betaler
        min regning, så må vi komme opp med noe
        bedre antageligvis
        `,
      });
    });
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <button onClick={handleClick} className="btn btn-primary">
        Hello world
        {isPending && <span className="loading loading-spinner" />}
      </button>
    </div>
  );
}
