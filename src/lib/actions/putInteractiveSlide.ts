"use server";

import { connection } from "next/server";
import { connect } from "../nats/connect";
import { jetstream } from "@nats-io/jetstream";

export async function putInteractiveSlide(slug: string, option: string) {
  if (slug === "") {
    console.log("slug is empty");
    return;
  }
  await connection();

  const nc = await connect();
  const js = jetstream(nc);
  await js.publish(`interactive.${slug}`, option);

  await nc.close();
}
