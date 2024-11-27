import { getKVs } from "./kv";

export async function insertSlide(key: string, data: any) {
  const kv = await getKVs(["slides"]);
  await kv.slides.put(key, JSON.stringify(data));

  await kv.nc.close();
}
