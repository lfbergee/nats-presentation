import {
  connect as natsConnect,
  credsAuthenticator,
  NatsConnection,
} from "@nats-io/transport-node";

export async function connect(): Promise<NatsConnection> {
  return natsConnect({
    name: "server-side",
    servers: process.env.NATS_SERVER as string,
    authenticator: credsAuthenticator(
      new TextEncoder().encode(process.env.NATS_CREDS),
    ),
  });
}
