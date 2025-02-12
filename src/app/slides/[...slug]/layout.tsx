import { AutoNav } from "@/lib/components/AutoNav";
import { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return (
    <div className="w-screen h-screen overflow-y-auto prose max-w-full">
      {children}
      <AutoNav />
    </div>
  );
}
