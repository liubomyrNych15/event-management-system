import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';

export default function EventList() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', py: 4 }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ color: '#333', mb: 2 }}>
            Upcoming Events
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              component={NextLink}
              href="/events/create"
            >
              Create New Event
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={NextLink}
              href="/events/map"
            >
              See Actual Events on Map
            </Button>
          </Box>
        </Box>
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} md={4} key={event.id} {... ({} as any)}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: 4,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <CardContent sx={{ flexGrow: 1, backgroundColor: '#fff', p: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {new Date(event.date).toLocaleDateString()} • {event.location}
                  </Typography>
                  <Typography variant="body1">
                    {event.description.substring(0, 120)}...
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    p: 2,
                    backgroundColor: '#fafafa',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button size="small" component={NextLink} href={`/events/${event.id}`}>
                    Details
                  </Button>
                  <Button size="small" component={NextLink} href={`/events/edit/${event.id}`}>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}