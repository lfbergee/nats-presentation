import { Nav } from "@/lib/Nav";
import { getPresenterSlide } from "@/lib/getPresenterSlide";
import { Slide } from "@/lib/Slide";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const [slide, nextSlide] = await getPresenterSlide(slug);

  return (
    <div className="w-screen h-screen overflow-y-auto prose max-w-full p-8 relative">
      <div className="border w-[50vw] h-[50vh] absolute top-2 left-2 overflow-scroll">
        <Slide slide={slide} />
      </div>
      <div className="border w-[25vw] h-[25vh] absolute bottom-2 left-2 overflow-scroll">
        <Slide slide={nextSlide} />
      </div>
      <Nav slug={slug} />
    </div>
  );
}
