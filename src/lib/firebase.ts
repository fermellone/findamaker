import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { FIREBASE_CONFIG } from '$env/static/private';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = JSON.parse(FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
export const authDataSource = getAuth(app);

export const signInWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	return signInWithPopup(authDataSource, provider);
};

onAuthStateChanged(authDataSource, (user) => {
	if (browser && !user) goto('/login');
});
