import { initialAppState } from "@/constants/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist, redux } from "zustand/middleware"
import { reducer } from "./reducer"

const useAppStore = create(
	persist(redux(reducer, initialAppState), {
		name: "appStore",
		storage: createJSONStorage(() => AsyncStorage),
	})
)

export default useAppStore
