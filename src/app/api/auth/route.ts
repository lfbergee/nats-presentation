export async function GET() {
  const token = process.env.NATS_PASSWORD;
  const user = process.env.NATS_USER;
  const serverRoot = process.env.NATS_SERVER;

  const server = `${process.env.NODE_ENV === "development" ? "ws" : "wss"}://${serverRoot}:888${process.env.NODE_ENV === "development" ? "8" : "9"}`;
  return Response.json({ token, user, server });
}
