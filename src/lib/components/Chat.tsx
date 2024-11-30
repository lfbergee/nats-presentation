"use client";

import { connect, usernamePasswordAuthenticator } from "nats.ws";
import { useEffect, useState } from "react";

export function Chat() {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  useEffect(() => {
    const wssSubscribe = async () => {
      const response = await fetch("/api/auth");
      const { token, user, server } = await response.json();
      const socket = await connect({
        servers: server,
        authenticator: usernamePasswordAuthenticator(user, token),
      });

      const sub = socket.subscribe("question");

      (async (sub) => {
        for await (const m of sub) {
          const json = m.json() as { name: string; question: string };
          setChatHistory((prev) => [...prev, `${json.name}: ${json.question}`]);
        }
      })(sub);
    };

    wssSubscribe();
    return () => {};
  }, []);

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
