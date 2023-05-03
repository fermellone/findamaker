import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { userState } from '$lib/store';

const firebaseConfig = JSON.parse(PUBLIC_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
export const authDataSource = getAuth(app);

export const signInWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	return signInWithPopup(authDataSource, provider);
};

onAuthStateChanged(authDataSource, (user) => {
	if (browser && !user) {
		goto('/login');
	} else {
		userState.set(user);
	}
});
