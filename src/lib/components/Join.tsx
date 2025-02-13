"use client";

import { useTransition } from "react";
import Image from "next/image";
import { joinSlidedeck } from "../actions/joinSlidedeck";

export function Join() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await joinSlidedeck();
    });
  };

  if (isPending) {
    return (
      <span className="fixed inset-0 bg-black/70 grid place-content-center">
        <span className="loading loading-dots text-primary loading-lg" />
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex flex-col justify-center join join-vertical border border-primary"
    >
      <Image
        className="join-item"
        src="/nats-moose.webp"
        alt="utviklingskonferansen"
        width={400}
        height={400}
      />
      <div className="btn btn-primary btn-outline border-none btn-lg join-item">
        Åpne Utviklingskonferansen
      </div>
    </button>
  );
}
