import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

import { COLORS } from "./colors";

const THEME: { light: Theme; dark: Theme } = {
	light: {
		...DefaultTheme,
		colors: {
			background: COLORS.light.background,
			border: COLORS.light.grey5,
			card: COLORS.light.card,
			notification: COLORS.light.destructive,
			primary: COLORS.light.primary,
			text: COLORS.black,
		},
	},
	dark: {
		...DarkTheme,
		colors: {
			background: COLORS.dark.background,
			border: COLORS.dark.grey5,
			card: COLORS.dark.grey6,
			notification: COLORS.dark.destructive,
			primary: COLORS.dark.primary,
			text: COLORS.white,
		},
	},
};

export default THEME
