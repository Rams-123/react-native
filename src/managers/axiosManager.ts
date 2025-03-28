import { getToken, removeTokens, setTokens } from "@/services/token"
import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios"

const DEFAULT_TIMEOUT = 5000
const DEFAULT_TIMEOUT_ERROR_MESSAGE = "Oops! Network is unstable. Please retry."

const INSTANCE_CONFIGURATIONS = {
	basic: { suffix: "WithBasicToken", options: { withBasicToken: true } },
	token: { suffix: "WithToken", options: {} },
	default: {
		suffix: "WithoutToken",
		options: { withResponseInterceptors: false },
	},
}

export interface CreateInstanceConfig {
	name: string
	baseURL: string
	refreshTokenCallback?: (refreshToken: string) => Promise<any>
	accessPath: string
	timeout?: number
	timeoutErrorMessage?: string
}

interface GetInstanceOptions {
	type?: "basic" | "token" | "default"
}

class AxiosManager {
	private instances: Record<string, AxiosInstance>
	private refreshTokenCallback?: (refreshToken: string) => Promise<any>
	private accessPath: string

	constructor() {
		this.instances = {}
		this.refreshTokenCallback = undefined
		this.accessPath = ""
	}

	createInstance({
		name,
		baseURL,
		refreshTokenCallback,
		accessPath,
		timeout = DEFAULT_TIMEOUT,
		timeoutErrorMessage = DEFAULT_TIMEOUT_ERROR_MESSAGE,
	}: CreateInstanceConfig): void {
		if (!name || typeof name !== "string" || name.trim().length === 0) {
			throw new Error("Instance name must be a non-empty string.")
		}

		if (
			!baseURL ||
			typeof baseURL !== "string" ||
			baseURL.trim().length === 0
		) {
			throw new Error("Base URL must be a non-empty string.")
		}

		if (!accessPath || typeof accessPath !== "string") {
			throw new Error("Access path must be a non-empty string.")
		}
		this.accessPath = accessPath

		this.refreshTokenCallback = refreshTokenCallback

		const axiosConfig: AxiosRequestConfig = {
			baseURL,
			headers: {
				"Content-Type": "application/json",
			},
			timeout,
			timeoutErrorMessage,
		}

		const createInstanceWithInterceptors = (
			config: AxiosRequestConfig,
			options: {
				withBasicToken?: boolean
				withResponseInterceptors?: boolean
			} = {}
		): AxiosInstance => {
			const { withBasicToken = false, withResponseInterceptors = true } =
				options

			const instance = axios.create(config)

			instance.interceptors.request.use(
				(cfg: InternalAxiosRequestConfig<unknown>) =>
					this.requestInterceptor(cfg, withBasicToken)
			)

			if (withResponseInterceptors) {
				instance.interceptors.response.use(
					response => this.responseSuccessInterceptor(response),
					error => this.responseErrorInterceptor(error, name)
				)
			}
			return instance
		}

		Object.values(INSTANCE_CONFIGURATIONS).forEach(
			({ suffix, options }) => {
				this.instances[`${name}${suffix}`] =
					createInstanceWithInterceptors(axiosConfig, options)
			}
		)
	}

	private async requestInterceptor(
		config: InternalAxiosRequestConfig<unknown>,
		withBasicToken = false
	): Promise<InternalAxiosRequestConfig<unknown>> {
		const token = await getToken(withBasicToken ? "basicAccess" : "access")

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`
		}

		console.log(
			`[API Request]: ${config.method?.toUpperCase()} ${config.url}`
		)

		return config
	}

	private responseSuccessInterceptor(response: AxiosResponse): AxiosResponse {
		console.log(
			`[API Response - Success]: ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`
		)

		return response
	}

	private async responseErrorInterceptor(
		error: any,
		instanceName: string
	): Promise<AxiosResponse> {
		console.log(
			`[API Response - Error]: ${
				error.config?.method?.toUpperCase() || "UNKNOWN METHOD"
			} ${error.config?.url || "UNKNOWN URL"} - Status: ${
				error.response?.status || "NO STATUS"
			}`
		)

		if (!this.refreshTokenCallback) {
			return Promise.reject(error)
		}

		const originalConfig = error.config
		const isAccessPath = originalConfig.url === this.accessPath
		const isUnauthorized = error.response?.status === 401
		const refreshToken = await getToken("refresh")
		const hasRefreshToken = !!refreshToken

		if (isAccessPath || !isUnauthorized || !hasRefreshToken) {
			return Promise.reject(error)
		}

		await this.refreshAccessToken()

		return this.getInstance(instanceName).request(originalConfig)
	}

	private async refreshAccessToken(): Promise<void> {
		if (!this.refreshTokenCallback) {
			return Promise.reject(new Error("refreshTokenCallback is missing."))
		}
		const refreshToken = await getToken("refresh")

		if (!refreshToken) {
			removeTokens()
			return Promise.reject(new Error("Refresh token is missing."))
		}

		try {
			const response = await this.refreshTokenCallback(refreshToken)
			const { jwt, refreshToken: rToken } = response.data.results.data

			await setTokens({
				access: jwt,
				refresh: rToken,
			})
		} catch (refreshError) {
			removeTokens()
			if (refreshError instanceof Error) {
				throw new Error(refreshError.message)
			} else {
				throw new Error(String(refreshError))
			}
		}
	}

	getInstance(name: string, options: GetInstanceOptions = {}): AxiosInstance {
		const { type = "default" } = options

		const instanceKey = `${name}${INSTANCE_CONFIGURATIONS[type].suffix}`
		const instance = this.instances[instanceKey]

		if (!instance) {
			throw new Error(`Instance "${instanceKey}" does not exist.`)
		}

		return instance
	}
}

export default AxiosManager
