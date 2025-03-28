import { cn } from "@/lib/utils"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Fragment } from "react"
import { Pressable, Text, View } from "react-native"

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	return (
		<View className="flex-row items-center justify-evenly overflow-hidden border border-neutral-200 bg-neutral-50 shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]

				const additionalOptions =
					(route?.params as { props: any })?.props ?? {}

				if (additionalOptions.hide) {
					return null
				}

				const label = (
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name
				) as string
				const icon = (
					options.tabBarIcon ? options.tabBarIcon : () => Fragment
				) as (props: any) => React.ReactNode

				const isSelected = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					})

					if (!isSelected && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params)
					}
				}

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					})
				}

				return (
					<TabBarItem
						key={route.name}
						{...{
							isSelected,
							onPress,
							onLongPress,
							icon,
							label,
							tabBarShowLabel: options.tabBarShowLabel ?? true,
							options,
						}}
					/>
				)
			})}
		</View>
	)
}

export default TabBar

const TabBarItem = ({
	isSelected,
	tabBarShowLabel,
	onPress,
	onLongPress,
	icon,
	label,
}: {
	isSelected: boolean
	tabBarShowLabel: boolean
	onPress: () => void
	onLongPress: () => void
	icon: (props: any) => React.ReactNode
	label: string
}) => {
	return (
		<Pressable
			onPress={onPress}
			onLongPress={onLongPress}
			className="flex-1 items-center justify-center gap-2 bg-neutral-50 p-4 ios:pb-8 dark:bg-neutral-950"
		>
			{icon({
				color: isSelected ? "#a855f7" : "#64748b",
				size: 24,
			})}
			{tabBarShowLabel && (
				<Text
					className={cn(
						"text-xs",
						isSelected
							? "font-bold text-purple-500"
							: "text-slate-900 dark:text-slate-200"
					)}
				>
					{label}
				</Text>
			)}
		</Pressable>
	)
}
