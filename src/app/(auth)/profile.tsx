import { useAuth } from "@/providers/AuthProvider"
import { FontAwesome } from "@expo/vector-icons"
import { Link, useRouter } from "expo-router"
import { Image, Pressable, ScrollView, Text, View } from "react-native"

export default function ProfileScreen() {
	const { isLoggedIn, userImage, userEmail, userName, logout } = useAuth()
	const router = useRouter()

	const handleLogout = () => {
		logout()
		router.push("/")
	}

	return (
		<ScrollView
			className="flex-1 bg-white"
			contentContainerStyle={{ paddingBottom: 100 }}
		>
			{/* Top Section with Image */}
			<View className="items-center bg-gray-50 pt-12 pb-8">
				<View className="mb-4">
					{isLoggedIn && userImage ? (
						<Image
							source={{ uri: userImage }}
							className="h-24 w-24 rounded-full"
						/>
					) : (
						<FontAwesome
							name="user-circle"
							size={96}
							color="#4B5563"
						/>
					)}
				</View>

				<Text className="font-bold text-2xl text-gray-800">
					{isLoggedIn ? userName || "User" : "Please Login"}
				</Text>

				{isLoggedIn && (
					<Text className="mt-2 text-gray-500">
						{userEmail || "user@example.com"}
					</Text>
				)}
			</View>

			{/* Content Section */}
			<View className="space-y-6 p-6">
				{!isLoggedIn ? (
					<Link href="/login" asChild>
						<Pressable className="rounded-lg bg-blue-500 px-6 py-3">
							<Text className="text-center font-semibold text-white">
								Login to view profile
							</Text>
						</Pressable>
					</Link>
				) : (
					<View className="space-y-4">
						<View className="flex-row items-center justify-between rounded-lg bg-gray-50 p-4">
							<Text className="text-gray-600">Email</Text>
							<Text className="text-gray-800">
								{userEmail || "user@example.com"}
							</Text>
						</View>

						{/* Logout Button */}
						<Pressable onPress={handleLogout} className="mt-8">
							{({ pressed }) => (
								<View
									className={`rounded-lg bg-red-500 px-6 py-3 ${pressed ? "opacity-70" : ""}`}
								>
									<Text className="text-center font-semibold text-white">
										Logout
									</Text>
								</View>
							)}
						</Pressable>
					</View>
				)}

				<Link href="/" className="mt-6">
					<Text className="text-center text-blue-500">
						Back to Home
					</Text>
				</Link>
			</View>
		</ScrollView>
	)
}
