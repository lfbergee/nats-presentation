"use server";

import { SlideContent } from "./getSlide";
import { getKVs } from "../nats/kv";

export async function insertSlide(key: string, data: SlideContent) {
  const kv = await getKVs(["slides"]);
  await kv.slides.put(key, JSON.stringify(data));

  await kv.nc.close();
}
