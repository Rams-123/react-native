import { getAcronym } from "@/lib/utils"
import useAppStore from "@/store"
import Avatar, { AvatarFallback, AvatarImage } from "@/ui/avatar"

interface UserAvatarProps {
	size: number
	source?: string
	alt?: string
	squared?: boolean
	borderLess?: boolean
	containerClassName?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({
	size,
	source = null,
	alt = null,
	squared = false,
	borderLess = false,
	containerClassName = "",
}) => {
	const avatarSource = useAppStore(
		store => source ?? store.user?.profileImage
	)
	const avatarAlt = useAppStore(
		store => alt ?? store.user?.fullname ?? "Unknown"
	) as string

	return (
		<Avatar
			style={{ width: size, height: size }}
			{...{
				squared,
				borderLess,
				className: containerClassName,
			}}
		>
			<AvatarImage source={avatarSource} />
			<AvatarFallback>{getAcronym(avatarAlt)}</AvatarFallback>
		</Avatar>
	)
}

export default UserAvatar
