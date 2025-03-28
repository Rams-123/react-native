import { Dimensions } from "react-native"

const { width: viewportWidth } = Dimensions.get("window")

export const getItemSize = (cols: number = 2) => {
	return (viewportWidth - 64) / cols
}

const DEBUG = !true

export const createGap = (
	cols: number = 2,
	index: number,
	horizontal: boolean = false
) => {
	const pos = index % cols

	const horizontalPadding =
		cols > 1
			? pos === 0 || pos === cols - 1
				? "pl-1 pr-1"
				: "pl-2 pr-2"
			: ""

	const adjustedPadding = horizontal
		? horizontalPadding.replaceAll("2", "4")
		: horizontalPadding

	const verticalPadding = "pt-2 pb-2"

	return [
		DEBUG ? "border" : null,
		"items-center justify-center",
		adjustedPadding,
		verticalPadding,
	]
		.filter(Boolean)
		.join(" ")
}
