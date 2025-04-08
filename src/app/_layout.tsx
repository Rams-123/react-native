import React from "react"
import "@/../global.css"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ThemeProvider } from "@react-navigation/native"
import "expo-dev-client"
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
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
import BottomNav from "@/organisms/BottomNav"
import DevTools from "@/organisms/devtools"
import { AuthProvider } from "@/providers/AuthProvider"
import QueryProvider from "@/providers/query"
import THEME from "@/theme"
import { useEffect } from "react"

export { ErrorBoundary } from "expo-router"

configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false,
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
		<AuthProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<StatusBar
					key={`root-status-bar-${isDarkColorScheme ? "light" : "dark"}`}
					style={isDarkColorScheme ? "light" : "dark"}
				/>
				<BottomSheetModalProvider>
					<ActionSheetProvider>
						<ThemeProvider value={THEME[colorScheme]}>
							<QueryProvider>
								<View style={{ flex: 1 }}>
									<Stack
										screenOptions={{
											animation: "ios_from_right",
											contentStyle: {
												paddingBottom: 80,
											},
										}}
									>
										<Stack.Screen
											name="index"
											options={{
												headerShown: false,
											}}
										/>
										<Stack.Screen
											name="(auth)/login"
											options={{
												headerShown: false,
												presentation: "modal",
											}}
										/>
										<Stack.Screen
											name="(auth)/profile"
											options={{
												headerShown: false,
											}}
										/>
									</Stack>
									<BottomNav />
									{__DEV__ ? <DevTools /> : null}
								</View>
							</QueryProvider>
						</ThemeProvider>
					</ActionSheetProvider>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</AuthProvider>
	)
}
