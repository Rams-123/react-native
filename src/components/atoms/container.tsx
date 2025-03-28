import { cn } from "@/lib/utils"
import { useHeaderHeight } from "@react-navigation/elements"
import { useEffect, useMemo } from "react"
import { StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const PADDING = 16

type Position = "top" | "right" | "bottom" | "left"
type PositionArray = [Position, ...Position[]] & { length: 1 | 2 | 3 | 4 }
type PositionType =
	| Position
	| PositionArray
	| "horizontal"
	| "vertical"
	| "all"
	| "none"
	| boolean

const allowPadding = (side: Position, padded: PositionType) => {
	return Array.isArray(padded)
		? padded.includes(side)
		: ["all", true].includes(padded) ||
				(padded === "horizontal" && ["left", "right"].includes(side)) ||
				(padded === "vertical" && ["top", "bottom"].includes(side)) ||
				padded === side
}

const log = (data: any, id: string) => {
	if (id === "") {
		console.log(JSON.stringify(data, null, 4))
	}
}

const Container = ({
	children,
	padded = false,
	nested = false,
	gapLess = false,
	id = "container",
	className = "",
}: {
	children: React.ReactNode
	padded?: PositionType
	nested?: boolean
	gapLess?: boolean
	id?: string
	className?: string
}) => {
	const insets = useSafeAreaInsets()
	const headerOffset = useHeaderHeight()
	const statusBarHeight = StatusBar.currentHeight ?? 0

	const getPadding = (nested: boolean, side: Position) =>
		nested
			? 0
			: insets[side] && side === "top"
				? headerOffset || statusBarHeight
				: insets[side]

	const computePadding = (side: Position) => {
		const inset = getPadding(nested, side)

		if (!Array.isArray(padded) && ["none", false].includes(padded)) {
			log(
				{
					id,
					padded,
					inset,
					nested,
					side,
					insets,
					statusBarHeight,
				},
				id
			)
			return inset
		}

		const applyPadding = allowPadding(side, padded)

		log(
			{
				id,
				padded,
				inset,
				applyPadding,
				nested,
				side,
				statusBarHeight,
			},
			id
		)

		return applyPadding ? inset + PADDING : inset
	}

	const paddingValues = useMemo(
		() => ({
			paddingTop: computePadding("top"),
			paddingRight: computePadding("right"),
			paddingBottom: computePadding("bottom"),
			paddingLeft: computePadding("left"),
		}),
		[padded, nested, insets, headerOffset]
	)

	useEffect(() => {
		log(
			{
				id,
				padded,
				gapLess,
				headerOffset,
				insets,
				paddingValues,
				statusBarHeight,
			},
			id
		)
	}, [])

	return (
		<View
			id={id}
			className={cn(
				"flex-1 bg-neutral-50 transition-all duration-300 ease-in-out dark:bg-neutral-950",
				gapLess ? "gap-0" : "gap-4",
				className
			)}
			style={paddingValues}
		>
			{children}
		</View>
	)
}

export default Container
