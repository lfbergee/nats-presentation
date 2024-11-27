import { insertSlide } from "@/lib/insertSlide";

export default async function Page({}) {
  await insertSlide("slide.3", {
    centerImage: "/3.png",
    title: "",
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <button className="btn btn-primary">Hello world</button>
    </div>
  );
}
