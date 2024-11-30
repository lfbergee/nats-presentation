"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { activeSlide } from "../actions/activeSlide";

export function Nav({ slug }: { slug: string }) {
  const [nextSlug, setNextSlug] = useState<number>();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (nextSlug) {
      startTransition(async () => {
        router.push(`/presenter/${nextSlug}`);
        await activeSlide(nextSlug.toString());
        setNextSlug(undefined);
      });
    }
  }, [nextSlug, router]);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        setNextSlug(parseFloat(slug) - 1);
      }
      if (event.key === "ArrowRight") {
        setNextSlug(parseFloat(slug) + 1);
      }
    });
    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, [slug]);

  if (isPending) {
    return (
      <span className="fixed inset-0 bg-black/70 grid place-content-center">
        <span className="loading loading-dots text-primary loading-lg" />
      </span>
    );
  }

  return null;
}
