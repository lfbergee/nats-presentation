"use client";

import { connect, jwtAuthenticator } from "nats.ws";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { InteractiveSlide as InteractiveSlideType } from "../actions/getSlide";
import { putInteractiveSlide } from "../actions/putInteractiveSlide";

export function InteractiveSlide({ slide }: { slide: InteractiveSlideType }) {
  const pathname = usePathname();
  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    const wssSubscribe = async () => {
      const response = await fetch("/api/auth");
      const { token, seed, server } = await response.json();
      const socket = await connect({
        servers: server,
        authenticator: jwtAuthenticator(token, new TextEncoder().encode(seed)),
        name: "interactive",
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
      <div className="m-auto flex flex-row gap-4">
        {slide?.options.map((option) => (
          <button
            disabled={hasClicked || isPending}
            onClick={() => handleClick(option)}
            type="button"
            key={option}
            className="btn btn-primary"
          >
            {option}
            {isPending && <span className="loading loading-spinner" />}
          </button>
        ))}
      </div>
      {responses.length > 0 && (
        <div className="m-auto mt-8 flex flex-col gap-4">
          {slide.options.map((option) => (
            <div key={option}>
              {option}{" "}
              {responses.filter((response) => response === option).length}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
