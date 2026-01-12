// Firebase Configuration and Initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDvMagpBYLNhGFzvqxOUOx0qHmNFSggLwM",
  authDomain: "coachai-camp-ecosystem.firebaseapp.com",
  projectId: "coachai-camp-ecosystem",
  storageBucket: "coachai-camp-ecosystem.firebasestorage.app",
  messagingSenderId: "440209586871",
  appId: "1:440209586871:web:7cf99bd357ed19e2adeb32",
  measurementId: "G-7NZ0F9TM11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Analytics - only initialize in browser environment
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn('Analytics not available:', e);
  }
}
export { analytics };

// Track page view
export const trackPageView = (pageName: string) => {
  if (analytics) {
    logEvent(analytics, 'page_view', { page_title: pageName });
  }
};

// Track button click
export const trackButtonClick = (buttonName: string, context?: Record<string, string>) => {
  if (analytics) {
    logEvent(analytics, 'button_click', { button_name: buttonName, ...context });
  }
};

// Track sponsor signup
export const trackSponsorSignup = (email: string) => {
  if (analytics) {
    logEvent(analytics, 'sponsor_signup', { method: 'email' });
  }
};

// Save sponsor to Firestore
export const saveSponsor = async (data: {
  fullName: string;
  email: string;
  phone?: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'sponsors'), {
      ...data,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    trackSponsorSignup(data.email);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving sponsor:', error);
    return { success: false, error };
  }
};

// Create user account
export const createUserAccount = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return { success: true, existing: true };
    }
    console.error('Error creating user:', error);
    return { success: false, error };
  }
};

// Sign in
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
};

export default app;
