const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const { inspirationalQuotes } = require("./inspirationalQuotes");
const { standardQuotes } = require("./standardQuotes");

app.use(cors());
app.use(express.json());

let cachedInspirationalQuote = null;
let cachedStandardQuote = null;
let lastSelectedDate = null;

const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const getQuoteOfTheDay = (quotesArray, cachedQuote) => {
  if (!quotesArray || !Array.isArray(quotesArray)) {
    throw new Error("Invalid quotes array");
  }

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
