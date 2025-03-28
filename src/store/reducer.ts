import { initialAppState } from "@/constants/store"
import { TokenKey, updateToken } from "@/services/token"
import { AppStoreState } from "@/types/store"
import { User } from "@/types/user"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { produce } from "immer"

export const reducer = (
	state: AppStoreState,
	{ type, payload }: { type: string; payload?: unknown }
) => {
	switch (type) {
		case "SET_STATE":
			return produce(state, draft => {
				Object.assign(draft, payload)
			})
		case "SET_USER":
			return produce(state, draft => {
				draft.user = Object.assign(draft.user || {}, payload) as User
			})
		case "SET_LANG":
			return produce(state, draft => {
				Object.assign(draft.lang, payload)
			})
		case "SET_TOKENS":
			return produce(state, draft => {
				Object.assign(draft.tokens, payload)
				Object.entries(
					payload as Record<TokenKey, string | null>
				).forEach(([key, value]) => {
					updateToken(key as TokenKey, value)
				})
			})
		case "RESET":
			AsyncStorage.clear()
			return initialAppState
		default:
			return state
	}
}
