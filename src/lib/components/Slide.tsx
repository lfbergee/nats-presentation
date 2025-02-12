import Image from "next/image";
import { SlideContent } from "../actions/getSlide";
import { InteractiveSlide } from "./InteractiveSlide";

export function Slide({ slide }: { slide: SlideContent | undefined }) {
  if (!slide) {
    return (
      <div className="w-full h-full grid place-items-center">
        <span>No more slides</span>
      </div>
    );
  }
  if (slide.type === "title") {
    return (
      <div className="w-full h-full grid place-content-center ">
        <h1 className="px-6 text-center my-6 text-accent">{slide.title}</h1>
      </div>
    );
  }

  if (slide.type === "image") {
    return (
      <div className="w-full h-full grid place-content-center">
        {slide?.title && (
          <h1 className="px-6 text-center my-6">{slide.title}</h1>
        )}
        <Image
          width={1024}
          height={768}
          className="mx-auto rounded-lg overflow-hidden max-h-[75vh] object-contain mt-0"
          src={slide.image}
          alt=""
        />
      </div>
    );
  }

  if (slide.type === "text") {
    return (
      <>
        {slide?.title && (
          <h1 className="px-6 text-center my-6">{slide.title}</h1>
        )}
        <ul className="px-6 list-none text-xl">
          {slide.bullets.map((bullet) => (
            <li key={bullet} className="my-4">
              {bullet}
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (slide.type === "interactive") {
    return <InteractiveSlide slide={slide} />;
  }

  return null;
}
