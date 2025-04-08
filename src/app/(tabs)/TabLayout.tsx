import { Tabs } from "expo-router"
import React from "react"

const TabLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen name="Home" />
			<Tabs.Screen name="Doubts" />
			<Tabs.Screen name="Profile" />
		</Tabs>
	)
}

export default TabLayout
