import {
  connect as natsConnect,
  credsAuthenticator,
  NatsConnection,
} from "@nats-io/transport-node";
import { getIsAuthenticated } from "@/lib/utils/auth/getToken";
// This is probably quite bad. However it does fail when using
// the expected return type from natsConnect, this should
// be revisited when the nats-io/transport-node is updated.

export async function connect(): Promise<NatsConnection> {
  const isAuthenticated = await getIsAuthenticated();
  if (!isAuthenticated) {
    console.error(
      `Authorization must be handled before connecting to NATS,
      this is only a fallback that will explode the app.`,
    );
    throw new Error("Unauthorized");
  }
  return natsConnect({
    servers: "connect.ngs.global",
    authenticator: credsAuthenticator(
      new TextEncoder().encode(process.env.NATS_CREDS),
    ),
  });
}
