import { forwardRef, useState } from "react"
import { Text, View } from "react-native"

import { blurhash } from "@/constants/image"
import { cn } from "@/lib/utils"
import { Image } from "expo-image"

const Avatar = forwardRef<
	React.ElementRef<typeof View>,
	React.ComponentPropsWithoutRef<typeof View> & {
		squared: boolean
		borderLess: boolean
	}
>(({ className, squared = false, borderLess = false, ...props }, ref) => (
	<View
		ref={ref}
		className={cn(
			"relative flex h-10 w-10 shrink-0 overflow-hidden",
			squared ? "rounded-md" : "rounded-full",
			borderLess ? "" : "border border-neutral-400",
			className
		)}
		{...props}
	/>
))
Avatar.displayName = "Avatar"

const AvatarImage = forwardRef<
	React.ElementRef<typeof Image>,
	React.ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => {
	const [hasError, setHasError] = useState(false)

	if (hasError || !props.source) {
		return null
	}
	return (
		<Image
			ref={ref}
			onError={() => setHasError(true)}
			className={cn("aspect-square h-full w-full", className)}
			placeholder={{ blurhash }}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 10,
			}}
			{...props}
		/>
	)
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = forwardRef<
	React.ElementRef<typeof View>,
	React.ComponentPropsWithoutRef<typeof View> & { textClassName?: string }
>(({ children, className, textClassName, ...props }, ref) => (
	<View
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800",
			className
		)}
		{...props}
	>
		<Text
			className={cn(
				"text-slate-900 text-xs dark:text-slate-200",
				textClassName
			)}
		>
			{children}
		</Text>
	</View>
))
AvatarFallback.displayName = "AvatarFallback"

export { AvatarFallback, AvatarImage, Avatar as default }
