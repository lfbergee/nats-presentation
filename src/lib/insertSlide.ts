import { connection } from "next/server";
import { SlideContent } from "./getSlide";
import { getKVs } from "./kv";

export async function insertSlide(key: string, data: SlideContent) {
  await connection();
  const kv = await getKVs(["slides"]);
  await kv.slides.put(key, JSON.stringify(data));

  await kv.nc.close();
}
