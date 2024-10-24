const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3020; // Port to run your server on

// Read user id and api key from environment variables
const USER_ID = process.env.USER_ID;
const API_KEY = process.env.API_KEY;

app.use(cors()); // Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
}));
app.use(express.json()); // Middleware to parse incoming JSON requests

// Proxy route to forward requests to the external API
// Define the agent route with a dynamic agentId parameter
app.get('/api/agent/:agentId', async (req, res) => {
  const { agentId } = req.params; // Extract agentId from the route parameters
  try {
    const response = await axios.get(`https://api.play.ai/api/v1/agents/${agentId}`, {
      headers: {
        AUTHORIZATION: API_KEY,
        'X-USER-ID': USER_ID,
        accept: 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send('Error fetching data from API');
  }
});

app.post('/api/agent', async (req, res) => {
  const { voice, displayName, description, criticalKnowledge } = req.body;
  
  try {
    const response = await axios.post('https://api.play.ai/api/v1/agents', {
      voice,
      displayName,
      description,
      criticalKnowledge
    }, {
      headers: {
        AUTHORIZATION: API_KEY,
        'X-USER-ID': USER_ID,
        'content-type': 'application/json',
        accept: 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send('Error fetching data from API');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
