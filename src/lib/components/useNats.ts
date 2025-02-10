import { useEffect, useState } from "react";
import { connect, jwtAuthenticator, NatsConnection } from "nats.ws";

// Store the shared connection promise outside of the hook
let connectionPromise: Promise<NatsConnection> | null = null;
let activeConnection: NatsConnection | null = null;
let connectionCount = 0;

async function createConnection() {
  const response = await fetch("/api/auth");
  const { token, seed, server } = await response.json();
  const socket = await connect({
    servers: server,
    authenticator: jwtAuthenticator(token, new TextEncoder().encode(seed)),
    name: "navigation",
  });
  return socket;
}

export function useNats() {
  const [connection, setConnection] = useState<NatsConnection | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    connectionCount++;

    const connectToNats = async () => {
      try {
        // If we already have an active connection, use it
        if (activeConnection) {
          setConnection(activeConnection);
          return;
        }

        // If we're in the process of connecting, wait for that
        if (connectionPromise) {
          const socket = await connectionPromise;
          setConnection(socket);
          return;
        }

        // Otherwise, create a new connection
        connectionPromise = createConnection();
        const socket = await connectionPromise;
        activeConnection = socket;
        setConnection(socket);
      } catch (err) {
        setError(err);
        connectionPromise = null;
        activeConnection = null;
      }
    };

    connectToNats();

    // Cleanup function
    return () => {
      connectionCount--;

      // Only close the connection when no components are using it
      if (connectionCount === 0) {
        if (activeConnection) {
          activeConnection.close();
          activeConnection = null;
        }
        connectionPromise = null;
      }
    };
  }, []);

  return { connection, error };
}
