import "server-only";

import { KV, Kvm } from "@nats-io/kv";
import { connect } from "./connect";
import { NatsConnection } from "@nats-io/transport-node";

type KV_NAMES = "slides";

type KVs<T extends KV_NAMES[]> = {
  [K in T[number]]: KV;
};

export async function getKVs<T extends KV_NAMES[]>(
  kvNames: T,
): Promise<
  KVs<T> & {
    nc: NatsConnection;
  }
> {
  const nc = await connect();
  const kvm = new Kvm(nc);

  const kvsPromise = kvNames.map((kv) => kvm.open(kv));
  const kvs = await Promise.all(kvsPromise);
  const res = kvs.reduce(
    (acc, kv, idx) => ({
      ...acc,
      [kvNames[idx]]: kv,
    }),
    {} as KVs<T>,
  );

  return {
    ...res,
    nc,
  };
}
