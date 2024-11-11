import { connect } from "@/lib/nats";
import Image from "next/image";

export default async function Home() {
  await connect();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <button className="btn btn-primary">Hello world</button>
    </div>
  );
}
