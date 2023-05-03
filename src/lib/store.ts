import { writable, type Writable } from 'svelte/store';
import type { User } from '../models/user';

export const pageTitle = writable('My App');

export const userState: Writable<User | null> = writable();
