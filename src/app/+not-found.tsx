import { Link, Stack } from "expo-router"
import { View } from "react-native"

import { Text } from "react-native"

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View className="flex-1 items-center justify-center bg-neutral-white p-5">
				<Text className="text-4xl">This screen doesn't exist.</Text>

				<Link href="/" className="m-4 py-4">
					<Text>Go to home screen!</Text>
				</Link>
			</View>
		</>
	)
}
