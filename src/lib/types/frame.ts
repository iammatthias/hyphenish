export interface FrameContext {
	user?: {
		fid: number;
		username?: string;
		displayName?: string;
		pfpUrl?: string;
		location?: {
			placeId: string;
			description: string;
		};
	};
	client?: {
		clientFid: number;
		added: boolean;
		safeAreaInsets?: {
			top: number;
			bottom: number;
			left: number;
			right: number;
		};
		notificationDetails?: {
			url: string;
			token: string;
		};
	};
	location?: {
		type: 'cast_embed' | 'notification' | 'launcher' | 'channel';
		cast?: {
			fid: number;
			hash: string;
		};
		notification?: {
			notificationId: string;
			title: string;
			body: string;
		};
		channel?: {
			key: string;
			name: string;
			imageUrl?: string;
		};
	};
}

export interface FrameSDK {
	context: FrameContext;
	actions: {
		ready: () => Promise<void>;
		composeCast?: (options: { text: string; embeds?: string[]; close?: boolean }) => Promise<void>;
	};
	on: (event: 'frameAdded' | 'frameRemoved', callback: () => void) => void;
	removeAllListeners: () => void;
}
