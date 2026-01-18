import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './portfolioSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('portfolioState');
    if (serializedState === null) return undefined;
    return { portfolio: JSON.parse(serializedState) };
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state.portfolio);
    localStorage.setItem('portfolioState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
  preloadedState: loadState(),
});

// Subscribe to store changes
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
