import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = JSON.parse(PUBLIC_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
export const authDataSource = getAuth(app);

export const signInWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	return signInWithPopup(authDataSource, provider);
};
