import { Join } from "@/lib/components/Join";

export default async function Home() {
  return (
    <div className="grid grid-rows-[1fr_1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <Join />
    </div>
  );
}
