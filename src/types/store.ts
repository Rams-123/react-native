import { User } from "./user"

export interface AppStoreState {
	user: User | null
	authId: string | null
	isAuthenticated: boolean
	lang: {
		app: string | null
		content: string | null
	}
	tokens: {
		access: string | null
		refresh: string | null
		basicAccess: string | null
	}
}
