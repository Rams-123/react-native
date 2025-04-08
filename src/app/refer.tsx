import { FontAwesome } from "@expo/vector-icons"
import React from "react"
import {
	Pressable,
	ScrollView,
	Share,
	Text,
	TextInput,
	View,
} from "react-native"

export default function ReferScreen() {
	const referralCode = "YOUR1234"

	const handleShare = async () => {
		try {
			await Share.share({
				message: `Join me on our app! Use my referral code: ${referralCode} when you sign up. Download now: https://example.com/app`,
			})
		} catch (error) {
			console.error("Error sharing:", error)
		}
	}

	return (
		<View className="flex-1 bg-white">
			<ScrollView className="flex-1 p-5">
				<Text className="mb-2 font-bold text-2xl text-gray-800">
					Refer & Earn
				</Text>

				<Text className="mb-6 text-gray-600">
					Invite your friends and earn rewards for each successful
					referral
				</Text>

				<View className="mb-8 items-center rounded-xl bg-blue-50 p-6">
					<View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-blue-500">
						<FontAwesome name="gift" size={40} color="white" />
					</View>

					<Text className="mb-2 text-center font-bold text-gray-800 text-xl">
						Your Referral Code
					</Text>

					<View className="mb-4 w-full flex-row items-center rounded-lg border border-gray-200 bg-white p-2">
						<Text className="flex-1 text-center font-bold text-lg tracking-widest">
							{referralCode}
						</Text>
						<Pressable className="p-2">
							{({ pressed }) => (
								<Text
									className={`text-blue-500 ${pressed ? "opacity-70" : ""}`}
								>
									Copy
								</Text>
							)}
						</Pressable>
					</View>

					<Pressable onPress={handleShare} className="w-full">
						{({ pressed }) => (
							<View
								className={`w-full rounded-lg bg-blue-500 py-3 ${pressed ? "opacity-70" : ""}`}
							>
								<Text className="text-center font-semibold text-white">
									Share with Friends
								</Text>
							</View>
						)}
					</Pressable>
				</View>

				<View className="mb-6 rounded-xl bg-gray-50 p-5">
					<Text className="mb-3 font-semibold text-gray-800">
						How it Works
					</Text>

					{[
						{
							step: "1",
							desc: "Share your referral code with friends",
						},
						{
							step: "2",
							desc: "Your friend signs up using your code",
						},
						{
							step: "3",
							desc: "Both you and your friend get rewards",
						},
					].map((step, index) => (
						<View key={index} className="mb-3 flex-row last:mb-0">
							<View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-blue-500">
								<Text className="font-bold text-white">
									{step.step}
								</Text>
							</View>
							<View className="flex-1 justify-center">
								<Text className="text-gray-700">
									{step.desc}
								</Text>
							</View>
						</View>
					))}
				</View>

				<View className="rounded-xl bg-gray-50 p-5">
					<Text className="mb-3 font-semibold text-gray-800">
						My Referrals
					</Text>

					{/* If no referrals */}
					<View className="items-center py-4">
						<Text className="mb-2 text-gray-500">
							You haven't referred anyone yet
						</Text>
						<Text className="text-gray-500">
							Share your code to get started!
						</Text>
					</View>
				</View>

				{/* Add padding at bottom for BottomNav */}
				<View className="h-24" />
			</ScrollView>
		</View>
	)
}
