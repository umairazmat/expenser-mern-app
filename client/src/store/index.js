import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth.js";

// Configure the Redux store with the authReducer
const store = configureStore({
  reducer: {
    auth: authReducer, // Assign the authReducer to the 'auth' slice
  },
});

export default store; // Export the configured Redux store
