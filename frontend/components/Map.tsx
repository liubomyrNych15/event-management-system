import { useEffect, useRef } from 'react';

interface Event {
  id: number;
  title: string;
  location: string;
  date?: string;
}

interface MapProps {
  events: Event[];
}

export default function Map({ events }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Geocode function to convert an address (if location is not in lat,lng format) into coordinates.
  const geocodeLocation = async (address: string): Promise<{ lat: number; lng: number }> => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].geometry.location;
    } else {
      throw new Error('Geocoding failed: ' + JSON.stringify(data));
    }
  };

  useEffect(() => {
    if (typeof window.google !== 'undefined' && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.0060 }, // Default center (e.g., New York)
        zoom: 12,
      });

      const addMarkers = async (): Promise<void> => {
        for (const event of events) {
          if (typeof event.location === 'string' && event.location.trim() !== '') {
            let lat: number, lng: number;
            const parts = event.location.split(',');
            if (parts.length === 2) {
              // Assume location is in "lat,lng" format.
              lat = parseFloat(parts[0].trim());
              lng = parseFloat(parts[1].trim());
            } else {
              // Otherwise, try to geocode the provided address.
              try {
                const locationData = await geocodeLocation(event.location);
                lat = locationData.lat;
                lng = locationData.lng;
              } catch (err) {
                console.warn(`Geocoding failed for event ${event.id}:`, event.location);
                continue;
              }
            }

            if (isNaN(lat) || isNaN(lng)) {
              console.warn(`Invalid coordinate values for event ${event.id}: ${event.location}`);
              continue;
            }

            // Create the marker.
            const marker = new window.google.maps.Marker({
              position: { lat, lng },
              map,
              title: event.title,
            });

            // Add click listener to redirect to event details.
            marker.addListener('click', () => {
              // Redirect to the event details page.
              window.location.href = `/events/${event.id}`;
            });
          } else {
            console.warn(`Event ${event.id} is missing a valid location.`);
          }
        }
      };

      addMarkers();
    }
  }, [events]);

  return <div ref={mapRef} style={{ width: '100%', height: '600px' }} />;
}