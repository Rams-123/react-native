import MaskedView from "@react-native-masked-view/masked-view"
import { LinearGradient } from "expo-linear-gradient"
import { Text, View } from "react-native"

interface GradientTextProps {
	height?: number
	width?: number
	colors?: string[]
	text?: string
}

const GradientText = ({
	height = 16,
	width = 90,
	colors = ["#9333EA", "#CB92FF"],
	text = "Gradient Text",
}: GradientTextProps) => {
	return (
		<MaskedView
			style={{
				height,
				width,
			}}
			maskElement={
				<View className="bg-transparent">
					<Text
						className="font-extrabold text-purple-600"
						style={{
							fontSize: height - 2,
						}}
					>
						{text}
					</Text>
				</View>
			}
		>
			{/* Shows behind the mask, you can put anything here, such as an image */}
			<LinearGradient
				colors={colors}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={{ flex: 1 }}
			/>
		</MaskedView>
	)
}

export default GradientText
