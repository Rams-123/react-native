import { tailwindToHex } from "@/lib/tailwind"
import { TFileExt } from "@/types/file"
import { FontAwesome5 } from "@expo/vector-icons"

const FileIcon = ({
	ext,
	size = 30,
	color = "text-slate-900 dark:text-slate-200",
}: {
	ext: TFileExt
	size?: number
	color?: string
}) => (
	<FontAwesome5
		name={getIconName(ext)}
		size={size}
		color={tailwindToHex(color)}
	/>
)

export default FileIcon

const getIconName = (fileType: TFileExt) => {
	switch (fileType) {
		case "zip":
		case "rar":
		case "tar":
		case "gz":
		case "bz2":
		case "7z":
		case "exe":
		case "dmg":
		case "iso":
			return "file-archive"
		case "mp3":
		case "wav":
		case "flac":
		case "aac":
		case "ogg":
			return "file-audio"
		case "js":
		case "ts":
		case "jsx":
		case "tsx":
		case "html":
		case "css":
		case "json":
		case "xml":
		case "php":
		case "py":
		case "rb":
			return "file-code"
		case "csv":
			return "file-csv"
		case "xls":
		case "xlsx":
			return "file-excel"
		case "jpg":
		case "jpeg":
		case "png":
		case "gif":
		case "bmp":
		case "svg":
		case "tiff":
		case "ico":
			return "file-image"
		case "pdf":
			return "file-pdf"
		case "ppt":
		case "pptx":
			return "file-powerpoint"
		case "txt":
		case "rtf":
		case "md":
			return "file-alt"
		case "mp4":
		case "avi":
		case "mkv":
		case "mov":
		case "wmv":
		case "flv":
			return "file-video"
		case "doc":
		case "docx":
		case "odt":
			return "file-word"
		default:
			return "file"
	}
}
