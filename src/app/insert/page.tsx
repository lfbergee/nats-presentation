"use client";

import { insertSlide } from "@/lib/actions/insertSlide";
import { useTransition } from "react";

export default function Page({}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await insertSlide("slide.20", {
        type: "title",
        title: "digirama.elate.no",
        notes: ``,
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
