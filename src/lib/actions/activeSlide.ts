"use server";

import { jetstream } from "@nats-io/jetstream";
import { connect } from "../nats/connect";

export async function activeSlide(slug: string) {
  const nc = await connect();

  const js = jetstream(nc);
  await js.publish("active.slide", slug);

  await nc.close();
}
