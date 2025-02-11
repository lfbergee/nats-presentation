import { Nav } from "@/lib/components/Nav";
import { getPresenterSlide } from "@/lib/actions/getPresenterSlide";
import { Slide } from "@/lib/components/Slide";
import { Chat } from "@/lib/components/Chat";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const [slide, nextSlide] = await getPresenterSlide(slug);
  return (
    <div className="w-screen h-screen overflow-y-auto prose max-w-full p-8 relative">
      <div className="border w-[25vw] h-[calc(50vh-0.75rem)] absolute top-2 left-2 overflow-scroll rounded-xl">
        <Slide slide={slide} />
      </div>
      <div className="border w-[calc(75vw-1.5rem)] h-[65vh] absolute top-2 right-2 overflow-scroll p-4 rounded-xl">
        <h2 className="text-center mt-0">Notes</h2>
        <ul className="text-lg list-none">
          {slide.notes
            ?.split(".")
            .map((l) => <li key={l.slice(0, 20)}>{l}</li>)}
        </ul>
      </div>
      <div className="border w-[calc(75vw-1.5rem)] h-[calc(35vh-1.5rem)] absolute bottom-2 right-2 overflow-scroll p-4 rounded-xl">
        <h2 className="text-center mt-0">Chat</h2>
        <Chat />
      </div>
      <div className="border w-[25vw] h-[calc(50vh-0.75rem)] absolute bottom-2 left-2 overflow-scroll opacity-60 rounded-xl">
        <Slide slide={nextSlide} />
      </div>
      <Nav slug={slug} />
    </div>
  );
}
