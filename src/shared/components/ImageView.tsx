import { Box, SxProps } from "@mui/system";
import Image from "../../models/Image";
import ImageService from "../../services/ImageService";


interface ImageViewProps {
    image: Image,
    title: string,
    sx?: SxProps
}


export default function ImageView({
    image, title, sx
}: ImageViewProps) {
    return (
        <Box component='img'
            src={ImageService.getLink(image)}
            alt={title}
            loading="lazy"
            sx={{
                display: 'inline-block',
                width: "100%",
                borderRadius: "10px",
                ...sx
            }}
        />
    );
}