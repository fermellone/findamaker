import { logGoogleAnalyticsEvent } from './firebase';
// import va from '@vercel/analytics';

export const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
	// va.track(eventName, eventParams as any); TODO implement this only if we're getting a lot of traffic
	logGoogleAnalyticsEvent(eventName, eventParams);
};
