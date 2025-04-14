import { useEffect, useRef } from 'react';

interface Event {
  id: number;
  title: string;
  location: string;
}

interface MapProps {
  events: Event[];
}

export default function Map({ events }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window.google !== 'undefined' && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.0060 }, 
        zoom: 12,
      });

      events.forEach(event => {
        if (event.location) {
          const [lat, lng] = event.location.split(',').map(Number);
          new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: event.title,
          });
        }
      });
    }
  }, [events]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
}