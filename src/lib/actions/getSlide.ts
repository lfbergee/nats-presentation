import { getKVs } from "../nats/kv";

type Slide = {
  title?: string;
  notes?: string;
};

type ImageSlide = {
  type: "image";
  image: string;
} & Slide;

type TitleSlide = {
  title: string;
  type: "title";
} & Slide;

type TextSlide = {
  type: "text";
  bullets: string[];
} & Slide;

export type SlideContent = ImageSlide | TitleSlide | TextSlide;

export async function getSlide(slug: string) {
  const kv = await getKVs(["slides"]);

  const slideData = await kv.slides.get(`slide.${slug}`);

  await kv.nc.close();
  const json = (await slideData?.json()) as SlideContent;

  return json;
}
