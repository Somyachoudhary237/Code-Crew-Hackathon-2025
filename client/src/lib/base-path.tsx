import { createContext, useContext, ReactNode } from 'react';

// Create a context to hold the base path
const BasePathContext = createContext<string>('/');

// Provider component to make base path available throughout the app
export function BasePathProvider({ children }: { children: ReactNode }) {
  // Get the base path from the window object (set in index.html)
  const basePath = (window as any).BASE_URL || '/';
  
  return (
    <BasePathContext.Provider value={basePath}>
      {children}
    </BasePathContext.Provider>
  );
}

// Hook to use the base path
export function useBasePath() {
  return useContext(BasePathContext);
}

// Function to prefix a path with the base path
export function makePath(path: string) {
  const basePath = useBasePath();
  const normalizedBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${normalizedBasePath}${normalizedPath}`;
}