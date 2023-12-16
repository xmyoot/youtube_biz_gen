const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/businessIdeas', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Define MongoDB schema and model (e.g., Idea)
const ideaSchema = new mongoose.Schema({
  videoTitle: String,
  businessIdeas: [String],
});

const Idea = mongoose.model('Idea', ideaSchema);

// API endpoint to save business ideas
app.post('/api/saveIdeas', (req, res) => {
  const { videoTitle, businessIdeas } = req.body;

  const newIdea = new Idea({ videoTitle, businessIdeas });

  newIdea.save((err) => {
    if (err) {
      res.status(500).json({ message: 'Failed to save ideas' });
    } else {
      res.status(200).json({ message: 'Ideas saved successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
