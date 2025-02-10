"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useNats } from "./useNats";

export function AutoNav() {
  const [nextSlug, setNextSlug] = useState<number>();
  const router = useRouter();

  const { connection } = useNats();

  useEffect(() => {
    const wssSubscribe = async () => {
      if (connection) {
        const sub = connection.subscribe("active.*");

        (async (sub) => {
          for await (const m of sub) {
            const json = m.json() as number;
            setNextSlug(json);
          }
        })(sub);
      }
    };

    wssSubscribe();
    return () => {};
  }, [connection]);

  useEffect(() => {
    if (nextSlug) {
      router.push(`/slides/${nextSlug}`);
      setNextSlug(undefined);
    }
  }, [nextSlug, router]);

  return null;
}
