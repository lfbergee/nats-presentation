"use client";

import { insertSlide } from "@/lib/actions/insertSlide";
import { useTransition } from "react";

const slideNumber = 20;
const title = "Noen spørsmål?";
const type = "image";
const notes = `

  `;

export default function Page({}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await insertSlide(`slide.${slideNumber}`, {
        type,
        image: "/dumb-moose.png",
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
