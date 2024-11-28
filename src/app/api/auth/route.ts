export async function GET() {
  const token = process.env.NATS_PASSWORD;
  const user = process.env.NATS_USER;
  const server = process.env.NATS_SERVER;
  return Response.json({ token, user, server });
}
