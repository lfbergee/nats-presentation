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
      <div className="border w-[50vw] h-[calc(50vh-0.75rem)] absolute top-2 left-2 overflow-scroll rounded-xl">
        <Slide slide={slide} />
      </div>
      <div className="border w-[calc(50vw-1.5rem)] h-[65vh] absolute top-2 right-2 overflow-scroll p-4 rounded-xl">
        <h2 className="text-center mt-0">Notes</h2>
        <p>{slide.notes}</p>
      </div>
      <div className="border w-[calc(50vw-1.5rem)] h-[calc(35vh-1.5rem)] absolute bottom-2 right-2 overflow-scroll p-4 rounded-xl">
        <h2 className="text-center mt-0">Chat</h2>
      </div>
      <div className="border w-[50vw] h-[calc(50vh-0.75rem)] absolute bottom-2 left-2 overflow-scroll opacity-60 rounded-xl">
        <Slide slide={nextSlide} />
      </div>
      <Nav slug={slug} />
    </div>
  );
}
