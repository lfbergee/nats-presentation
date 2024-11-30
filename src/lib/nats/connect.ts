import {
  connect as natsConnect,
  usernamePasswordAuthenticator,
  NatsConnection,
} from "@nats-io/transport-node";

export async function connect(): Promise<NatsConnection> {
  return natsConnect({
    servers: process.env.NATS_SERVER as string,
    authenticator: usernamePasswordAuthenticator(
      process.env.NATS_USER as string,
      process.env.NATS_PASSWORD,
    ),
  });
}
