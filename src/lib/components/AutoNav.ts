"use client";

import { connect, usernamePasswordAuthenticator } from "nats.ws";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AutoNav() {
  const [nextSlug, setNextSlug] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    const wssSubscribe = async () => {
      const response = await fetch("/api/auth");
      const { token, user, server } = await response.json();
      const socket = await connect({
        servers: server,
        authenticator: usernamePasswordAuthenticator(user, token),
      });

      const sub = socket.subscribe("active.*");

      (async (sub) => {
        for await (const m of sub) {
          const json = m.json() as number;
          setNextSlug(json);
        }
      })(sub);
    };

    wssSubscribe();
    return () => {};
  }, []);

  useEffect(() => {
    if (nextSlug) {
      router.push(`/slides/${nextSlug}`);
      setNextSlug(undefined);
    }
  }, [nextSlug, router]);

  return null;
}
