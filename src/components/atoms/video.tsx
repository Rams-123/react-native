import { ActivityIndicator } from "@/ui/activity-indicator"
import Progress from "@/ui/progress"
import { useEvent, useEventListener } from "expo"
import { VideoView, VideoViewProps, useVideoPlayer } from "expo-video"
import React, { forwardRef, useEffect, useImperativeHandle } from "react"
import { Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { PauseCircleIcon } from "react-native-heroicons/solid"

interface VideoProps {
	src: string
	loop?: boolean
	autoPlay?: boolean
	muted?: boolean
	showProgress?: boolean
	contentFit?: "cover" | "contain"
	videoProps?: VideoViewProps
	videoStyle?: ViewStyle
}

const Video = forwardRef(
	(
		{
			src,
			loop = false,
			autoPlay = false,
			muted = false,
			showProgress = true,
			contentFit = "cover",
			videoProps,
			videoStyle = {},
		}: VideoProps,
		ref
	) => {
		const player = useVideoPlayer(src, player => {
			if (autoPlay) {
				player.play()
			}
		})

		const handlePlay = () => {
			if (showProgress) {
				player.timeUpdateEventInterval = 0.1
			}
			player.play()
		}
		const handlePause = () => {
			player.timeUpdateEventInterval = 0
			player.pause()
		}
		const handleStop = () => {
			player.currentTime = 0
			player.timeUpdateEventInterval = 0
			player.pause()
		}
		const handleToggleMute = () => {
			player.muted = !player.muted
			return !player.muted
		}
		const handleTogglePlay = () => {
			if (player.playing) {
				handlePause()
			} else {
				handlePlay()
			}
		}

		// Expose player control methods to parent component
		useImperativeHandle(ref, () => ({
			play: handlePlay,
			pause: handlePause,
			stop: handleStop,
			togglePlay: handleTogglePlay,
			toggleMute: handleToggleMute,
		}))

		const { isPlaying } = useEvent(player, "playingChange", {
			isPlaying: player.playing,
		})
		const { currentTime } = useEvent(player, "timeUpdate", {
			currentTime: player.currentTime ?? 0,
			currentLiveTimestamp: player.currentLiveTimestamp ?? null,
			currentOffsetFromLive: player.currentOffsetFromLive ?? 0,
			bufferedPosition: player.bufferedPosition ?? 0,
		})
		const { status } = useEvent(player, "statusChange", {
			status: player.status,
		})
		useEventListener(player, "timeUpdate", ({ currentTime }) => {
			if (currentTime >= player.duration && loop) {
				player.replay()
			}
		})

		useEffect(() => {
			player.muted = muted
		}, [player, muted])

		return (
			<View className="h-full w-full flex-1">
				<VideoView
					style={[
						StyleSheet.absoluteFill,
						{
							borderRadius: 12,
						},
						videoStyle,
					]}
					contentFit={contentFit}
					player={player}
					nativeControls={false}
					{...videoProps}
				/>
				<Pressable
					onPress={handleTogglePlay}
					className="flex-1 items-center justify-center"
				>
					{status === "loading" && <ActivityIndicator />}
					{!isPlaying && status === "readyToPlay" && (
						<PauseCircleIcon
							size={70}
							color="rgba(255, 255, 255, 0.6)"
						/>
					)}
				</Pressable>
				{showProgress && (
					<Progress
						className="h-[3px]"
						value={(currentTime / (player.duration || 1)) * 100}
						progressClassName="bg-red-600"
					/>
				)}
			</View>
		)
	}
)

export default Video
