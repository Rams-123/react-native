import { useAuth } from "@/providers/AuthProvider"
import { FontAwesome } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React from "react"
import { useState } from "react"
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native"

interface LoginCardProps {
	onClose: () => void
}

export default function LoginCard({ onClose }: LoginCardProps) {
	const router = useRouter()
	const { login } = useAuth()
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [errors, setErrors] = useState({ email: "", name: "" })
	const [isSubmitting, setIsSubmitting] = useState(false)

	const validateForm = () => {
		const newErrors = { email: "", name: "" }
		let isValid = true

		if (!name.trim()) {
			newErrors.name = "Name is required"
			isValid = false
		}

		if (!email.trim()) {
			newErrors.email = "Email is required"
			isValid = false
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Please enter a valid email"
			isValid = false
		}

		setErrors(newErrors)
		return isValid
	}

	const handleLogin = async () => {
		try {
			if (validateForm()) {
				setIsSubmitting(true)
				await login({ email: email.trim(), name: name.trim() })
				onClose()
				router.push("/profile")
			}
		} catch (_error) {
			Alert.alert(
				"Login Error",
				"There was an error logging in. Please try again."
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="w-full"
		>
			<View className="bg-gray-50 p-6 pb-16">
				{/* Header with close button */}
				<View className="mb-8 flex-row items-center justify-between">
					<Pressable
						onPress={onClose}
						className="-ml-2 p-2"
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					>
						<FontAwesome name="times" size={24} color="#4B5563" />
					</Pressable>
					<Text className="font-semibold text-gray-800 text-xl">
						Login
					</Text>
					<View className="w-10" /> {/* Spacer for alignment */}
				</View>

				{/* Form Fields */}
				<View className="space-y-6">
					<View>
						<Text className="mb-2 text-gray-600 text-sm">Name</Text>
						<TextInput
							className={`w-full rounded-lg border bg-white px-4 py-3.5 text-gray-800 ${
								errors.name
									? "border-red-500"
									: "border-gray-200"
							}`}
							placeholder="Enter your name"
							value={name}
							onChangeText={text => {
								setName(text)
								setErrors(prev => ({ ...prev, name: "" }))
							}}
							autoCapitalize="words"
							editable={!isSubmitting}
						/>
						{errors.name ? (
							<Text className="mt-1 text-red-500 text-xs">
								{errors.name}
							</Text>
						) : null}
					</View>

					<View>
						<Text className="mb-2 text-gray-600 text-sm">
							Email
						</Text>
						<TextInput
							className={`w-full rounded-lg border bg-white px-4 py-3.5 text-gray-800 ${
								errors.email
									? "border-red-500"
									: "border-gray-200"
							}`}
							placeholder="Enter your email"
							value={email}
							onChangeText={text => {
								setEmail(text)
								setErrors(prev => ({ ...prev, email: "" }))
							}}
							keyboardType="email-address"
							autoCapitalize="none"
							editable={!isSubmitting}
						/>
						{errors.email ? (
							<Text className="mt-1 text-red-500 text-xs">
								{errors.email}
							</Text>
						) : null}
					</View>

					{/* Submit Button */}
					<Pressable
						onPress={handleLogin}
						className={`mt-6 rounded-lg bg-blue-500 py-4 ${isSubmitting ? "opacity-70" : ""}`}
						disabled={isSubmitting}
					>
						{({ pressed }) => (
							<Text
								className={`text-center font-semibold text-white ${pressed ? "opacity-70" : ""}`}
							>
								{isSubmitting ? "Signing In..." : "Sign In"}
							</Text>
						)}
					</Pressable>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}
