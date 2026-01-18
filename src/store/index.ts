import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './portfolioSlice';
import { loadPortfolioFromFirestore, savePortfolioToFirestore } from '@/lib/firebase';
import { updateProfile } from './portfolioSlice';

// Load state from localStorage synchronously (for initial render)
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('portfolioState');
    if (serializedState === null) return undefined;
    return { portfolio: JSON.parse(serializedState) };
  } catch (err) {
    return undefined;
  }
};

// Save state to both Firestore (cloud) and localStorage (backup)
let saveTimeout: NodeJS.Timeout | null = null;
const saveState = async (state: RootState) => {
  try {
    // Save to localStorage immediately (for offline support)
    const serializedState = JSON.stringify(state.portfolio);
    localStorage.setItem('portfolioState', serializedState);
    
    // Debounce Firestore saves to avoid too many writes
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    saveTimeout = setTimeout(async () => {
      try {
        // Save to Firestore (cloud storage) - this syncs across all devices
        await savePortfolioToFirestore(state.portfolio);
      } catch (err) {
        console.error('Could not save to Firestore:', err);
      }
    }, 500); // Wait 500ms before saving to Firestore
  } catch (err) {
    console.error('Could not save state:', err);
  }
};

// Create store with initial state from localStorage
export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
  preloadedState: loadStateFromLocalStorage(),
});

// Load from Firestore and update store if data exists (async)
// This runs after initial render and syncs cloud data
const syncFromFirestore = async () => {
  try {
    const firestoreData = await loadPortfolioFromFirestore();
    if (firestoreData) {
      // Update store with Firestore data (this will be the latest version)
      store.dispatch(updateProfile(firestoreData));
      
      // Also update localStorage
      localStorage.setItem('portfolioState', JSON.stringify(firestoreData));
    } else {
      // If Firestore is empty but we have local data, sync it to Firestore
      const localData = localStorage.getItem('portfolioState');
      if (localData) {
        const parsed = JSON.parse(localData);
        await savePortfolioToFirestore(parsed);
      }
    }
  } catch (err) {
    console.error('Error syncing from Firestore:', err);
  }
};

// Sync from Firestore after store is created
syncFromFirestore();

// Subscribe to store changes - save to both Firestore and localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
