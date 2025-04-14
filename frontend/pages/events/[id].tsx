import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${id}`)
        .then((res) => res.json())
        .then((data) => setEvent(data))
        .catch((err) => console.error('Error fetching event:', err));

      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${id}/recommendations`)
        .then((res) => res.json())
        .then((data) => setRecommendations(data.filter((rec: any) => rec.id !== +id)))
        .catch((err) => console.error('Error fetching recommendations:', err));
    }
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this event?')) {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${id}`, { method: 'DELETE' });
      router.push('/events');
    }
  };

  if (!event)
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );

  return (
    <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', py: 4 }}>
      <Container>
        <Box sx={{ mb: 4, p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h3" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {new Date(event.date).toLocaleString()} • {event.location}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">{event.description}</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button variant="contained" color="primary" onClick={() => router.back()}>
              Back
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
        {recommendations.length > 0 && (
          <Box>
            <Typography variant="h4" gutterBottom>
              You might also like:
            </Typography>
            <Grid container spacing={3}>
              {recommendations.map((rec) => (
                <Grid item key={rec.id} xs={12} md={4} {... ({} as any)}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: 2,
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.02)' },
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="h6">{rec.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(rec.date).toLocaleDateString()} • {rec.location}
                      </Typography>
                    </CardContent>
                    <Box sx={{ pl: 2, pb: 1 }}>
                      <Button size="small" component={NextLink} href={`/events/${rec.id}`}>
                        View Details
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}