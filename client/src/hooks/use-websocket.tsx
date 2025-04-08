import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { Space } from '@shared/schema';
import { useBasePath } from '@/lib/base-path';

type WebSocketMessage = {
  type: string;
  data: any;
};

type WebSocketContextType = {
  spaces: Space[];
  connected: boolean;
  updateSpaceAvailability: (spaceId: number, availableSeats: number) => void;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const basePath = useBasePath();

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // Add base path to WebSocket URL if it exists and is not the root
    const normalizedBasePath = basePath === '/' ? '' : basePath;
    const wsUrl = `${protocol}//${window.location.host}${normalizedBasePath}/ws`;
    
    console.log('Connecting to WebSocket at:', wsUrl);
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
    };
    
    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        
        if (message.type === 'SPACES_UPDATE') {
          setSpaces(message.data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    setSocket(ws);
    
    return () => {
      ws.close();
    };
  }, [basePath]);
  
  const updateSpaceAvailability = useCallback((spaceId: number, availableSeats: number) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'UPDATE_AVAILABILITY',
        data: { spaceId, availableSeats }
      }));
    }
  }, [socket]);
  
  return (
    <WebSocketContext.Provider value={{ spaces, connected, updateSpaceAvailability }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  
  return context;
}