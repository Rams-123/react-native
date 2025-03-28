import Progress from "@/ui/progress"
import { AVPlaybackStatus, Audio as AudioModule } from "expo-av"
import React, { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import {
	PauseIcon,
	PlayIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
} from "react-native-heroicons/solid"

interface AudioProps {
	uri: string
}

const Audio = ({ uri }: AudioProps) => {
	const [audio, setAudio] = useState<AudioModule.Sound | null>(null)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)

	const togglePlay = async () => {
		if (isPlaying) {
			await audio?.pauseAsync()
		} else {
			if (audio) {
				await audio.playAsync()
			} else {
				const { sound, status } = await AudioModule.Sound.createAsync(
					{ uri },
					{ progressUpdateIntervalMillis: 1, isMuted },
					onPlaybackStatusUpdate
				)

				if (!status.isLoaded) {
					return
				}

				sound.setIsMutedAsync(isMuted)
				setAudio(sound)
				sound?.playAsync()
			}
		}
		setIsPlaying(!isPlaying)
	}

	const toggleMute = () => {
		audio?.setIsMutedAsync(!isMuted)
		setIsMuted(!isMuted)
	}

	const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
		if (!status.isLoaded) {
			return
		}

		if (status.didJustFinish) {
			await audio?.unloadAsync()
			setAudio(null)
			await audio?.setPositionAsync(0)
		}

		setCurrentTime(status.positionMillis)
		setIsPlaying(status.isPlaying)
	}

	useEffect(() => {
		;(async () => {
			const { sound, status } = await AudioModule.Sound.createAsync(
				{ uri },
				{ progressUpdateIntervalMillis: 1, shouldPlay: true },
				onPlaybackStatusUpdate
			)

			if (!status.isLoaded) {
				return
			}

			sound.stopAsync()
			setDuration(status.durationMillis || 0)
			setAudio(sound)
		})()
	}, [uri])

	useEffect(() => {
		if (audio) {
			return () => {
				audio.unloadAsync()
			}
		}
	}, [audio])

	return (
		<View className="flex-row items-center gap-4 rounded-full bg-neutral-200 p-4">
			<Pressable onPress={togglePlay}>
				{isPlaying ? (
					<PauseIcon size={24} color="black" />
				) : (
					<PlayIcon size={24} color="black" />
				)}
			</Pressable>
			<Text>{`${formatDuration(currentTime)} / ${formatDuration(duration)}`}</Text>
			<Progress
				className="h-1.5 flex-1"
				progressClassName="bg-black"
				value={(currentTime / duration) * 100}
				animationDuration={150}
			/>
			<Pressable onPress={toggleMute}>
				{isMuted ? (
					<SpeakerXMarkIcon size={24} color="black" />
				) : (
					<SpeakerWaveIcon size={24} color="black" />
				)}
			</Pressable>
		</View>
	)
}

export default Audio

const formatDuration = (milliseconds: number) => {
	const minutes = Math.floor(milliseconds / 1000 / 60) // Calculate minutes
	const seconds = Math.floor((milliseconds / 1000) % 60) // Calculate seconds

	// Format seconds and milliseconds for proper display
	const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

	return `${minutes}:${formattedSeconds}`
}
