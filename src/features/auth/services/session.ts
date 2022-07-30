import { storage } from '~/utils/storage';
import type { AuthSession } from '../types/session';

const STORAGE_KEY = 'session';

export function getSession() {
	return storage.get<AuthSession>(STORAGE_KEY);
}

export function setSession(newSession: AuthSession) {
	return storage.set<AuthSession>(STORAGE_KEY, newSession);
}

export function removeSession() {
	storage.remove(STORAGE_KEY);
}
