import { getKVs } from "./kv";

export type SlideContent = {
  title?: string;
  centerImage?: string;
};

export async function getSlide(slug: string) {
  const kv = await getKVs(["slides"]);

  const slideData = await kv.slides.get(`slide.${slug}`);

  await kv.nc.close();
  const json = (await slideData?.json()) as SlideContent;

  return json;
}
