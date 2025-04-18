import { writable } from 'svelte/store';
import type { SafeAreaInsets } from '$lib/types/types';

// Frame context state
export const isFrame = writable(false);

// Safe area insets state
export const safeAreaInsets = writable<SafeAreaInsets>({
	top: 0,
	bottom: 0,
	left: 0,
	right: 0
});

// Shared store to indicate if there is content in the output field
export const hasOutput = writable<boolean>(false);
