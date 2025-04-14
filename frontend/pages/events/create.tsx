import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';

const categories = ['Music', 'Art', 'Sports', 'Tech', 'Education'];

export default function CreateEvent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`http://192.168.0.101:8080/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      router.push('/events');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Event
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
          Create Event
        </Button>
      </form>
    </Container>
  );
}