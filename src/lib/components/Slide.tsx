import Image from "next/image";
import { SlideContent } from "../actions/getSlide";

export function Slide({ slide }: { slide: SlideContent | undefined }) {
  if (!slide) {
    return (
      <div className="w-full h-full grid place-items-center">
        <span>No more slides</span>
      </div>
    );
  }
  if (slide.type === "title") {
    return <h1 className="px-6 text-center my-6">{slide.title}</h1>;
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
          className="m-auto rounded-lg overflow-hidden max-h-[90vh] object-contain"
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
        <ul className="px-6">
          {slide.bullets.map((bullet) => (
            <li key={bullet} className="my-4">
              {bullet}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return null;
}
