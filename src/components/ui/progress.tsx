import { useEffect, useRef } from "react"
import { Animated, View } from "react-native"

import { cn } from "@/lib/utils"

const Progress = ({
	className,
	value,
	animated = true,
}: {
	className?: string
	value: number
	animated?: boolean
} & React.ComponentPropsWithoutRef<typeof View>) => {
	const widthAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(widthAnim, {
			toValue: value,
			duration: animated ? 1500 : 0,
			useNativeDriver: false,
		}).start()
	}, [widthAnim, value, animated])

	return (
		<View
			className={cn(
				"h-4 w-full overflow-hidden rounded-full bg-neutral-300 dark:bg-neutral-700",
				className
			)}
		>
			<Animated.View
				className={cn("h-full rounded-full bg-purple-500")}
				style={{
					width: widthAnim.interpolate({
						inputRange: [0, 100],
						outputRange: ["0%", "100%"],
					}),
				}}
			/>
		</View>
	)
}

export default Progress
