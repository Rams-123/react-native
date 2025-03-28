import Container from "@/atoms/container"
import { Text, View } from "react-native"

const Screen = () => {
	return (
		<Container>
			<View className="flex h-full items-center justify-center">
				<Text className="text-center text-4xl">Demo</Text>
			</View>
		</Container>
	)
}

export default Screen
