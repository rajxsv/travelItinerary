import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import { App, Itineraries, ItineraryDetails } from './components/App';
import './styles/index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <App /> },
      { path: 'itineraries', element: <Itineraries /> },
      { path: 'itinerary-details', element: <ItineraryDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
