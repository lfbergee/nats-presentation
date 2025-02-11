import { AutoNav } from "@/lib/components/AutoNav";
import { Question } from "@/lib/components/Question";
import { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return (
    <div className="w-screen h-screen overflow-y-auto prose max-w-full">
      {children}
      <AutoNav />
      <Question />
    </div>
  );
}
