import { getSlide } from "@/lib/getSlide";
import { AutoNav } from "@/lib/AutoNav";
import { Slide } from "@/lib/Slide";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const slide = await getSlide(slug);

  return (
    <div className="w-screen h-screen overflow-y-auto prose max-w-full">
      <Slide slide={slide} />
      <AutoNav />
    </div>
  );
}
