"use server";

import { jetstreamManager } from "@nats-io/jetstream";
import { connect } from "../nats/connect";
import { connection } from "next/server";
import { redirect } from "next/navigation";

export async function joinSlidedeck() {
  await connection();

  const nc = await connect();
  const jsm = await jetstreamManager(nc);

  const active = await jsm.streams.get("active");

  console.log(await active.info());

  const msg = await active.getMessage({ last_by_subj: "active.slide" });

  const slide = (msg?.json() as number) ?? 1;
  await nc.close();
  redirect(`/slides/${slide}`);
}
