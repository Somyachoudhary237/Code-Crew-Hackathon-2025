import { useEffect, useRef } from 'react';
import { Space } from '@shared/schema';

type MapViewProps = {
  spaces: Space[];
  onMarkerClick?: (space: Space) => void;
};

// Add to window object for Leaflet
declare global {
  interface Window {
    L: any;
  }
}

export function MapView({ spaces, onMarkerClick }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    
    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = initializeMap;
    document.head.appendChild(script);
    
    return () => {
      // Clean up
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      document.head.removeChild(link);
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);
  
  // Initialize map when Leaflet is loaded
  const initializeMap = () => {
    if (!window.L || !mapRef.current || mapInstanceRef.current) return;
    
    // Create map instance
    mapInstanceRef.current = window.L.map(mapRef.current).setView([20.5937, 78.9629], 13);
    
    // Add tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);
    
    // Add markers for spaces
    updateMarkers();
  };
  
  // Update markers when spaces change
  useEffect(() => {
    if (window.L && mapInstanceRef.current) {
      updateMarkers();
    }
  }, [spaces]);
  
  const updateMarkers = () => {
    if (!window.L || !mapInstanceRef.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Add new markers
    spaces.forEach(space => {
      // Create availability popup content
      const popupContent = `
        <div class="space-popup">
          <h3>${space.name}</h3>
          <p><strong>Availability:</strong> ${space.availableSeats}/${space.totalSeats} seats</p>
          <p><strong>Type:</strong> ${space.type.replace('_', ' ')}</p>
          <p><strong>Address:</strong> ${space.address}</p>
        </div>
      `;
      
      // Create marker
      const marker = window.L.marker([parseFloat(space.latitude), parseFloat(space.longitude)])
        .addTo(mapInstanceRef.current)
        .bindPopup(popupContent);
      
      // Add click handler
      if (onMarkerClick) {
        marker.on('click', () => onMarkerClick(space));
      }
      
      // Add marker to refs for cleanup
      markersRef.current.push(marker);
    });
  };
  
  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}