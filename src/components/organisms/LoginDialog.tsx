import { useAuth } from "@/providers/AuthProvider"
import { FontAwesome } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { useRouter } from "expo-router"
import React, { useState, useEffect } from "react"
import {
	Animated,
	Image,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native"

interface LoginDialogProps {
	isVisible: boolean
	onClose: () => void
}

// Remote image URLs for the carousel
export const imageUrls = [
	"https://lucdn.letsupgrade.net/assets/login_1_9c2bec928e.avif",
	"https://lucdn.letsupgrade.net/assets/login_2_98bb63c924.avif",
	"https://lucdn.letsupgrade.net/assets/login_3_4bf68537a8.avif",
	"https://lucdn.letsupgrade.net/assets/login_4_a1c8283bca.avif",
]

// Fallback image URLs (publicly accessible images)
const fallbackImageUrls = [
	"https://placehold.co/600x400/3b82f6/ffffff?text=Welcome",
	"https://placehold.co/600x400/3b82f6/ffffff?text=Login",
	"https://placehold.co/600x400/3b82f6/ffffff?text=Join+Us",
	"https://placehold.co/600x400/3b82f6/ffffff?text=Get+Started",
]

// Add board and stream options
const boardOptions = ["CBSE", "MH Board", "KA Board"]
const streamOptions = ["Science", "Arts", "Commerce"]

// Add subject cards data
type Subject = {
	name: string
	bgColor: string
	textColor: string
}

const scienceSubjects: Subject[] = [
	{ name: "Physics", bgColor: "#4c669f", textColor: "#ffffff" },
	{ name: "Chemistry", bgColor: "#f12711", textColor: "#ffffff" },
	{ name: "Biology", bgColor: "#11998e", textColor: "#ffffff" },
	{ name: "Mathematics", bgColor: "#8E2DE2", textColor: "#ffffff" },
	{ name: "English", bgColor: "#00b09b", textColor: "#ffffff" },
]

const commerceSubjects: Subject[] = [
	{ name: "Accountancy", bgColor: "#4c669f", textColor: "#ffffff" },
	{ name: "Business Studies", bgColor: "#f12711", textColor: "#ffffff" },
	{ name: "Economics", bgColor: "#11998e", textColor: "#ffffff" },
	{ name: "Mathematics", bgColor: "#8E2DE2", textColor: "#ffffff" },
	{ name: "English", bgColor: "#00b09b", textColor: "#ffffff" },
]

const artsSubjects: Subject[] = [
	{ name: "History", bgColor: "#4c669f", textColor: "#ffffff" },
	{ name: "Geography", bgColor: "#f12711", textColor: "#ffffff" },
	{ name: "Political Science", bgColor: "#11998e", textColor: "#ffffff" },
	{ name: "Sociology", bgColor: "#8E2DE2", textColor: "#ffffff" },
	{ name: "English", bgColor: "#00b09b", textColor: "#ffffff" },
]

export default function LoginDialog({ isVisible, onClose }: LoginDialogProps) {
	const router = useRouter()
	const { login } = useAuth()
	const [currentStep, setCurrentStep] = useState(1)
	const [mobileNumber, setMobileNumber] = useState("")
	const [otp, setOtp] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const slideAnimation = useState(new Animated.Value(0))[0]
	const [imageError, setImageError] = useState(false)
	const [imageLoading, setImageLoading] = useState(true)

	// Form data
	const [hasFilledForm, setHasFilledForm] = useState(false)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [selectedBoard, setSelectedBoard] = useState("")
	const [selectedStream, setSelectedStream] = useState("")
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [subjects, setSubjects] = useState<Subject[]>(scienceSubjects)

	// Animation effect
	useEffect(() => {
		try {
			if (isVisible) {
				Animated.timing(slideAnimation, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}).start()
			} else {
				Animated.timing(slideAnimation, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}).start()
			}
		} catch (_error) {
			// Animation error - silent fail
		}
	}, [isVisible])

	// Reset image states when changing images
	useEffect(() => {
		let mounted = true
		if (mounted) {
			setImageError(false)
			setImageLoading(true)
		}
		return () => {
			mounted = false
		}
	}, [currentImageIndex])

	// Reset form submitted state when dialog is closed
	useEffect(() => {
		if (!isVisible) {
			setFormSubmitted(false)
		}
	}, [isVisible])

	// Update subjects based on selected stream
	useEffect(() => {
		if (selectedStream === "Science") {
			setSubjects(scienceSubjects)
		} else if (selectedStream === "Commerce") {
			setSubjects(commerceSubjects)
		} else if (selectedStream === "Arts") {
			setSubjects(artsSubjects)
		}
	}, [selectedStream])

	const handleSendOtp = () => {
		if (!mobileNumber || mobileNumber.length < 10) {
			setError("Please enter a valid mobile number")
			return
		}
		setError("")
		setCurrentStep(2)
	}

	const handleVerifyOtp = async () => {
		if (!otp || otp.length < 4) {
			setError("Please enter a valid OTP")
			return
		}

		setError("")
		setIsSubmitting(true)

		try {
			if (otp === "1234") {
				// Check if user has filled the form
				if (!hasFilledForm) {
					// Move to form step
					setCurrentStep(3)
					setIsSubmitting(false)
					return
				}

				// User already has profile, proceed with login
				await login({
					name: name || "User",
					email: email || `user${mobileNumber}@example.com`,
				})
				onClose()
				router.push("/profile")
			} else {
				setError("Invalid OTP. Please use 1234")
			}
		} catch (_err) {
			setError("Failed to verify OTP. Please try again.")
		} finally {
			setIsSubmitting(false)
		}
	}

	// Handle user form submission
	const handleSubmitForm = async () => {
		if (!name) {
			setError("Please enter your name")
			return
		}
		if (!email) {
			setError("Please enter your email")
			return
		}
		if (!selectedBoard) {
			setError("Please select your board")
			return
		}
		if (!selectedStream) {
			setError("Please select your stream")
			return
		}

		setError("")
		setIsSubmitting(true)

		try {
			// Save user info and show success view
			setHasFilledForm(true)
			setFormSubmitted(true)
			setIsSubmitting(false)
		} catch (_err) {
			setError("Failed to submit your information. Please try again.")
			setIsSubmitting(false)
		}
	}

	// Handle final confirmation
	const handleConfirmSubjects = async () => {
		try {
			// Save user info with login
			await login({
				name,
				email,
				board: selectedBoard,
				stream: selectedStream,
			})
			onClose()
			router.push("/profile")
		} catch (_err) {
			setError("Failed to complete registration. Please try again.")
		}
	}

	const handleClose = () => {
		try {
			Animated.timing(slideAnimation, {
				toValue: 0,
				duration: 250,
				useNativeDriver: true,
			}).start(() => {
				// Reset all form fields
				setCurrentStep(1)
				setMobileNumber("")
				setOtp("")
				setError("")
				setName("")
				setEmail("")
				setSelectedBoard("")
				setSelectedStream("")
				onClose()
			})
		} catch (_error) {
			// Animation error - fall back to immediate close
			setCurrentStep(1)
			setMobileNumber("")
			setOtp("")
			setError("")
			setName("")
			setEmail("")
			setSelectedBoard("")
			setSelectedStream("")
			onClose()
		}
	}

	// Navigation functions for images
	const nextImage = () => {
		setCurrentImageIndex(prevIndex =>
			prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
		)
	}

	const prevImage = () => {
		setCurrentImageIndex(prevIndex =>
			prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
		)
	}

	if (!isVisible) {
		return null
	}

	return (
		<Modal
			visible={isVisible}
			transparent={true}
			animationType="none"
			onRequestClose={handleClose}
			statusBarTranslucent={true}
			presentationStyle="overFullScreen"
		>
			<View
				style={{
					flex: 1,
					backgroundColor: "rgba(0,0,0,0.5)",
					zIndex: 1000,
				}}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{ flex: 1, justifyContent: "flex-end" }}
				>
					<Animated.View
						style={{
							transform: [
								{
									translateY: slideAnimation.interpolate({
										inputRange: [0, 1],
										outputRange: [300, 0],
									}),
								},
							],
							zIndex: 1001,
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: -3,
							},
							shadowOpacity: 0.1,
							shadowRadius: 5,
							elevation: 20,
						}}
					>
						<View
							style={{
								backgroundColor: "white",
								borderTopLeftRadius: 16,
								borderTopRightRadius: 16,
								padding: 24,
							}}
						>
							{/* Header */}
							<View
								style={{
									marginBottom: 20,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Text
									style={{
										fontSize: 20,
										fontWeight: "600",
										color: "#1F2937",
									}}
								>
									{currentStep === 1
										? "Sign In"
										: currentStep === 2
											? "Enter OTP"
											: formSubmitted
												? "12th Class"
												: "Complete Profile"}
								</Text>
								<Pressable
									onPress={handleClose}
									hitSlop={{
										top: 12,
										bottom: 12,
										left: 12,
										right: 12,
									}}
									style={{
										backgroundColor: "#F3F4F6",
										borderRadius: 20,
										padding: 8,
									}}
								>
									<FontAwesome
										name="times"
										size={20}
										color="#4B5563"
									/>
								</Pressable>
							</View>

							{/* Error Message */}
							{error && (
								<Text
									style={{
										marginBottom: 16,
										color: "#EF4444",
										fontSize: 14,
										fontWeight: "500",
									}}
								>
									{error}
								</Text>
							)}

							{/* Step 1: Phone Number */}
							{currentStep === 1 && (
								<View>
									{/* Image Display */}
									<View
										style={{
											position: "relative",
											marginBottom: 20,
											height: 200,
											overflow: "hidden",
											borderRadius: 12,
											backgroundColor: "#E5E7EB",
										}}
									>
										{imageLoading && !imageError && (
											<View
												style={{
													position: "absolute",
													top: 0,
													left: 0,
													right: 0,
													bottom: 0,
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												<Text
													style={{ color: "#6B7280" }}
												>
													Loading...
												</Text>
											</View>
										)}

										<Image
											style={{
												width: "100%",
												height: "100%",
												resizeMode: "cover",
												display: imageError
													? "none"
													: "flex",
												borderRadius: 12,
											}}
											source={{
												uri: imageUrls[
													currentImageIndex
												],
											}}
											accessibilityLabel={`Login carousel image ${currentImageIndex + 1}`}
											onLoadStart={() =>
												setImageLoading(true)
											}
											onLoad={() =>
												setImageLoading(false)
											}
											onError={() => {
												setImageLoading(false)
												setImageError(true)
											}}
										/>

										{imageError && (
											<Image
												style={{
													width: "100%",
													height: "100%",
													resizeMode: "cover",
													borderRadius: 12,
												}}
												source={{
													uri: fallbackImageUrls[
														currentImageIndex
													],
												}}
												accessibilityLabel={`Fallback image ${currentImageIndex + 1}`}
											/>
										)}

										{/* Navigation buttons */}
										<View
											style={{
												position: "absolute",
												top: "50%",
												left: 0,
												right: 0,
												transform: [
													{ translateY: -18 },
												],
												flexDirection: "row",
												justifyContent: "space-between",
												paddingHorizontal: 8,
											}}
										>
											<Pressable
												onPress={prevImage}
												style={{
													backgroundColor:
														"rgba(255,255,255,0.8)",
													borderRadius: 18,
													width: 36,
													height: 36,
													alignItems: "center",
													justifyContent: "center",
													shadowColor: "#000",
													shadowOffset: {
														width: 0,
														height: 1,
													},
													shadowOpacity: 0.2,
													shadowRadius: 2,
												}}
											>
												<FontAwesome
													name="chevron-left"
													size={16}
													color="#333"
												/>
											</Pressable>
											<Pressable
												onPress={nextImage}
												style={{
													backgroundColor:
														"rgba(255,255,255,0.8)",
													borderRadius: 18,
													width: 36,
													height: 36,
													alignItems: "center",
													justifyContent: "center",
													shadowColor: "#000",
													shadowOffset: {
														width: 0,
														height: 1,
													},
													shadowOpacity: 0.2,
													shadowRadius: 2,
												}}
											>
												<FontAwesome
													name="chevron-right"
													size={16}
													color="#333"
												/>
											</Pressable>
										</View>
									</View>

									{/* Pagination Dots */}
									<View
										style={{
											marginBottom: 24,
											flexDirection: "row",
											justifyContent: "center",
										}}
									>
										{imageUrls.map((_, index) => (
											<View
												key={index}
												style={{
													marginHorizontal: 4,
													height: 8,
													width: 8,
													borderRadius: 4,
													backgroundColor:
														index ===
														currentImageIndex
															? "#3B82F6"
															: "#D1D5DB",
												}}
											/>
										))}
									</View>

									{/* Mobile Number Input */}
									<Text
										style={{
											marginBottom: 8,
											color: "#4B5563",
											fontSize: 14,
											fontWeight: "500",
										}}
									>
										Mobile Number
									</Text>
									<TextInput
										style={{
											marginBottom: 20,
											width: "100%",
											borderRadius: 12,
											backgroundColor: "#F3F4F6",
											paddingHorizontal: 16,
											paddingVertical: 14,
											fontSize: 16,
											color: "#1F2937",
										}}
										placeholder="Enter your mobile number"
										value={mobileNumber}
										onChangeText={setMobileNumber}
										keyboardType="phone-pad"
										maxLength={10}
									/>

									{/* Continue Button */}
									<Pressable
										onPress={handleSendOtp}
										style={({ pressed }) => ({
											marginTop: 12,
											backgroundColor: "#3B82F6",
											borderRadius: 12,
											paddingVertical: 14,
											opacity: pressed ? 0.8 : 1,
										})}
									>
										<Text
											style={{
												color: "white",
												textAlign: "center",
												fontWeight: "600",
												fontSize: 16,
											}}
										>
											Continue
										</Text>
									</Pressable>
								</View>
							)}

							{/* Step 2: OTP */}
							{currentStep === 2 && (
								<View>
									{/* OTP Input */}
									<Text
										style={{
											marginBottom: 8,
											color: "#4B5563",
											fontSize: 14,
											fontWeight: "500",
										}}
									>
										Enter OTP
									</Text>
									<TextInput
										style={{
											marginBottom: 20,
											width: "100%",
											borderRadius: 12,
											backgroundColor: "#F3F4F6",
											paddingHorizontal: 16,
											paddingVertical: 14,
											fontSize: 16,
											color: "#1F2937",
										}}
										placeholder="Enter OTP (1234)"
										value={otp}
										onChangeText={setOtp}
										keyboardType="number-pad"
										maxLength={4}
									/>

									{/* Verify Button */}
									<Pressable
										onPress={handleVerifyOtp}
										disabled={isSubmitting}
										style={({ pressed }) => ({
											marginTop: 24,
											backgroundColor: "#3B82F6",
											borderRadius: 12,
											paddingVertical: 14,
											opacity:
												pressed || isSubmitting
													? 0.8
													: 1,
										})}
									>
										<Text
											style={{
												color: "white",
												textAlign: "center",
												fontWeight: "600",
												fontSize: 16,
											}}
										>
											{isSubmitting
												? "Processing..."
												: "Verify"}
										</Text>
									</Pressable>
								</View>
							)}

							{/* Step 3: User Profile Form */}
							{currentStep === 3 && !formSubmitted && (
								<ScrollView style={{ maxHeight: 400 }}>
									<View>
										{/* Name Input */}
										<Text
											style={{
												marginBottom: 8,
												color: "#4B5563",
												fontSize: 14,
												fontWeight: "500",
											}}
										>
											Full Name
										</Text>
										<TextInput
											style={{
												marginBottom: 16,
												width: "100%",
												borderRadius: 12,
												backgroundColor: "#F3F4F6",
												paddingHorizontal: 16,
												paddingVertical: 14,
												fontSize: 16,
												color: "#1F2937",
											}}
											placeholder="Enter your full name"
											value={name}
											onChangeText={setName}
										/>

										{/* Email Input */}
										<Text
											style={{
												marginBottom: 8,
												color: "#4B5563",
												fontSize: 14,
												fontWeight: "500",
											}}
										>
											Email Address
										</Text>
										<TextInput
											style={{
												marginBottom: 16,
												width: "100%",
												borderRadius: 12,
												backgroundColor: "#F3F4F6",
												paddingHorizontal: 16,
												paddingVertical: 14,
												fontSize: 16,
												color: "#1F2937",
											}}
											placeholder="Enter your email"
											value={email}
											onChangeText={setEmail}
											keyboardType="email-address"
											autoCapitalize="none"
										/>

										{/* Board Dropdown */}
										<Text
											style={{
												marginBottom: 8,
												color: "#4B5563",
												fontSize: 14,
												fontWeight: "500",
											}}
										>
											Select Board
										</Text>
										<View
											style={{
												marginBottom: 16,
												width: "100%",
												borderRadius: 12,
												overflow: "hidden",
												backgroundColor: "#F3F4F6",
											}}
										>
											<Picker
												selectedValue={selectedBoard}
												onValueChange={value =>
													setSelectedBoard(value)
												}
												style={{
													width: "100%",
													backgroundColor: "#F3F4F6",
													height: 50,
												}}
											>
												<Picker.Item
													label="Select your board"
													value=""
													color="#9CA3AF"
												/>
												{boardOptions.map(board => (
													<Picker.Item
														key={board}
														label={board}
														value={board}
													/>
												))}
											</Picker>
										</View>

										{/* Stream Dropdown */}
										<Text
											style={{
												marginBottom: 8,
												color: "#4B5563",
												fontSize: 14,
												fontWeight: "500",
											}}
										>
											Select Stream
										</Text>
										<View
											style={{
												marginBottom: 24,
												width: "100%",
												borderRadius: 12,
												overflow: "hidden",
												backgroundColor: "#F3F4F6",
											}}
										>
											<Picker
												selectedValue={selectedStream}
												onValueChange={value =>
													setSelectedStream(value)
												}
												style={{
													width: "100%",
													backgroundColor: "#F3F4F6",
													height: 50,
												}}
											>
												<Picker.Item
													label="Select your stream"
													value=""
													color="#9CA3AF"
												/>
												{streamOptions.map(stream => (
													<Picker.Item
														key={stream}
														label={stream}
														value={stream}
													/>
												))}
											</Picker>
										</View>

										{/* Submit Button */}
										<Pressable
											onPress={handleSubmitForm}
											disabled={isSubmitting}
											style={({ pressed }) => ({
												marginTop: 12,
												marginBottom: 16,
												backgroundColor: "#3B82F6",
												borderRadius: 12,
												paddingVertical: 14,
												opacity:
													pressed || isSubmitting
														? 0.8
														: 1,
											})}
										>
											<Text
												style={{
													color: "white",
													textAlign: "center",
													fontWeight: "600",
													fontSize: 16,
												}}
											>
												{isSubmitting
													? "Processing..."
													: "Submit"}
											</Text>
										</Pressable>
									</View>
								</ScrollView>
							)}

							{/* Step 3 (Form Submitted): Subjects Confirmed */}
							{currentStep === 3 && formSubmitted && (
								<ScrollView style={{ maxHeight: 400 }}>
									<View>
										{/* Header with Settings */}
										<View
											style={{
												marginBottom: 16,
												flexDirection: "row",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<Text
												style={{
													fontSize: 18,
													fontWeight: "600",
													color: "#1F2937",
												}}
											>
												{selectedStream} Stream (
												{selectedBoard})
											</Text>
											<Pressable
												style={{
													backgroundColor: "#F3F4F6",
													borderRadius: 20,
													padding: 8,
												}}
												hitSlop={{
													top: 10,
													bottom: 10,
													left: 10,
													right: 10,
												}}
											>
												<FontAwesome
													name="cog"
													size={20}
													color="#4B5563"
												/>
											</Pressable>
										</View>

										{/* Subjects Text */}
										<Text
											style={{
												marginBottom: 12,
												fontSize: 16,
												fontWeight: "500",
												color: "#4B5563",
											}}
										>
											Subjects
										</Text>

										{/* Subject Cards */}
										<View style={{ marginBottom: 24 }}>
											{subjects.map((subject, index) => (
												<View
													key={index}
													style={{
														marginBottom: 12,
														borderRadius: 12,
														padding: 16,
														backgroundColor:
															subject.bgColor,
														shadowColor: "#000",
														shadowOffset: {
															width: 0,
															height: 2,
														},
														shadowOpacity: 0.1,
														shadowRadius: 4,
														elevation: 2,
													}}
												>
													<Text
														style={{
															color: subject.textColor,
															fontSize: 16,
															fontWeight: "600",
														}}
													>
														{subject.name}
													</Text>
												</View>
											))}
										</View>

										{/* Continue Button */}
										<Pressable
											onPress={handleConfirmSubjects}
											style={({ pressed }) => ({
												marginTop: 12,
												backgroundColor: "#3B82F6",
												borderRadius: 12,
												paddingVertical: 14,
												opacity: pressed ? 0.8 : 1,
											})}
										>
											<Text
												style={{
													color: "white",
													textAlign: "center",
													fontWeight: "600",
													fontSize: 16,
												}}
											>
												Continue to Dashboard
											</Text>
										</Pressable>
									</View>
								</ScrollView>
							)}
						</View>
					</Animated.View>
				</KeyboardAvoidingView>
			</View>
		</Modal>
	)
}
