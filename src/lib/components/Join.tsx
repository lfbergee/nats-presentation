"use client";

import { useTransition } from "react";
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
    <button onClick={handleClick} className="btn btn-primary">
      Join presentation
    </button>
  );
}
