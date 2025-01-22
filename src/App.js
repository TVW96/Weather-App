import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Home from './views/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Weather Where?</h1>
      <Home />
      <Footer />
    </QueryClientProvider>
  );
}