import Image from "next/image";
import { SlideContent } from "./getSlide";

export function Slide({ slide }: { slide: SlideContent }) {
  return (
    <>
      {slide?.title && <h1 className="px-6 text-center my-6">{slide.title}</h1>}
      {slide?.centerImage && (
        <Image
          width={1024}
          height={768}
          className="m-auto rounded-lg overflow-hidden"
          src={slide.centerImage}
          alt=""
        />
      )}
    </>
  );
}
