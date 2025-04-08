import { useAuth } from "@/providers/AuthProvider"
import { FontAwesome } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React from "react"
import { Pressable, Text, View } from "react-native"

export default function Profile() {
	const router = useRouter()
	const { user, logout } = useAuth()

	const handleLogout = () => {
		logout()
		router.replace("/")
	}

	return (
		<View className="flex-1 bg-white p-6">
			<View className="mb-8 items-center">
				<View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-gray-100">
					<FontAwesome name="user" size={48} color="#4B5563" />
				</View>
				<Text className="font-bold text-2xl text-gray-800">
					{user?.name || "User"}
				</Text>
				<Text className="mt-1 text-gray-600">
					{user?.email || "No email provided"}
				</Text>
			</View>

			<View className="space-y-4">
				<View className="rounded-xl bg-gray-50 p-4">
					<Text className="mb-1 font-semibold text-gray-800">
						Account Details
					</Text>
					<Text className="text-gray-600">
						Manage your account settings and preferences
					</Text>
				</View>

				<View className="rounded-xl bg-gray-50 p-4">
					<Text className="mb-1 font-semibold text-gray-800">
						Notifications
					</Text>
					<Text className="text-gray-600">
						Configure your notification preferences
					</Text>
				</View>

				<View className="rounded-xl bg-gray-50 p-4">
					<Text className="mb-1 font-semibold text-gray-800">
						Privacy
					</Text>
					<Text className="text-gray-600">
						Manage your privacy settings
					</Text>
				</View>
			</View>

			<Pressable onPress={handleLogout} className="mt-8">
				{({ pressed }) => (
					<View
						className={`rounded-xl bg-red-500 px-6 py-4 ${pressed ? "opacity-70" : ""}`}
					>
						<Text className="text-center font-semibold text-lg text-white">
							Logout
						</Text>
					</View>
				)}
			</Pressable>
		</View>
	)
}
