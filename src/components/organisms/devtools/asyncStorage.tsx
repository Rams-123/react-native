import { cn, getType } from "@/lib/utils"
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Clipboard from "expo-clipboard"
import React, { useEffect, useState } from "react"
import { Alert, ScrollView, Text, View } from "react-native"

type JSONValue = string | number | boolean | null | JSONData | JSONValue[]
interface JSONData {
	[key: string]: JSONValue
}

const getSize = (value: any, prototypeType: keyof typeof TypeColor) =>
	Array.isArray(value)
		? value.length
		: value instanceof Map || value instanceof Set
			? value.size
			: prototypeType === "object" && value !== null
				? Object.keys(value).length
				: null

const INDENT = 4

const AsyncStorageViewer = () => {
	const [storageItems, setStorageItems] = useState<JSONData | null>(null)

	const copyToClipboard = async (key: string, value: string) => {
		value = JSON.stringify(value, null, 4)

		Alert.alert(key, value, [
			{
				text: "Copy",
				onPress: async () => await Clipboard.setStringAsync(value),
			},
			{ text: "OK" },
		])
	}

	const renderPrimitive = (
		key: string,
		value: any,
		level: number,
		prototypeType: keyof typeof TypeColor
	) => {
		const displayValue =
			value instanceof Date
				? value.toLocaleString()
				: value instanceof RegExp
					? value.toString()
					: String(value)

		return (
			<View
				key={key}
				className={cn("flex-row gap-1", level === 0 && "items-center")}
				style={{ marginLeft: level * INDENT }}
			>
				<View className="flex-row items-center gap-1">
					<Text
						className={cn(
							"text-gray-800",
							level === 0
								? "font-extrabold text-base"
								: "font-bold text-xs"
						)}
					>
						{key}:
					</Text>
					<Text
						className={cn(
							"text-2xs leading-4",
							TypeColor[prototypeType]
						)}
					>
						{prototypeType}
					</Text>
				</View>
				<Text
					className="text-gray-600 text-xs"
					onPress={() => copyToClipboard(key, displayValue)}
				>
					{displayValue}
				</Text>
			</View>
		)
	}

	const renderObject = (
		key: string,
		value: any,
		level: number,
		prototypeType: keyof typeof TypeColor
	) => {
		value =
			getType(value) === "map"
				? Object.fromEntries(value)
				: getType(value) === "set"
					? Array.from(value)
					: value

		const prototypeSize = getSize(value, prototypeType)

		return (
			<ScrollView
				horizontal
				key={key}
				contentContainerClassName="flex flex-col"
				style={{ marginLeft: level * INDENT }}
			>
				<View className="flex-row items-center gap-1">
					<Text
						className={cn(
							"text-gray-800",
							level === 0
								? "font-extrabold text-base"
								: "font-bold text-xs"
						)}
						onPress={() => copyToClipboard(key, value)}
					>
						{key}
					</Text>
					<Text
						className={cn(
							"text-2xs leading-4",
							TypeColor[prototypeType]
						)}
					>
						{prototypeType} {prototypeSize && `[${prototypeSize}]`}
					</Text>
				</View>
				{renderJSON(value as JSONData, level + 1)}
			</ScrollView>
		)
	}

	// Main render function
	const renderJSON = (data: JSONData, level: number = 0): JSX.Element[] => {
		return Object.entries(data).map(([key, value]) => {
			const prototypeType = getType(value) as keyof typeof TypeColor

			return ["object", "array", "set"].includes(prototypeType) &&
				value !== null
				? renderObject(key, value, level, prototypeType)
				: renderPrimitive(key, value, level, prototypeType)
		})
	}

	useEffect(() => {
		;(async () => {
			try {
				let keys = await AsyncStorage.getAllKeys()
				keys = keys.filter(key => key !== "REACT_QUERY_OFFLINE_CACHE")

				if (!keys.length) {
					setStorageItems(null)
					return
				}

				const stores = await AsyncStorage.multiGet(keys)

				const parsedStores = stores.reduce<Record<string, JSONValue>>(
					(acc, [key, value]) => {
						if (!key) {
							return acc
						}

						try {
							acc[key] = value ? JSON.parse(value) : null
						} catch {
							acc[key] = value
						}

						return acc
					},
					{}
				)

				setStorageItems(parsedStores)
			} catch (error) {
				console.error("Error fetching AsyncStorage data:", error)
				Alert.alert("Error", "Failed to fetch AsyncStorage data.")
			}
		})()
	}, [])

	return (
		<>
			<BottomSheetView className="flex-1 gap-4 p-4">
				<Text className="text-center font-semibold text-xl">
					AsyncStorage DevTools
				</Text>
				<BottomSheetScrollView
					className="mb-4 flex-1"
					contentContainerClassName="gap-2"
				>
					{storageItems ? (
						renderJSON(storageItems)
					) : (
						<View className="items-center">
							<Text>NO DATA</Text>
						</View>
					)}
				</BottomSheetScrollView>
			</BottomSheetView>
		</>
	)
}

export default AsyncStorageViewer

const TypeColor = {
	string: "text-red-600",
	number: "text-green-600",
	boolean: "text-blue-600",
	undefined: "text-gray-400",
	null: "text-gray-600",
	object: "text-emerald-700",
	array: "text-sky-600",
	date: "text-violet-600",
	regexp: "text-amber-700",
	set: "text-orange-600",
}
