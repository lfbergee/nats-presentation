"use client";

import { connect, usernamePasswordAuthenticator } from "nats.ws";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { InteractiveSlide } from "../actions/getSlide";
import { putInteractiveSlide } from "../actions/putInteractiveSlide";

export function InteractiveSlide({ slide }: { slide: InteractiveSlide }) {
  const pathname = usePathname();
  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    const wssSubscribe = async () => {
      const response = await fetch("/api/auth");
      const { token, user, server } = await response.json();
      const socket = await connect({
        servers: server,
        authenticator: usernamePasswordAuthenticator(user, token),
      });
      const slug = pathname.split("/").pop();
      const sub = socket.subscribe(`interactive.${slug}`);

      (async (sub) => {
        for await (const m of sub) {
          const string = m.string();
          setResponses((responses) => [...responses, string]);
        }
      })(sub);
    };

    wssSubscribe();
    return () => {};
  }, [pathname]);

  const [hasClicked, setHasClicked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClick = (option: string) => {
    setHasClicked(true);
    startTransition(async () => {
      const slug = pathname.split("/").pop() ?? "";

      await putInteractiveSlide(slug, option);
    });
  };

  return (
    <div className="w-full h-full grid place-content-center">
      {slide?.title && <h1 className="px-6 text-center my-6">{slide.title}</h1>}
      {slide?.question && (
        <h1 className="px-6 text-center my-6">{slide.question}</h1>
      )}
      {slide?.options.map((option) => (
        <button
          disabled={hasClicked}
          onClick={() => handleClick(option)}
          type="button"
          key={option}
          className="btn btn-primary"
        >
          {option}
        </button>
      ))}

      {slide.options.map((option) => (
        <div key={option}>
          {option} {responses.filter((response) => response === option).length}
        </div>
      ))}
    </div>
  );
}
