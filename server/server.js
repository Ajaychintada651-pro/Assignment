const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3020; // Port to run your server on

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
        AUTHORIZATION: 'ak-94fdc931167c4a13947dcd1e160fe4dd',
        'X-USER-ID': 'gdI8GqG3OGeLcNSr1nbjhgn1iBF2',
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
        AUTHORIZATION: 'ak-94fdc931167c4a13947dcd1e160fe4dd',
        'X-USER-ID': 'gdI8GqG3OGeLcNSr1nbjhgn1iBF2',
        'content-type': 'application/json',
        'accept': 'application/json'
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
