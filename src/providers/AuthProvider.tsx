import React, { createContext, useContext, useState } from "react"

interface User {
	name: string
	email: string
	board?: string
	stream?: string
}

interface AuthContextType {
	isLoggedIn: boolean
	user: User | null
	login: (userData: User) => Promise<void>
	logout: () => void
	verifyOtp: (otp: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [user, setUser] = useState<User | null>(null)

	const verifyOtp = async (otp: string) => {
		// For demo purposes, we'll accept "1234" as the valid OTP
		return otp === "1234"
	}

	const login = async (userData: User) => {
		setIsLoggedIn(true)
		setUser(userData)
	}

	const logout = () => {
		setIsLoggedIn(false)
		setUser(null)
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				user,
				login,
				logout,
				verifyOtp,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
