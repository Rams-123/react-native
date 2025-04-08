import { useAuth } from "@/providers/AuthProvider"
import { FontAwesome } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import React, { useState, useEffect } from "react"
import {
	Modal,
	Pressable,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

// Subject card type definition
type Subject = {
	name: string
	icon: keyof typeof FontAwesome.glyphMap
	gradientFrom: string
	gradientTo: string
	textColor: string
}

// Subject data for different streams with improved gradients
const scienceSubjects: Subject[] = [
	{
		name: "Physics",
		icon: "bolt",
		gradientFrom: "#4c669f",
		gradientTo: "#3b5998",
		textColor: "#ffffff",
	},
	{
		name: "Chemistry",
		icon: "flask",
		gradientFrom: "#f12711",
		gradientTo: "#f5af19",
		textColor: "#ffffff",
	},
	{
		name: "Biology",
		icon: "leaf",
		gradientFrom: "#11998e",
		gradientTo: "#38ef7d",
		textColor: "#ffffff",
	},
	{
		name: "Mathematics",
		icon: "calculator",
		gradientFrom: "#8E2DE2",
		gradientTo: "#4A00E0",
		textColor: "#ffffff",
	},
	{
		name: "English",
		icon: "book",
		gradientFrom: "#00b09b",
		gradientTo: "#96c93d",
		textColor: "#ffffff",
	},
]

const commerceSubjects: Subject[] = [
	{
		name: "Accountancy",
		icon: "money",
		gradientFrom: "#4c669f",
		gradientTo: "#3b5998",
		textColor: "#ffffff",
	},
	{
		name: "Business Studies",
		icon: "briefcase",
		gradientFrom: "#f12711",
		gradientTo: "#f5af19",
		textColor: "#ffffff",
	},
	{
		name: "Economics",
		icon: "bar-chart",
		gradientFrom: "#11998e",
		gradientTo: "#38ef7d",
		textColor: "#ffffff",
	},
	{
		name: "Mathematics",
		icon: "calculator",
		gradientFrom: "#8E2DE2",
		gradientTo: "#4A00E0",
		textColor: "#ffffff",
	},
	{
		name: "English",
		icon: "book",
		gradientFrom: "#00b09b",
		gradientTo: "#96c93d",
		textColor: "#ffffff",
	},
]

const artsSubjects: Subject[] = [
	{
		name: "History",
		icon: "building",
		gradientFrom: "#4c669f",
		gradientTo: "#3b5998",
		textColor: "#ffffff",
	},
	{
		name: "Geography",
		icon: "globe",
		gradientFrom: "#f12711",
		gradientTo: "#f5af19",
		textColor: "#ffffff",
	},
	{
		name: "Political Science",
		icon: "gavel",
		gradientFrom: "#11998e",
		gradientTo: "#38ef7d",
		textColor: "#ffffff",
	},
	{
		name: "Sociology",
		icon: "users",
		gradientFrom: "#8E2DE2",
		gradientTo: "#4A00E0",
		textColor: "#ffffff",
	},
	{
		name: "English",
		icon: "book",
		gradientFrom: "#00b09b",
		gradientTo: "#96c93d",
		textColor: "#ffffff",
	},
]

export default function SubjectsScreen() {
	const { user } = useAuth()
	const [subjects, setSubjects] = useState<Subject[]>(scienceSubjects)
	const [stream, setStream] = useState<string>("Science")
	const [board, setBoard] = useState<string>("CBSE")
	const [showYearModal, setShowYearModal] = useState(false)
	const [selectedYear, setSelectedYear] = useState("2024")

	// Generate years from 2024 down to 2015
	const years = Array.from({ length: 10 }, (_, i) => (2024 - i).toString())

	// Set subjects based on user's stream
	useEffect(() => {
		if (user?.stream) {
			setStream(user.stream)
			if (user.stream === "Science") {
				setSubjects(scienceSubjects)
			} else if (user.stream === "Commerce") {
				setSubjects(commerceSubjects)
			} else if (user.stream === "Arts") {
				setSubjects(artsSubjects)
			}
		}

		if (user?.board) {
			setBoard(user.board)
		}
	}, [user])

	const handleYearSelect = (year: string) => {
		setSelectedYear(year)
		setShowYearModal(false)
	}

	return (
		<ScrollView className="flex-1 bg-gray-50 p-4">
			<View className="pb-16">
				{/* Header with Stream and Board */}
				<View className="mb-6 flex-row items-center justify-between">
					<View>
						<Text className="font-bold text-2xl text-gray-800">
							12thClass.com
						</Text>
						<Text className="mt-1 text-gray-600">
							{stream} Stream • {board} • {selectedYear}
						</Text>
					</View>

					<Pressable
						className="rounded-full bg-gray-100 p-3"
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
						onPress={() => setShowYearModal(true)}
					>
						<FontAwesome name="cog" size={20} color="#4B5563" />
					</Pressable>
				</View>

				{/* Year Selection Modal */}
				<Modal
					visible={showYearModal}
					transparent={true}
					animationType="fade"
					onRequestClose={() => setShowYearModal(false)}
				>
					<View className="flex-1 items-center justify-center bg-black/50">
						<View className="max-h-[60%] w-[80%] rounded-2xl bg-white p-4 shadow-lg">
							<View className="mb-4 flex-row items-center justify-between">
								<Text className="font-bold text-gray-800 text-xl">
									Select Year
								</Text>
								<Pressable
									onPress={() => setShowYearModal(false)}
									hitSlop={{
										top: 10,
										bottom: 10,
										left: 10,
										right: 10,
									}}
								>
									<FontAwesome
										name="times"
										size={20}
										color="#4B5563"
									/>
								</Pressable>
							</View>

							<ScrollView className="max-h-[400px]">
								{years.map(year => (
									<TouchableOpacity
										key={year}
										className={`border-gray-100 border-b py-4 ${
											selectedYear === year
												? "bg-blue-50"
												: ""
										}`}
										onPress={() => handleYearSelect(year)}
									>
										<Text
											className={`text-center text-lg ${
												selectedYear === year
													? "font-bold text-blue-600"
													: "text-gray-800"
											}`}
										>
											{year}
										</Text>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>
					</View>
				</Modal>

				{/* Subjects Section */}
				<View className="mb-8">
					<Text className="mb-4 font-semibold text-gray-800 text-xl">
						Subjects
					</Text>

					{/* Subject Cards - Now in a 2-column grid */}
					<View className="flex-row flex-wrap justify-between">
						{subjects.map((subject, index) => (
							<Pressable key={index} className="mb-4 w-[48%]">
								{({ pressed }) => (
									<LinearGradient
										colors={[
											subject.gradientFrom,
											subject.gradientTo,
										]}
										start={{ x: 0, y: 0 }}
										end={{ x: 1, y: 0 }}
										className={`flex h-[130px] justify-between p-5 shadow-md ${pressed ? "opacity-80" : "opacity-100"}`}
										style={{
											borderRadius: 20,
											elevation: 4,
										}}
									>
										<View>
											<View className="mb-3 self-start rounded-lg bg-white/20 p-2">
												<FontAwesome
													name={subject.icon}
													size={24}
													color={subject.textColor}
												/>
											</View>
											<Text
												style={{
													color: subject.textColor,
												}}
												className="font-semibold text-lg"
											>
												{subject.name}
											</Text>
										</View>
										<Text
											style={{ color: subject.textColor }}
											className="mt-auto text-xs opacity-80"
										>
											Tap to view materials
										</Text>
									</LinearGradient>
								)}
							</Pressable>
						))}
					</View>
				</View>

				{/* Recent Activity Section with improved styling */}
				<View>
					<Text className="mb-4 font-semibold text-gray-800 text-xl">
						Recent Activity
					</Text>

					<View className="mb-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
						<Text className="font-medium text-gray-800">
							Physics Test Completed
						</Text>
						<Text className="mt-1 text-gray-600 text-sm">
							Yesterday
						</Text>
					</View>

					<View className="mb-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
						<Text className="font-medium text-gray-800">
							Chemistry Assignment Due
						</Text>
						<Text className="mt-1 text-gray-600 text-sm">
							Tomorrow
						</Text>
					</View>

					<View className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
						<Text className="font-medium text-gray-800">
							Mathematics Practice Session
						</Text>
						<Text className="mt-1 text-gray-600 text-sm">
							3 days ago
						</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}
