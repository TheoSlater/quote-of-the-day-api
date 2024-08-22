const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Sample data
const inspirationalQuotes = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do not wait to strike till the iron is hot, but make it hot by striking.",
  // TODO: Add more quotes
];

const standardQuotes = [
  "To be, or not to be, that is the question.",
  "The only thing we have to fear is fear itself.",
  // TODO: Add more quotes
];

// Middleware
app.use(express.json());

// Routes
app.get("/api/inspirational", (req, res) => {
  const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
  res.json({ quote: inspirationalQuotes[randomIndex] });
});

app.get("/api/standard", (req, res) => {
  const randomIndex = Math.floor(Math.random() * standardQuotes.length);
  res.json({ quote: standardQuotes[randomIndex] });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
