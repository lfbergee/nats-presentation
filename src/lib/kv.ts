import "server-only";

import { KV, Kvm } from "@nats-io/kv";
import { connect } from "./connect";

type KV_NAMES = "slides";

type KVs<T extends KV_NAMES[]> = {
  [K in T[number]]: KV;
};

/**
 * Get KVs stores by names
 * Needs to be called with `await using` syntax to make
 * sure the connection is closed when all references to
 * the KVs is out of scope. This will open as many KV stores
 * as there are names in the array, and the returning KV
 * will be accesible on the returned object by the name.
 *
 * @example
 * await using nats = await getKVs(['some.key', 'some.other.key']);
 * await nats.['some.key'].create("some.key", "some value");
 * await nats.['some.other.key'].keys("some.*");
 *
 * @param name - The name of the KV store
 * @returns The KV stores as `{ [name]: KV }`
 */
export async function getKVs<T extends KV_NAMES[]>(
  kvNames: T,
): Promise<
  KVs<T> & {
    [Symbol.asyncDispose]: () => Promise<void>;
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
    [Symbol.asyncDispose]: async () => {
      await nc.close();
    },
  };
}
