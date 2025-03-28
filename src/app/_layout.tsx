import "@/../global.css"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ThemeProvider } from "@react-navigation/native"
import "expo-dev-client"
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import {
	ReanimatedLogLevel,
	configureReanimatedLogger,
} from "react-native-reanimated"

import {
	useColorScheme,
	useInitialAndroidBarSync,
} from "@/hooks/useColorScheme"
import "@/i18n"
import DevTools from "@/organisms/devtools"
import QueryProvider from "@/providers/query"
import THEME from "@/theme"
import { useEffect } from "react"

export { ErrorBoundary } from "expo-router"

configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false, // Reanimated runs in strict mode by default
})

export default function RootLayout() {
	useInitialAndroidBarSync()
	const { colorScheme, isDarkColorScheme } = useColorScheme()

	useEffect(() => {
		if (__DEV__) {
			activateKeepAwakeAsync()

			return () => {
				deactivateKeepAwake()
			}
		}
	}, [])

	return (
		<>
			<StatusBar
				key={`root-status-bar-${isDarkColorScheme ? "light" : "dark"}`}
				style={isDarkColorScheme ? "light" : "dark"}
			/>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<ActionSheetProvider>
						<ThemeProvider value={THEME[colorScheme]}>
							<QueryProvider>
								<Stack
									screenOptions={{
										animation: "ios_from_right",
									}}
								>
									<Stack.Screen
										name="index"
										options={{
											headerShown: false,
										}}
									/>
								</Stack>
								{__DEV__ ? <DevTools /> : null}
							</QueryProvider>
						</ThemeProvider>
					</ActionSheetProvider>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</>
	)
}
