import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const pageTitle = writable('My App');

export const userState = writable();

userState.subscribe((user) => {
	if (browser) {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		}
	}
});
