import { useAuth } from "@/providers/AuthProvider"
import { FontAwesome } from "@expo/vector-icons"
import { Link, useRouter } from "expo-router"
import { useState } from "react"
import {
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

export default function LoginScreen() {
	const router = useRouter()
	const { login } = useAuth()
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")

	const handleLogin = () => {
		if (email && name) {
			login({ email, name })
			router.push("/profile")
		}
	}

	return (
		<ScrollView
			className="flex-1 bg-gray-50"
			contentContainerStyle={{
				flexGrow: 1,
				paddingBottom: 100, // Extra padding for bottom nav
			}}
		>
			<View className="flex-1 justify-center px-6">
				{/* Login Card */}
				<View className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
					{/* Header */}
					<View className="mb-4 items-center">
						<FontAwesome
							name="user-circle"
							size={64}
							color="#4B5563"
						/>
						<Text className="mt-4 font-bold text-2xl text-gray-800">
							Welcome Back
						</Text>
						<Text className="mt-2 text-gray-500">
							Please sign in to continue
						</Text>
					</View>

					{/* Form Fields */}
					<View className="space-y-4">
						<View>
							<Text className="mb-2 text-gray-600 text-sm">
								Name
							</Text>
							<TextInput
								className="w-full rounded-lg bg-gray-50 px-4 py-3 text-gray-800"
								placeholder="Enter your name"
								value={name}
								onChangeText={setName}
								autoCapitalize="words"
							/>
						</View>

						<View>
							<Text className="mb-2 text-gray-600 text-sm">
								Email
							</Text>
							<TextInput
								className="w-full rounded-lg bg-gray-50 px-4 py-3 text-gray-800"
								placeholder="Enter your email"
								value={email}
								onChangeText={setEmail}
								keyboardType="email-address"
								autoCapitalize="none"
							/>
						</View>
					</View>

					{/* Submit Button */}
					<TouchableOpacity
						onPress={handleLogin}
						className="mt-6 rounded-lg bg-blue-500 py-4"
					>
						<Text className="text-center font-semibold text-white">
							Sign In
						</Text>
					</TouchableOpacity>
				</View>

				{/* Back Link */}
				<Link href="/" className="mt-6">
					<Text className="text-center text-blue-500">
						Back to Home
					</Text>
				</Link>
			</View>
		</ScrollView>
	)
}
