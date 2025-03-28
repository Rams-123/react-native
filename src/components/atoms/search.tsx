import { tailwindToHex } from "@/lib/tailwind"
import { cn } from "@/lib/utils"
import Button from "@/ui/button"
import { FontAwesome } from "@expo/vector-icons"
import { useState } from "react"
import { Keyboard, TextInput, View } from "react-native"

const Search = ({
	searchPhrase,
	setSearchPhrase,
}: {
	searchPhrase: string
	setSearchPhrase: any
}) => {
	const [clicked, setClicked] = useState(false)

	return (
		<View className="flex-row items-center justify-start gap-2">
			<View
				className={cn(
					"flex-row items-center gap-4 rounded-md border border-neutral-200 bg-neutral-100 px-2 py-1 dark:border-neutral-800 dark:bg-neutral-900",
					clicked ? "w-[84%]" : "w-full"
				)}
			>
				<FontAwesome
					name="search"
					size={20}
					color={tailwindToHex("text-slate-500")}
					style={{ padding: 1 }}
				/>
				<TextInput
					className="w-[75%] text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
					placeholder="Search"
					value={searchPhrase}
					onChangeText={setSearchPhrase}
					onFocus={() => {
						setClicked(true)
					}}
				/>
			</View>
			{clicked && (
				<Button
					label="Cancel"
					onPress={() => {
						Keyboard.dismiss()
						setSearchPhrase("")
						setClicked(false)
					}}
				/>
			)}
		</View>
	)
}
export default Search
