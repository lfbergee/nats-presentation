"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { InteractiveSlide as InteractiveSlideType } from "../actions/getSlide";
import { putInteractiveSlide } from "../actions/putInteractiveSlide";
import { useNats } from "./useNats";

export function InteractiveSlide({ slide }: { slide: InteractiveSlideType }) {
  const pathname = usePathname();
  const [responses, setResponses] = useState<string[]>([]);
  const { connection } = useNats();

  useEffect(() => {
    const wssSubscribe = async () => {
      if (connection) {
        const slug = pathname.split("/").pop();
        const sub = connection.subscribe(`interactive.${slug}`);

        (async (sub) => {
          for await (const m of sub) {
            const string = m.string();
            setResponses((responses) => [...responses, string]);
          }
        })(sub);
      }
    };

    wssSubscribe();
    return () => {};
  }, [pathname, connection]);

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
        <h2 className="px-6 text-center my-6">{slide.question}</h2>
      )}
      <div className="m-auto flex flex-row flex-wrap gap-4">
        {slide?.options.map((option) => (
          <button
            disabled={hasClicked || isPending}
            onClick={() => handleClick(option)}
            type="button"
            key={option}
            className="btn btn-primary"
          >
            {option}
          </button>
        ))}
      </div>

      {isPending && (
        <div className="grid place-items-center w-full">
          <span className="loading loading-ring loading-lg" />
        </div>
      )}

      {responses.length > 0 && (
        <div className="m-auto mt-8 flex flex-col gap-4 text-2xl font-bold font-mono">
          {slide.options.map((option) => (
            <div key={option}>
              <span className="mr-3">
                {responses.filter((response) => response === option).length}
              </span>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
