export async function GET() {
  const token = process.env.NATS_JWT;
  const seed = process.env.NATS_NKEY;
  const serverRoot = process.env.NATS_SERVER;

  const server = serverRoot?.replace("tls://", "wss://");
  return Response.json({ token, seed, server });
}
