import { blurhash } from "@/constants/image"
import { Image as ExpoImage, ImageProps as ExpoImageProps } from "expo-image"

interface ImageProps extends ExpoImageProps {
	grayScale?: boolean | number
}

const Image = ({
	source,
	alt,
	contentFit = "cover",
	style = {},
	grayScale = false,
}: ImageProps) => {
	return (
		<>
			<ExpoImage
				source={source}
				alt={alt}
				style={[
					{
						flex: 1,
						width: "100%",
						borderRadius: 12,
					},
					grayScale ? { tintColor: "gray" } : {},
					style,
				]}
				contentFit={contentFit}
				placeholder={{
					blurhash,
				}}
				transition={1000}
			/>
			{grayScale && (
				<ExpoImage
					source={source}
					alt={alt}
					style={[
						{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							opacity:
								typeof grayScale === "boolean"
									? 0.2
									: grayScale,
						},
						style,
					]}
					contentFit={contentFit}
					placeholder={{
						blurhash,
					}}
					transition={1000}
				/>
			)}
		</>
	)
}

export default Image
