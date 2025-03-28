import AxiosManager, { CreateInstanceConfig } from "@/managers/axiosManager"

// Define the configuration interface for instance configurations
interface InstanceConfiguration {
	suffix: string
	options: {
		type?: "basic" | "token"
	}
}

// Define the type for the API instances object
type ApiInstances = Record<string, ReturnType<AxiosManager["getInstance"]>>

// Instance configurations
const INSTANCE_CONFIGURATIONS: InstanceConfiguration[] = [
	{
		suffix: "WithBasicToken",
		options: {
			type: "basic",
		},
	},
	{
		suffix: "WithToken",
		options: {
			type: "token",
		},
	},
	{
		suffix: "WithoutToken",
		options: {},
	},
]

const accessPath = process.env.EXPO_PUBLIC_ACCESS_PATH

if (!accessPath) {
	throw new Error("EXPO_PUBLIC_ACCESS_PATH is not defined")
}

// Refresh token callback function
// const refreshTokenCallback = async (refresh: string): Promise<any> => {
// 	const subDomain =
// 		window.location.hostname === "localhost" ||
// 		window.location.hostname.includes("ngrok") ||
// 		window.location.hostname.includes("vercel")
// 			? process.env.NEXT_PUBLIC_APP_DOMAIN
// 			: window.location.hostname

// 	return axios.post(accessPath, {
// 		refresh,
// 		subDomain,
// 	})
// }

// Create an AxiosManager instance
const axiosManager = new AxiosManager()

// Define instance types with their configurations
const instanceTypes: CreateInstanceConfig[] = [
	{
		name: "client",
		baseURL: process.env.EXPO_PUBLIC_CLIENT_API_URL!,
		refreshTokenCallback: undefined,
		accessPath,
		timeout: Number(process.env.NEXT_PUBLIC_AXIOS_TIMEOUT ?? 5000),
	},
	{
		name: "admin",
		baseURL: process.env.EXPO_PUBLIC_ADMIN_API_URL!,
		refreshTokenCallback: undefined,
		accessPath,
		timeout: Number(process.env.NEXT_PUBLIC_AXIOS_TIMEOUT ?? 5000),
	},
]

// Create API instances
const apiInstances: ApiInstances = {}

instanceTypes.forEach(instanceType => {
	axiosManager.createInstance(instanceType)

	INSTANCE_CONFIGURATIONS.forEach(({ suffix, options }) => {
		const instanceName = `${instanceType.name}${suffix}`
		apiInstances[instanceName] = axiosManager.getInstance(
			instanceType.name,
			options
		)
	})
})

export const {
	// client
	clientWithToken,
	clientWithBasicToken,
	clientWithoutToken,

	// admin
	adminWithToken,
	adminWithBasicToken,
	adminWithoutToken,
} = apiInstances
