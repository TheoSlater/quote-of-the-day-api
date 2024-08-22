# Quote API Integration

This repository provides a quote API service that you can easily integrate into your own NextJS or React project. Follow the instructions below to set up and use the API in your application.

## Getting Started

### 1. **Install Dependencies**

Ensure you have the necessary dependencies installed. For this you will need Material UI (MUI)

run either

```bash
npm i @mui/material @emotion/react @emotion/styled
```
or
```bash
yarn add @mui/material @emotion/react @emotion/styled
```
### 2. Set up the API

Add the folowing code to your project:

## Creating the quote hook

Create a file named `useQuote.ts` (or `useQuote.js` for JavaScript) in your `src/hooks` directory (if you dont have one create it.) and add the following code:

```typescript
import { useState, useEffect } from "react";

export const useQuote = (apiUrl: string) => {
  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuote(data.quote);
      } catch (error: any) {
        console.error("Error fetching the quote:", error);
        setError("Failed to load quote.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [apiUrl]);

  return { quote, loading, error };
};
```
## Creating the QuoteCard component (optional)

Create a file named `QuoteCard.tsx` (or `QuoteCard.js` for JavaScript) in your `components` directory and add the following code:

```typescript
import { Card, CardContent, Typography } from "@mui/material";

interface QuoteCardProps {
  quote: string;
}

const QuoteCard = ({ quote }: QuoteCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {quote}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
```
# Using the Quote API in a Component
Use the `useQuote` hook and `QuoteCard` component in your main component file (e.g., `page.tsx` for Next.js or `App.tsx` for React) as follows:

```typescript
"use client";

import { Container, Box } from "@mui/material";
import dynamic from "next/dynamic";
import QuoteCard from "./components/QuoteCard";
import Navbar from "./components/Navbar";
import { useQuote } from "./hooks/useQuote";

const LoadingSpinner = dynamic(() => import("./components/LoadingSpinner"), {
  ssr: false,
});

export default function Home() {
  const { quote, loading, error } = useQuote(
    "https://quote-of-the-day-api.vercel.app/api/standard"
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: "64px",
          boxSizing: "border-box",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {error ? <div>{error}</div> : <QuoteCard quote={quote} />}
        </Container>
      </Box>
    </Box>
  );
}
```
### 3. Run your project (hoping everything works haha)
Run your project using:

```bash
npm run dev
```
or using yarn:

```bash
yarn dev (for NextJS)
yarn start (for React)
```
**Navigate** to http://localhost:3000 to see the quote displayed on your page.

## Any issues? Please contact me here:
theoslater1@gmail.com

_This API is completely open source. Fork the repo at your own risk._
