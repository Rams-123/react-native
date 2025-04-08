import { FontAwesome } from "@expo/vector-icons"
import React from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"

export default function DoubtScreen() {
	return (
		<View className="flex-1 bg-white">
			<ScrollView className="flex-1 p-5">
				<Text className="mb-6 font-bold text-2xl text-gray-800">
					Ask Your Doubts
				</Text>

				<View className="mb-6 rounded-xl bg-gray-50 p-5">
					<Text className="mb-3 font-semibold text-gray-800">
						Have a question?
					</Text>
					<TextInput
						className="mb-3 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-800"
						placeholder="Type your question here..."
						multiline
						numberOfLines={4}
						textAlignVertical="top"
					/>
					<Pressable>
						{({ pressed }) => (
							<View
								className={`rounded-lg bg-blue-500 py-3 ${pressed ? "opacity-70" : ""}`}
							>
								<Text className="text-center font-semibold text-white">
									Submit Question
								</Text>
							</View>
						)}
					</Pressable>
				</View>

				<Text className="mb-4 font-bold text-gray-800 text-xl">
					Frequently Asked Questions
				</Text>

				{[
					{
						question: "How do I reset my password?",
						answer: 'You can reset your password by clicking on the "Forgot Password" link on the login screen and following the instructions sent to your email.',
					},
					{
						question: "Can I change my email address?",
						answer: "Yes, you can change your email address in the Profile section under Account Settings.",
					},
					{
						question: "How do I contact support?",
						answer: "You can contact our support team by emailing support@example.com or through the Help section in the app.",
					},
				].map((faq, index) => (
					<View
						key={index}
						className="mb-4 rounded-xl bg-gray-50 p-4"
					>
						<Text className="mb-2 font-semibold text-gray-800">
							{faq.question}
						</Text>
						<Text className="text-gray-600">{faq.answer}</Text>
					</View>
				))}

				{/* Add padding at bottom for BottomNav */}
				<View className="h-24" />
			</ScrollView>
		</View>
	)
}
