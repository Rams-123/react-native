import { useAuth } from "@/providers/AuthProvider"
import { FontAwesome } from "@expo/vector-icons"
import { Link, usePathname, useRouter } from "expo-router"
import React, { useState } from "react"
import { Pressable, Text, View } from "react-native"
import LoginDialog from "./LoginDialog"

export default function BottomNav() {
	const pathname = usePathname()
	const router = useRouter()
	const { isLoggedIn } = useAuth()
	const [showLoginDialog, setShowLoginDialog] = useState(false)

	const getTabColor = (path: string) => {
		return pathname === path ? "#3B82F6" : "#6B7280"
	}

	const handleLoginPress = () => {
		setShowLoginDialog(true)
	}

	return (
		<>
			<View className="absolute right-0 bottom-0 left-0 border-gray-200 border-t bg-white px-6 pt-2 pb-6">
				<View className="flex-row items-center justify-around">
					{/* Home Tab */}
					<Link href="/" asChild>
						<Pressable>
							{({ pressed }) => (
								<View
									className={`items-center ${pressed ? "opacity-70" : ""}`}
								>
									<FontAwesome
										name="home"
										size={24}
										color={getTabColor("/")}
									/>
									<Text
										style={{ color: getTabColor("/") }}
										className="mt-1 text-xs"
									>
										Home
									</Text>
								</View>
							)}
						</Pressable>
					</Link>

					{/* Doubt Tab */}
					<Link href="/doubt" asChild>
						<Pressable>
							{({ pressed }) => (
								<View
									className={`items-center ${pressed ? "opacity-70" : ""}`}
								>
									<FontAwesome
										name="question-circle"
										size={24}
										color={getTabColor("/doubt")}
									/>
									<Text
										style={{ color: getTabColor("/doubt") }}
										className="mt-1 text-xs"
									>
										Doubt
									</Text>
								</View>
							)}
						</Pressable>
					</Link>

					{/* Subjects Tab */}
					<Pressable onPress={() => router.push("/subjects")}>
						{({ pressed }) => (
							<View
								className={`items-center ${pressed ? "opacity-70" : ""}`}
							>
								<FontAwesome
									name="book"
									size={24}
									color={
										pathname === "/subjects"
											? "#3B82F6"
											: "#6B7280"
									}
								/>
								<Text
									style={{
										color:
											pathname === "/subjects"
												? "#3B82F6"
												: "#6B7280",
									}}
									className="mt-1 text-xs"
								>
									Subjects
								</Text>
							</View>
						)}
					</Pressable>

					{/* Refer Tab - Icon Only */}
					<Link href="/refer" asChild>
						<Pressable>
							{({ pressed }) => (
								<View
									className={`items-center ${pressed ? "opacity-70" : ""}`}
								>
									<FontAwesome
										name="share-alt"
										size={24}
										color={getTabColor("/refer")}
									/>
								</View>
							)}
						</Pressable>
					</Link>

					{/* Profile/Login Tab - Conditionally rendered based on authentication status */}
					{isLoggedIn ? (
						<Pressable onPress={() => router.push("/profile")}>
							{({ pressed }) => (
								<View
									className={`items-center ${pressed ? "opacity-70" : ""}`}
								>
									<FontAwesome
										name="user"
										size={24}
										color={
											pathname === "/profile"
												? "#3B82F6"
												: "#6B7280"
										}
									/>
									<Text
										style={{
											color:
												pathname === "/profile"
													? "#3B82F6"
													: "#6B7280",
										}}
										className="mt-1 text-xs"
									>
										Profile
									</Text>
								</View>
							)}
						</Pressable>
					) : (
						<Pressable
							onPress={handleLoginPress}
							className="active:opacity-70"
						>
							<View className="items-center">
								<FontAwesome
									name="sign-in"
									size={24}
									color="#6B7280"
								/>
								<Text className="mt-1 text-gray-500 text-xs">
									Login
								</Text>
							</View>
						</Pressable>
					)}
				</View>
			</View>

			<LoginDialog
				isVisible={showLoginDialog}
				onClose={() => setShowLoginDialog(false)}
			/>
		</>
	)
}
