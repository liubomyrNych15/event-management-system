import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../../components/Map'), { ssr: false });

export default function EventMapView() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Map View of Events
      </Typography>
      <MapComponent events={events} />
    </Container>
  );
}