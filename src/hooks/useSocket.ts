'use client';

import { useState, useEffect } from 'react';
import { getSocket } from '../lib/socket';

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    if (socket.connected) setIsConnected(true);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return { isConnected };
}
