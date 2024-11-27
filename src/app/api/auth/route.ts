export async function GET() {
  const token = process.env.NATS_TOKEN;
  return Response.json(token);
}
