const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();

const { inspirationalQuotes } = require("./inspirationalQuotes");
const { quotes: standardQuotes } = require("./standardQuotes");
const { comfortingQuotes } = require("./comfortingQuotes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

let cachedInspirationalQuote = null;
let cachedStandardQuote = null;
let cachedComfortingQuote = null;
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

app.get("/api/comforting", (req, res) => {
  const quote = getQuoteOfTheDay(comfortingQuotes, cachedComfortingQuote);
  cachedComfortingQuote = quote;
  res.json({ quote });
});

module.exports = app;
