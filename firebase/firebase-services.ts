// Firebase Services
// This file provides service functions for interacting with Firebase

import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore, 
  Firestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  Timestamp
} from 'firebase/firestore';
import { 
  getStorage, 
  FirebaseStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { firebaseConfig } from './firebase-config';

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

export function initializeFirebase() {
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  }
  return { app, auth, db, storage };
}

// ============================================
// AUTH FUNCTIONS
// ============================================

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const { auth } = initializeFirebase();
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signUpWithEmail(email: string, password: string): Promise<User> {
  const { auth } = initializeFirebase();
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signInWithGoogle(): Promise<User> {
  const { auth } = initializeFirebase();
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOut(): Promise<void> {
  const { auth } = initializeFirebase();
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  const { auth } = initializeFirebase();
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
  const { auth } = initializeFirebase();
  return auth.currentUser;
}

// Wallet connection (for Web3 integration)
export async function connectWallet(walletAddress: string): Promise<void> {
  const { db } = initializeFirebase();
  const user = getCurrentUser();
  if (user) {
    await updateDoc(doc(db, 'users', user.uid), {
      walletAddress,
      updatedAt: Timestamp.now()
    });
  }
}

// ============================================
// FIRESTORE CRUD FUNCTIONS
// ============================================

// --- Sponsors ---
export interface Sponsor {
  id?: string;
  userId: string;
  name: string;
  email: string;
  walletAddress?: string;
  camperId?: string;
  amount: number;
  status: 'pending' | 'active' | 'completed';
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export async function createSponsor(data: Omit<Sponsor, 'id' | 'createdAt'>): Promise<string> {
  const { db } = initializeFirebase();
  const docRef = await addDoc(collection(db, 'sponsors'), {
    ...data,
    createdAt: Timestamp.now()
  });
  return docRef.id;
}

export async function getSponsor(sponsorId: string): Promise<Sponsor | null> {
  const { db } = initializeFirebase();
  const docSnap = await getDoc(doc(db, 'sponsors', sponsorId));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Sponsor : null;
}

export async function getUserSponsors(userId: string): Promise<Sponsor[]> {
  const { db } = initializeFirebase();
  const q = query(
    collection(db, 'sponsors'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sponsor));
}

export async function updateSponsor(sponsorId: string, data: Partial<Sponsor>): Promise<void> {
  const { db } = initializeFirebase();
  await updateDoc(doc(db, 'sponsors', sponsorId), {
    ...data,
    updatedAt: Timestamp.now()
  });
}

// --- Campers ---
export interface Camper {
  id?: string;
  name: string;
  age: number;
  bio: string;
  avatar: string;
  impactArea: string;
  heroProgram: boolean;
  skills: string[];
  sponsorshipGoal: number;
  sponsorshipReceived: number;
  status: 'pending' | 'approved' | 'active';
  createdAt: Timestamp;
}

export async function getCampers(limitCount: number = 20): Promise<Camper[]> {
  const { db } = initializeFirebase();
  const q = query(
    collection(db, 'campers'),
    where('status', '==', 'approved'),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Camper));
}

export async function getCamper(camperId: string): Promise<Camper | null> {
  const { db } = initializeFirebase();
  const docSnap = await getDoc(doc(db, 'campers', camperId));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Camper : null;
}

export async function createCamper(data: Omit<Camper, 'id' | 'createdAt'>): Promise<string> {
  const { db } = initializeFirebase();
  const docRef = await addDoc(collection(db, 'campers'), {
    ...data,
    createdAt: Timestamp.now()
  });
  return docRef.id;
}

export async function updateCamper(camperId: string, data: Partial<Camper>): Promise<void> {
  const { db } = initializeFirebase();
  await updateDoc(doc(db, 'campers', camperId), data);
}

// --- Agents ---
export interface Agent {
  id?: string;
  name: string;
  symbol: string;
  description: string;
  avatar: string;
  ownerId: string;
  marketCap: number;
  price: number;
  holders: number;
  volume24h: number;
  priceChange24h: number;
  isTrending: boolean;
  isSpotlight: boolean;
  status: 'active' | 'paused' | 'delisted';
  createdAt: Timestamp;
}

export async function getAgents(sortBy: 'marketCap' | 'holders' | 'volume24h' = 'marketCap', limitCount: number = 20): Promise<Agent[]> {
  const { db } = initializeFirebase();
  const q = query(
    collection(db, 'agents'),
    where('status', '==', 'active'),
    orderBy(sortBy, 'desc'),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Agent));
}

export async function getTrendingAgents(limitCount: number = 10): Promise<Agent[]> {
  const { db } = initializeFirebase();
  const q = query(
    collection(db, 'agents'),
    where('isTrending', '==', true),
    where('status', '==', 'active'),
    orderBy('volume24h', 'desc'),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Agent));
}

export async function getSpotlightAgent(): Promise<Agent | null> {
  const { db } = initializeFirebase();
  const q = query(
    collection(db, 'agents'),
    where('isSpotlight', '==', true),
    where('status', '==', 'active'),
    limit(1)
  );
  const snapshot = await getDocs(q);
  return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Agent;
}

export async function getAgent(agentId: string): Promise<Agent | null> {
  const { db } = initializeFirebase();
  const docSnap = await getDoc(doc(db, 'agents', agentId));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Agent : null;
}

export async function createAgent(data: Omit<Agent, 'id' | 'createdAt'>): Promise<string> {
  const { db } = initializeFirebase();
  const docRef = await addDoc(collection(db, 'agents'), {
    ...data,
    createdAt: Timestamp.now()
  });
  return docRef.id;
}

export async function updateAgent(agentId: string, data: Partial<Agent>): Promise<void> {
  const { db } = initializeFirebase();
  await updateDoc(doc(db, 'agents', agentId), data);
}

// --- RWA (Real World Assets) ---
export interface RWA {
  id?: string;
  name: string;
  description: string;
  propertyType: string;
  location: string;
  image: string;
  totalTokens: number;
  availableTokens: number;
  tokenPrice: number;
  totalValue: number;
  status: 'available' | 'soldout' | 'pending';
  apy: number;
  createdAt: Timestamp;
}

export async function getRWAListings(limitCount: number = 20): Promise<RWA[]> {
  const { db } = initializeFirebase();
  const q = query(
    collection(db, 'rwa'),
    where('status', '==', 'available'),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RWA));
}

export async function getRWA(rwaId: string): Promise<RWA | null> {
  const { db } = initializeFirebase();
  const docSnap = await getDoc(doc(db, 'rwa', rwaId));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as RWA : null;
}

// ============================================
// STORAGE FUNCTIONS
// ============================================

export async function uploadImage(file: File, path: string): Promise<string> {
  const { storage } = initializeFirebase();
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const path = `avatars/${userId}/${Date.now()}_${file.name}`;
  return uploadImage(file, path);
}

export async function uploadAgentImage(agentId: string, file: File): Promise<string> {
  const path = `agents/${agentId}/${Date.now()}_${file.name}`;
  return uploadImage(file, path);
}

export async function uploadRWAImage(rwaId: string, file: File): Promise<string> {
  const path = `rwa/${rwaId}/${Date.now()}_${file.name}`;
  return uploadImage(file, path);
}
