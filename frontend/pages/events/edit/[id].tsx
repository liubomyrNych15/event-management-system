import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';

const categories = ['Music', 'Art', 'Sports', 'Tech', 'Education'];

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            title: data.title,
            description: data.description,
            date: new Date(data.date).toISOString().substring(0, 16),
            location: data.location,
            category: data.category,
          });
        })
        .catch(err => console.error('Error fetching event:', err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      router.push('/events');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="Date"
          name="date"
          type="datetime-local"
          fullWidth
          margin="normal"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          margin="normal"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <TextField
          label="Category"
          name="category"
          select
          fullWidth
          margin="normal"
          value={formData.category}
          onChange={handleChange}
          required
        >
          {categories.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" type="submit">
          Update Event
        </Button>
      </form>
    </Container>
  );
}