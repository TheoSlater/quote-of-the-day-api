const cors = require("cors");
const express = require("express");
const path = require("path"); // Import path module
const app = express();

const { inspirationalQuotes } = require("./inspirationalQuotes");
const { quotes: standardQuotes } = require("./standardQuotes");

app.use(cors());
app.use(express.json());

// Variable to track whether the server is paused
let isPaused = false;

// Middleware to check if the server is paused
app.use((req, res, next) => {
  if (isPaused) {
    return res
      .status(503)
      .json({ message: "Server is paused. Try again later." });
  }
  next();
});

// Serve the HTML UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

let cachedInspirationalQuote = null;
let cachedStandardQuote = null;
let lastSelectedDate = null;

const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const getQuoteOfTheDay = (quotesArray, cachedQuote) => {
  const todayDate = getTodayDateString();
  if (lastSelectedDate !== todayDate || !cachedQuote) {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    cachedQuote = quotesArray[randomIndex];
    lastSelectedDate = todayDate;
  }
  return cachedQuote;
};

app.get("/api/inspirational", (req, res) => {
  const quote = getQuoteOfTheDay(inspirationalQuotes, cachedInspirationalQuote);
  cachedInspirationalQuote = quote;
  res.json({ quote });
});

app.get("/api/standard", (req, res) => {
  const quote = getQuoteOfTheDay(standardQuotes, cachedStandardQuote);
  cachedStandardQuote = quote;
  res.json({ quote });
});

// Routes to control the pause state
app.post("/pause", (req, res) => {
  isPaused = true;
  res.json({ message: "Server is paused." });
});

app.post("/resume", (req, res) => {
  isPaused = false;
  res.json({ message: "Server is resumed." });
});

module.exports = app;
