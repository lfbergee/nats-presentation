"use client";

import { useEffect, useState } from "react";
import { useNats } from "./useNats";

export function Chat() {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const { connection } = useNats();

  useEffect(() => {
    const wssSubscribe = async () => {
      if (connection) {
        const sub = connection.subscribe("question");

        (async (sub) => {
          for await (const m of sub) {
            const json = m.json() as { name: string; question: string };
            setChatHistory((prev) => [
              ...prev,
              `${json.name}: ${json.question}`,
            ]);
          }
        })(sub);
      }
    };

    wssSubscribe();
    return () => {};
  }, [connection]);

  return (
    <div>
      <ul className="list-none">
        {chatHistory.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
