import { tailwindToHex } from "@/lib/tailwind"
import React from "react"
import { Pressable, StyleSheet } from "react-native"
import { HeartIcon as HeartOutlineIcon } from "react-native-heroicons/outline"
import { HeartIcon as HeartSolidIcon } from "react-native-heroicons/solid"
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated"

const Like = ({
	size = 28,
	onPress,
}: { size?: number; onPress?: (liked: number) => void }) => {
	const liked = useSharedValue(0)

	const outlineStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(
						liked.value,
						[0, 2, 1],
						[1, 0],
						Extrapolation.EXTEND
					),
				},
			],
		}
	})

	const fillStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: liked.value,
				},
			],
			opacity: liked.value,
		}
	})

	const handlePress = () => {
		liked.value = withSpring(liked.value ? 0 : 1, {
			damping: 10,
			stiffness: 200,
		})

		onPress?.(liked.value)
	}

	return (
		<Pressable onPress={handlePress}>
			<Animated.View
				style={[StyleSheet.absoluteFillObject, outlineStyle]}
			>
				<HeartOutlineIcon size={size} color="white" strokeWidth={2} />
			</Animated.View>

			<Animated.View style={fillStyle}>
				<HeartSolidIcon
					size={size}
					color={tailwindToHex("bg-rose-600")}
				/>
			</Animated.View>
		</Pressable>
	)
}

export default Like
