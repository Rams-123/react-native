import { AppStoreState } from "@/types/store"

export const initialAppState: AppStoreState = {
	user: null,
	authId: null,
	isAuthenticated: false,
	tokens: {
		access: null,
		refresh: null,
		basicAccess: null,
	},
	lang: {
		app: null,
		content: null,
	},
}
