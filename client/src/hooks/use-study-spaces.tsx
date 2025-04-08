import { createContext, useContext, ReactNode, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Space } from '@shared/schema';
import { getQueryFn, apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useWebSocket } from '@/hooks/use-websocket';

export function useStudySpaces() {
  const { toast } = useToast();
  const { spaces, connected, updateSpaceAvailability } = useWebSocket();
  
  // Fetch spaces via REST API (fallback if WebSocket is not connected)
  const { 
    data: apiSpaces, 
    isLoading, 
    error 
  } = useQuery<Space[]>({
    queryKey: ['/api/spaces'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    // Only run the API query if WebSocket is not connected or if spaces array is empty
    enabled: !connected || spaces.length === 0,
  });
  
  // Get spaces by type
  const getSpacesByType = useCallback((type: string) => {
    const allSpaces = connected ? spaces : (apiSpaces || []);
    return allSpaces.filter(space => space.type === type);
  }, [connected, spaces, apiSpaces]);
  
  // Get single space by ID
  const getSpaceById = useCallback((id: number) => {
    const allSpaces = connected ? spaces : (apiSpaces || []);
    return allSpaces.find(space => space.id === id);
  }, [connected, spaces, apiSpaces]);
  
  // Book a space (reduces available seats)
  const bookSpaceMutation = useMutation({
    mutationFn: async (spaceId: number) => {
      const res = await apiRequest('POST', `/api/bookings`, { spaceId });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: 'Booking Successful',
        description: 'Your space has been booked successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Booking Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Add a space to favorites
  const addToFavoritesMutation = useMutation({
    mutationFn: async (spaceId: number) => {
      const res = await apiRequest('POST', `/api/favorites`, { spaceId });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      toast({
        title: 'Added to Favorites',
        description: 'Space has been added to your favorites.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Action Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Remove a space from favorites
  const removeFromFavoritesMutation = useMutation({
    mutationFn: async (spaceId: number) => {
      const res = await apiRequest('DELETE', `/api/favorites/${spaceId}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      toast({
        title: 'Removed from Favorites',
        description: 'Space has been removed from your favorites.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Action Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  return {
    spaces: connected ? spaces : (apiSpaces || []),
    isLoading,
    error,
    connected,
    getSpacesByType,
    getSpaceById,
    updateSpaceAvailability,
    bookSpaceMutation,
    addToFavoritesMutation,
    removeFromFavoritesMutation,
  };
}