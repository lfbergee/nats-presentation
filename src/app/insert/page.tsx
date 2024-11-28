"use client";

import { insertSlide } from "@/lib/insertSlide";
import { useTransition } from "react";

export default function Page({}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await insertSlide("slide.5", {
        type: "image",
        image: "/nats.png",
        title: "",
        notes: `Det bringer oss til NATS. Plattform
        teamet hos oss har proklamert
        hvor bra dette er og de fleste andre
        team har tatt det i bruk i mer eller
        mindre grad. Dette er det stinker av
        noe vi også kan bruke masse tid på,
        og dermed fortsette å glemme at
        vi antageligvis burde byttet ut
        autentiseringsløsningen vår.
        Vi har ett "underforvalta" området igjen
        innenfor vårt ansvarsområdet vi
        eier i dag. Så når vi kombinerer NATS
        med viltkjøtt, så snakker vi, det er
        nyttig, det er nytt, det er ikke
        autentisering!`,
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
