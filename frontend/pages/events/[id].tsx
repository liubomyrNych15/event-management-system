import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Button } from '@mui/material';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/events/${id}`)
        .then(res => res.json())
        .then(data => setEvent(data))
        .catch(err => console.error('Error fetching event:', err));

      fetch(`http://localhost:3001/events/${id}/recommendations`)
        .then(res => res.json())
        .then(data => setRecommendations(data.filter((e: any) => e.id !== +id)))
        .catch(err => console.error('Error fetching recommendations:', err));
    }
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this event?')) {
      await fetch(`http://localhost:3001/events/${id}`, { method: 'DELETE' });
      router.push('/events');
    }
  };

  if (!event) return <Container>Loading...</Container>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {event.title}
      </Typography>
      <Typography variant="body1">
        Date: {new Date(event.date).toLocaleString()}
      </Typography>
      <Typography variant="body1">Location: {event.location}</Typography>
      <Typography variant="body2" paragraph>
        {event.description}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => router.back()}>
        Back
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: 8 }}>
        Delete
      </Button>
      <Typography variant="h5" style={{ marginTop: '1rem' }}>
        Recommended Events
      </Typography>
      {recommendations.length === 0 ? (
        <Typography>No recommendations available.</Typography>
      ) : (
        recommendations.map(rec => (
          <div key={rec.id}>
            <Link href={`/events/${rec.id}`}>{rec.title}</Link>
          </div>
        ))
      )}
    </Container>
  );
}