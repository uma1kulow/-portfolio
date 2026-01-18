import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import type { PortfolioState } from '@/store/portfolioSlice';

// Firebase configuration
// Get these values from Firebase Console: Project Settings > General > Your apps
// Create a Firebase project at https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
};

// Initialize Firebase only if configured
let app: ReturnType<typeof initializeApp> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.warn('Firebase is not configured. Using localStorage only. Please configure Firebase to enable cloud sync across devices.');
}

// Portfolio data document ID (you can use a fixed ID since we only have one portfolio)
const PORTFOLIO_DOC_ID = 'portfolio-data';

/**
 * Load portfolio data from Firestore
 */
export const loadPortfolioFromFirestore = async (): Promise<PortfolioState | null> => {
  if (!db || !isFirebaseConfigured()) {
    return null;
  }
  
  try {
    const docRef = doc(db, 'portfolio', PORTFOLIO_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as PortfolioState;
    }
    return null;
  } catch (error) {
    console.error('Error loading portfolio from Firestore:', error);
    return null;
  }
};

/**
 * Save portfolio data to Firestore
 */
export const savePortfolioToFirestore = async (data: PortfolioState): Promise<boolean> => {
  if (!db || !isFirebaseConfigured()) {
    return false;
  }
  
  try {
    const docRef = doc(db, 'portfolio', PORTFOLIO_DOC_ID);
    await setDoc(docRef, data, { merge: false }); // merge: false means replace entire document
    return true;
  } catch (error) {
    console.error('Error saving portfolio to Firestore:', error);
    return false;
  }
};

export { isFirebaseConfigured };
export default app;

