import GetStartedButton from "@/components/molecules/GetStartedButton"
import { useAuth } from "@/providers/AuthProvider"
import { FontAwesome } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import React from "react"
import {
	ImageBackground,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native"

export default function HomePage() {
	const router = useRouter()
	const { isLoggedIn, user } = useAuth()

	const handleSubjectsPress = () => {
		router.push("/subjects")
	}

	return (
		<SafeAreaView style={styles.container}>
			{isLoggedIn ? (
				<ScrollView showsVerticalScrollIndicator={false}>
					{/* Hero Section with Gradient */}
					<LinearGradient
						colors={["#4c669f", "#3b5998", "#192f6a"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						className="rounded-b-3xl px-5 pt-12 pb-8"
					>
						<View className="mb-4 flex-row items-center justify-between">
							<View>
								<Text className="text-white text-xl">
									Hello,
								</Text>
								<Text className="font-bold text-3xl text-white">
									{user?.name || "Student"}
								</Text>
							</View>
							<View className="flex-row">
								<Pressable className="mr-3 rounded-full bg-white/20 p-3">
									<FontAwesome
										name="search"
										size={22}
										color="#FFFFFF"
									/>
								</Pressable>
								<Pressable className="rounded-full bg-white/20 p-3">
									<FontAwesome
										name="bell"
										size={22}
										color="#FFFFFF"
									/>
								</Pressable>
							</View>
						</View>

						<View className="mt-2 rounded-xl bg-white/10 p-4">
							<Text className="text-base text-white">
								Welcome to your dashboard!
							</Text>
							<Text className="mt-1 text-sm text-white/80">
								Prepare for excellence with our curated{" "}
								{user?.stream || "Science"} stream resources.
							</Text>
						</View>
					</LinearGradient>

					<View style={styles.content}>
						{/* Quick Links Section with Improved Styling */}
						<View className="mt-6 mb-8">
							<Text className="mb-4 font-bold text-gray-800 text-xl">
								Quick Links
							</Text>
							<View className="flex-row flex-wrap justify-between">
								<Pressable
									onPress={handleSubjectsPress}
									className="mb-4 w-[48%] rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 p-5 shadow-sm"
								>
									<View className="mb-2 self-start rounded-lg bg-white/20 p-2">
										<FontAwesome
											name="book"
											size={20}
											color="#FFFFFF"
										/>
									</View>
									<Text className="font-bold text-lg text-white">
										Subjects
									</Text>
									<Text className="mt-1 text-white/80 text-xs">
										View all subjects
									</Text>
								</Pressable>

								<Pressable className="mb-4 w-[48%] rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 p-5 shadow-sm">
									<View className="mb-2 self-start rounded-lg bg-white/20 p-2">
										<FontAwesome
											name="calendar"
											size={20}
											color="#FFFFFF"
										/>
									</View>
									<Text className="font-bold text-lg text-white">
										Schedule
									</Text>
									<Text className="mt-1 text-white/80 text-xs">
										Your timetable
									</Text>
								</Pressable>

								<Pressable className="mb-4 w-[48%] rounded-xl bg-gradient-to-r from-green-500 to-green-700 p-5 shadow-sm">
									<View className="mb-2 self-start rounded-lg bg-white/20 p-2">
										<FontAwesome
											name="trophy"
											size={20}
											color="#FFFFFF"
										/>
									</View>
									<Text className="font-bold text-lg text-white">
										Progress
									</Text>
									<Text className="mt-1 text-white/80 text-xs">
										Track performance
									</Text>
								</Pressable>

								<Pressable className="mb-4 w-[48%] rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 p-5 shadow-sm">
									<View className="mb-2 self-start rounded-lg bg-white/20 p-2">
										<FontAwesome
											name="file-text"
											size={20}
											color="#FFFFFF"
										/>
									</View>
									<Text className="font-bold text-lg text-white">
										Resources
									</Text>
									<Text className="mt-1 text-white/80 text-xs">
										Study materials
									</Text>
								</Pressable>
							</View>
						</View>

						{/* 12th Class Subjects Section - Enhanced */}
						<Pressable
							onPress={handleSubjectsPress}
							className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm"
						>
							<View className="mb-2 flex-row items-center justify-between">
								<View className="flex-row items-center">
									<View className="mr-3 rounded-lg bg-blue-100 p-2">
										<FontAwesome
											name="graduation-cap"
											size={20}
											color="#3b82f6"
										/>
									</View>
									<Text className="font-bold text-gray-800 text-xl">
										12th Class Subjects
									</Text>
								</View>
								<FontAwesome
									name="chevron-right"
									size={16}
									color="#6B7280"
								/>
							</View>
							<Text className="ml-10 text-gray-600">
								Access your {user?.stream || "Science"} stream
								subjects and study materials
							</Text>
						</Pressable>

						{/* Upcoming Events - Redesigned */}
						<View className="mb-10">
							<View className="mb-4 flex-row items-center justify-between">
								<Text className="font-bold text-gray-800 text-xl">
									Upcoming Events
								</Text>
								<Text className="text-blue-500 text-sm">
									View All
								</Text>
							</View>

							<View className="mb-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
								<View className="flex-row">
									<View className="mr-3 rounded-xl bg-blue-100 p-3">
										<Text className="font-bold text-blue-600 text-lg">
											15
										</Text>
										<Text className="text-blue-600 text-xs">
											APR
										</Text>
									</View>
									<View className="flex-1">
										<Text className="font-bold text-gray-800 text-lg">
											Physics Test
										</Text>
										<Text className="text-gray-600 text-sm">
											Tomorrow • 10:00 AM
										</Text>
										<View className="mt-2 flex-row items-center">
											<FontAwesome
												name="map-marker"
												size={14}
												color="#6B7280"
											/>
											<Text className="ml-1 text-gray-500 text-xs">
												Room 204
											</Text>
										</View>
									</View>
								</View>
							</View>

							<View className="mb-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
								<View className="flex-row">
									<View className="mr-3 rounded-xl bg-green-100 p-3">
										<Text className="font-bold text-green-600 text-lg">
											18
										</Text>
										<Text className="text-green-600 text-xs">
											APR
										</Text>
									</View>
									<View className="flex-1">
										<Text className="font-bold text-gray-800 text-lg">
											Chemistry Lab Session
										</Text>
										<Text className="text-gray-600 text-sm">
											Wed, Apr 18 • 2:00 PM
										</Text>
										<View className="mt-2 flex-row items-center">
											<FontAwesome
												name="map-marker"
												size={14}
												color="#6B7280"
											/>
											<Text className="ml-1 text-gray-500 text-xs">
												Lab Building
											</Text>
										</View>
									</View>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			) : (
				<ImageBackground
					source={{
						uri: "https://img.freepik.com/free-vector/abstract-background-with-squares_23-2148995948.jpg",
					}}
					style={{ flex: 1 }}
					imageStyle={{ opacity: 0.15 }}
				>
					<View style={styles.loginContent}>
						<View className="mb-6 rounded-full bg-blue-100/50 p-6">
							<FontAwesome
								name="graduation-cap"
								size={50}
								color="#3b82f6"
							/>
						</View>

						<Text style={styles.title}>Welcome to 12thClass</Text>
						<Text style={styles.subtitle}>
							Your personalized learning journey starts here
						</Text>

						<View className="mt-10 w-full">
							<GetStartedButton />
						</View>

						<View className="mt-8 flex-row">
							<View className="h-[1px] flex-1 self-center bg-gray-300" />
							<Text className="mx-4 text-gray-500">
								Learn with the best
							</Text>
							<View className="h-[1px] flex-1 self-center bg-gray-300" />
						</View>

						<View className="mt-8 flex-row justify-between">
							<View className="items-center">
								<Text className="font-bold text-2xl text-blue-600">
									10K+
								</Text>
								<Text className="text-gray-600 text-xs">
									Students
								</Text>
							</View>
							<View className="items-center">
								<Text className="font-bold text-2xl text-blue-600">
									500+
								</Text>
								<Text className="text-gray-600 text-xs">
									Resources
								</Text>
							</View>
							<View className="items-center">
								<Text className="font-bold text-2xl text-blue-600">
									100+
								</Text>
								<Text className="text-gray-600 text-xs">
									Tutors
								</Text>
							</View>
						</View>
					</View>
				</ImageBackground>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
		paddingHorizontal: 20,
	},
	loginContent: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
		color: "#333",
	},
	subtitle: {
		fontSize: 18,
		color: "#666",
		marginBottom: 10,
		textAlign: "center",
		maxWidth: "80%",
	},
})
