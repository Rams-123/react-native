import { useReactQueryDevTools } from "@dev-plugins/react-query"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { QueryClient, QueryClientConfig } from "@tanstack/react-query"
import {
	PersistQueryClientProvider,
	persistQueryClient,
} from "@tanstack/react-query-persist-client"
import { useEffect } from "react"
import { AppState, AppStateStatus } from "react-native"

interface QueryProviderProps {
	children: React.ReactNode
	defaultOptions?: QueryClientConfig["defaultOptions"]
	throttleTime?: number
}

export let queryClient: QueryClient
export let asyncStoragePersister: ReturnType<typeof createAsyncStoragePersister>

const QueryProvider = ({
	children,
	defaultOptions,
	throttleTime = 1000 * 5, // Default 5 seconds
}: QueryProviderProps) => {
	queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				gcTime: 1000 * 60 * 60 * 24, // Default 24 hours
				staleTime: 1000 * 60, // Default 1 minute
				retry: 0,
				...defaultOptions?.queries,
			},
		},
	})

	asyncStoragePersister = createAsyncStoragePersister({
		storage: AsyncStorage,
		throttleTime,
	})

	useReactQueryDevTools(queryClient)

	useEffect(() => {
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			if (nextAppState === "inactive" || nextAppState === "background") {
				const [, persistPromise] = persistQueryClient({
					persister: asyncStoragePersister,
					queryClient,
				})

				persistPromise.catch(error => {
					console.error("Failed to persist React Query cache:", error)
				})
			}
		}

		const subscription = AppState.addEventListener(
			"change",
			handleAppStateChange
		)
		return () => subscription.remove()
	}, [])

	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister: asyncStoragePersister }}
			onSuccess={() => {
				queryClient
					.resumePausedMutations()
					.then(() => queryClient.invalidateQueries())
			}}
		>
			{children}
		</PersistQueryClientProvider>
	)
}

export default QueryProvider
