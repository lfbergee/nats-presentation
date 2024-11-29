export async function GET() {
  const token = process.env.NATS_PASSWORD;
  const user = process.env.NATS_USER;
  const serverRoot = process.env.NATS_SERVER;

  const server = `wss://${serverRoot}:8888}`;
  return Response.json({ token, user, server });
}
