import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RouterProvider } from "react-router-dom";
import routes from "./routes"; // Import the 'routes' from the separate file (routes.js)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={routes} />
  </React.StrictMode>
);
