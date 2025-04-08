import { useAuth } from "@/providers/AuthProvider"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { Pressable, Text, View } from "react-native"
import LoginDialog from "../organisms/LoginDialog"

export default function GetStartedButton() {
	const [isLoginDialogVisible, setIsLoginDialogVisible] = useState(false)
	const router = useRouter()
	const { isLoggedIn } = useAuth()

	const handleGetStarted = () => {
		if (isLoggedIn) {
			// If user is logged in, navigate directly to subjects page
			router.push("/subjects")
		} else {
			// If not logged in, show the login dialog
			setIsLoginDialogVisible(true)
		}
	}

	const closeLoginDialog = () => {
		setIsLoginDialogVisible(false)
	}

	return (
		<>
			<Pressable onPress={handleGetStarted} className="mt-2">
				{({ pressed }) => (
					<View
						className={`rounded-lg bg-blue-500 px-6 py-3 ${pressed ? "opacity-70" : ""}`}
					>
						<Text className="text-center font-semibold text-white">
							Get Started
						</Text>
					</View>
				)}
			</Pressable>

			<LoginDialog
				isVisible={isLoginDialogVisible}
				onClose={closeLoginDialog}
			/>
		</>
	)
}
