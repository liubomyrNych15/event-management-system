import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';

export default function EventList() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Event List
      </Typography>
      <Button variant="contained" color="primary" component={Link} href="/events/create">
        Create New Event
      </Button>
      <Grid container spacing={2} style={{ marginTop: '1rem' }}>
        {events.map(event => (
          <Grid item xs={12} md={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{event.title}</Typography>
                <Typography color="textSecondary">
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography color="textSecondary">{event.location}</Typography>
                <Typography variant="body2">
                  {event.description.substring(0, 100)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} href={`/events/${event.id}`}>
                  Details
                </Button>
                <Button size="small" component={Link} href={`/events/edit/${event.id}`}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}