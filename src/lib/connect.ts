import {
  connect as natsConnect,
  credsAuthenticator,
  NatsConnection,
} from "@nats-io/transport-node";

export async function connect(): Promise<NatsConnection> {
  return natsConnect({
    servers: "connect.ngs.global",
    authenticator: credsAuthenticator(
      new TextEncoder().encode(process.env.NATS_CREDS),
    ),
  });
}