"use server";

import { connection } from "next/server";
import { getSlide } from "./getSlide";

export async function getPresenterSlide(slug: string) {
  await connection();

  const slide = await getSlide(slug);
  const nextSlug = parseFloat(slug) + 1;
  const nextSlide = await getSlide(nextSlug.toString());

  return [slide, nextSlide];
}
