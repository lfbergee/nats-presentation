import {
  credsAuthenticator,
  connect as natsConnect,
} from "@nats-io/transport-node";

export async function connect() {
  try {
    const nc = await natsConnect({
      servers: "connect.ngs.global",
      authenticator: credsAuthenticator(
        new TextEncoder().encode(process.env.NATS_CREDS),
      ),
    });
    console.log(`connected to ${nc.getServer()}`);
    // this promise indicates the client closed
    const done = nc.closed();
    // do something with the connection

    // close the connection
    await nc.close();
    // check if the close was OK
    const err = await done;
    if (err) {
      console.log(`error closing:`, err);
    }
  } catch (_err) {
    console.log(`error connecting to ${JSON.stringify(_err)}`);
  }
}
