import { useEffect, useState, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

// WebSocket Server URL
const SOCKET_URL = import.meta.env.VITE_API_URL; // Change this to your actual server URL
console.log(SOCKET_URL);

export function useGameSocket(gameType: 'hilo' | 'mines' | 'blackjack' | null) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!gameType) return; // Don't connect if no game is selected

    // Initialize socket connection
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true, // Prevent auto-connect
    });

    socketInstance.on('connect', () => {
      setConnected(true);
      socketInstance.emit('joinGame', gameType); // Inform server of the game
    });

    socketInstance.on('disconnect', () => {
      console.log(`🔌 Disconnected from ${gameType} game socket`);
      setConnected(false);
      
    });

    setSocket(socketInstance);
    socketInstance.connect();

    return () => {
      socketInstance.disconnect(); // Ensure cleanup when switching games
    };
  }, [gameType]);

  // Emit events
  const emitEvent = useCallback(
    (eventName: string, data: any) => {
      if (socket && connected) {
        socket.emit(eventName, data);
      }
    },
    [socket, connected]
  );

  // Listen to events
  const onEvent = useCallback(
    (eventName: string, callback: (...args: any[]) => void) => {
      if (socket) {
        socket.on(eventName, callback);
      }
    },
    [socket]
  );

  return { socket, emitEvent, onEvent, connected };
}
