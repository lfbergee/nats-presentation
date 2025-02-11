import { getSlide } from "@/lib/actions/getSlide";
import { Slide } from "@/lib/components/Slide";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const slide = await getSlide(slug);

  return <Slide slide={slide} />;
}
