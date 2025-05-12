
import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface ParkingSpot {
  id: number;
  name: string;
  position: [number, number];
  price: string;
  isAvailable: boolean;
}

interface MapViewProps {
  onSpotSelect: (spot: any) => void;
}

const MapView: React.FC<MapViewProps> = ({ onSpotSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Indian parking spots with real GPS coordinates (longitude, latitude)
  const parkingSpots = [
    { id: 1, name: "Delhi Central Park", position: [77.2090, 28.6139], price: "200", isAvailable: true },
    { id: 2, name: "Mumbai Marine Drive", position: [72.8213, 18.9438], price: "350", isAvailable: true },
    { id: 3, name: "Bangalore Tech Park", position: [77.5946, 12.9716], price: "250", isAvailable: false },
    { id: 4, name: "Chennai Marina Beach", position: [80.2829, 13.0500], price: "180", isAvailable: true },
    { id: 5, name: "Kolkata Market", position: [88.3639, 22.5726], price: "150", isAvailable: true },
    { id: 6, name: "Hyderabad HITEC City", position: [78.3800, 17.4400], price: "300", isAvailable: true },
    { id: 7, name: "Pune FC Road", position: [73.8567, 18.5204], price: "220", isAvailable: true },
    { id: 8, name: "Jaipur City Palace", position: [75.8235, 26.9124], price: "170", isAvailable: false },
  ];

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Skip if map already initialized or container not available

    // Initialize map centered on India
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Free map style
      center: [78.9629, 20.5937], // Center of India
      zoom: 4,
      attributionControl: true,
    });

    // Add zoom and rotation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setMapLoaded(true);
      console.info("Map loaded successfully");
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add markers once the map is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Add markers for each parking spot
    parkingSpots.forEach((spot) => {
      // Create a marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'parking-marker';
      markerEl.style.cursor = 'pointer';
      markerEl.style.width = '24px';
      markerEl.style.height = '24px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.backgroundColor = spot.isAvailable ? '#2A9D8F' : '#6B7280';
      markerEl.style.border = '2px solid white';

      // Add tooltip with spot information
      const tooltip = `<strong>${spot.name}</strong><br>₹${spot.price}/hr<br>${spot.isAvailable ? 'Available' : 'Unavailable'}`;
      
      // Create the marker and add to the map
      const marker = new maplibregl.Marker({ element: markerEl })
        .setLngLat(spot.position as [number, number])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(tooltip))
        .addTo(map.current);
      
      // Add click event to marker
      markerEl.addEventListener('click', () => {
        if (spot.isAvailable) {
          onSpotSelect(spot);
        }
      });
    });
  }, [mapLoaded, onSpotSelect]);

  return (
    <div className="relative w-full h-[500px] md:h-[700px] rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded-md text-sm">
        <p className="text-gray-700">Click on a marker to see parking details</p>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#2A9D8F] mr-1"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#6B7280] mr-1"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
