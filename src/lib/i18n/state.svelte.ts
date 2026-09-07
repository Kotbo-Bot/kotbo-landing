/**
 * Le site est intégralement prérendu (adapter-static) : il n'y a pas de
 * serveur par requête pour lire l'en-tête Accept-Language. La détection se
 * fait donc côté client, après hydratation - d'où le bref instant en
 * français avant bascule éventuelle vers l'anglais.
 */
export type Locale = 'fr' | 'en';

const STORAGE_KEY = 'kotbo-locale';

let locale = $state<Locale>('fr');

export function getLocale(): Locale {
	return locale;
}

export function setLocale(next: Locale): void {
	locale = next;
	if (typeof document !== 'undefined') {
		document.documentElement.lang = next;
	}
	if (typeof localStorage !== 'undefined') {
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Stockage indisponible (navigation privée, quota) : pas bloquant.
		}
	}
}

/** À appeler une fois, côté client, depuis le layout racine. */
export function initLocale(): void {
	if (typeof window === 'undefined') return;

	let stored: string | null = null;
	try {
		stored = localStorage.getItem(STORAGE_KEY);
	} catch {
		// Stockage indisponible : on retombe sur la langue du navigateur.
	}

	if (stored === 'fr' || stored === 'en') {
		setLocale(stored);
		return;
	}

	const browserLang = navigator.language?.toLowerCase() ?? '';
	setLocale(browserLang.startsWith('en') ? 'en' : 'fr');
}
