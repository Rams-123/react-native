import { Sheet, useSheetRef } from "@/ui/sheet"
import React from "react"
import { Dimensions } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { CodeBracketSquareIcon } from "react-native-heroicons/outline"
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated"
import AsyncStorageViewer from "./asyncStorage"

const { width, height } = Dimensions.get("screen")
const BUTTON_SIZE = 128

const BUTTON_BOUNDS = {
	maxX: BUTTON_SIZE - width,
	maxY: BUTTON_SIZE - height,
}

const DevTools = () => {
	const bottomSheetModalRef = useSheetRef()

	const scale = useSharedValue(1)
	const translationX = useSharedValue(0)
	const translationY = useSharedValue(0)
	const prevTranslationX = useSharedValue(0)
	const prevTranslationY = useSharedValue(0)

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translationX.value },
			{ translateY: translationY.value },
			{ scale: scale.value },
		],
	}))

	const resetPosition = ({
		x = 0,
		y = 0,
	}: { x?: number; y?: number } = {}) => {
		translationX.value = withTiming(x, { duration: 100 })
		translationY.value = withTiming(y, { duration: 100 })
	}

	const clampTranslation = () => {
		resetPosition({
			x: Math.min(0, Math.max(translationX.value, BUTTON_BOUNDS.maxX)),
			y: Math.min(0, Math.max(translationY.value, BUTTON_BOUNDS.maxY)),
		})
	}

	const pan = Gesture.Pan()
		.activateAfterLongPress(1000)
		.minDistance(1)
		.onStart(() => {
			prevTranslationX.value = translationX.value
			prevTranslationY.value = translationY.value
			scale.value = withTiming(1.2, { duration: 150 })
		})
		.onUpdate(event => {
			translationX.value = prevTranslationX.value + event.translationX
			translationY.value = prevTranslationY.value + event.translationY
		})
		.onEnd(() => {
			scale.value = withTiming(1, { duration: 150 })
			clampTranslation()
		})
		.runOnJS(true)

	const tap = Gesture.Tap()
		.maxDuration(250)
		.onStart(() => {
			bottomSheetModalRef.current?.present()
		})
		.runOnJS(true)

	return (
		<>
			<GestureDetector gesture={pan}>
				<Animated.View
					className="absolute right-8 bottom-8 scale-100"
					style={[animatedStyles]}
				>
					<GestureDetector gesture={tap}>
						<Animated.View className="inline-flex items-center justify-center rounded-full bg-neutral-950 p-4 transition-colors hover:bg-neutral-950/90 dark:bg-neutral-50 dark:hover:bg-neutral-50/90">
							<CodeBracketSquareIcon size={32} color="white" />
						</Animated.View>
					</GestureDetector>
				</Animated.View>
			</GestureDetector>
			<Sheet
				ref={bottomSheetModalRef}
				snapPoints={["90%"]}
				enableHandlePanningGesture
				enableContentPanningGesture={false}
			>
				<AsyncStorageViewer />
			</Sheet>
		</>
	)
}

export default DevTools
