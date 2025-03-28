import { LANGS } from "@/constants/lang"
import useAppStore from "@/store"
import { Sheet, useSheetRef } from "@/ui/sheet"
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import { CheckIcon } from "react-native-heroicons/solid"

interface LangControlSheetProps {
	trigger?: any
	type: "app" | "content"
}

const LangControlSheet = ({ trigger, type = "app" }: LangControlSheetProps) => {
	const { i18n, t } = useTranslation()

	const bottomSheetModalRef = useSheetRef()

	const selectedLang = useAppStore(store => store.lang[type])
	const dispatch = useAppStore(store => store.dispatch)

	const onPress = (lang: string) => {
		dispatch({ type: "SET_LANG", payload: { [type]: lang } })
		AsyncStorage.setItem(`${type}Lang`, lang)
		if (type === "app") {
			i18n.changeLanguage(lang)
		}
		bottomSheetModalRef.current?.dismiss()
	}

	return (
		<>
			{trigger ? (
				React.cloneElement(trigger, {
					onPress: () => bottomSheetModalRef.current?.present(),
				})
			) : (
				<TouchableOpacity
					onPress={() => bottomSheetModalRef.current?.present()}
				>
					<Text>Open</Text>
				</TouchableOpacity>
			)}

			<Sheet
				ref={bottomSheetModalRef}
				snapPoints={["50%"]}
				enableHandlePanningGesture
				enableContentPanningGesture={false}
			>
				<BottomSheetView className="flex-1 gap-4 p-4">
					<Text className="font-semibold text-xl">
						{t("lang.title")}
					</Text>
					<BottomSheetScrollView className="flex-1">
						{LANGS.map(lang => (
							<Pressable
								key={lang.langCode}
								className="flex-row gap-4 border-neutral-100 border-b p-4"
								onPress={onPress.bind(null, lang.locale)}
							>
								{selectedLang === lang.locale ? (
									<CheckIcon size={24} color="black" />
								) : (
									<View className="h-6 w-6" />
								)}
								<Text>{lang.name}</Text>
							</Pressable>
						))}
					</BottomSheetScrollView>
				</BottomSheetView>
			</Sheet>
		</>
	)
}

export default LangControlSheet
