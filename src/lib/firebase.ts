export const ssr = false;

import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
	getAnalytics,
	initializeAnalytics,
	logEvent,
	setConsent,
	type AnalyticsSettings
} from 'firebase/analytics';
const firebaseConfig = JSON.parse(PUBLIC_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
export const authDataSource = getAuth(app);
export const analytics = getAnalytics(app);

const analyticsDataSource = initializeAnalytics(app);

export const signInWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	return signInWithPopup(authDataSource, provider);
};

export const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
	logEvent(analyticsDataSource, eventName, eventParams);
};
