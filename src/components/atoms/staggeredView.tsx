import { useEffect } from "react"
import { ViewProps } from "react-native"
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated"

const StaggeredView = ({
	index,
	baseDuration = 1000,
	durationVariation = 200,
	delayMultiplier = 0.5,
	className = "",
	children,
	...props
}: {
	index: number
	baseDuration?: number
	durationVariation?: number
	delayMultiplier?: number
	className?: string
	children: React.ReactNode
} & ViewProps) => {
	const opacity = useSharedValue(0)
	const translateY = useSharedValue(40)

	useEffect(() => {
		const extraDuration = index * durationVariation
		const duration = baseDuration + extraDuration
		const delay = duration * delayMultiplier

		opacity.value = withDelay(
			delay,
			withTiming(1, {
				duration,
				easing: Easing.out(Easing.exp),
			})
		)
		translateY.value = withDelay(
			delay,
			withTiming(0, {
				duration,
				easing: Easing.out(Easing.exp),
			})
		)
	}, [
		index,
		opacity,
		translateY,
		baseDuration,
		durationVariation,
		delayMultiplier,
	])

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			transform: [{ translateY: translateY.value }],
		}
	})

	return (
		<Animated.View style={animatedStyle} className={className} {...props}>
			{children}
		</Animated.View>
	)
}

export default StaggeredView
