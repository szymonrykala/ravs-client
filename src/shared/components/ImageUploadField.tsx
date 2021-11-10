import { PhotoCamera } from "@mui/icons-material";
import { Stack, Button, IconButton, Grid, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import React from "react";
import useNotification from "../../contexts/NotificationContext/useNotification";
import Image from "../../models/Image";
import ImageService from "../../services/ImageService";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { APIResponse } from "../../services/interfaces";

const Input = styled('input')({
    display: 'none',
});

const StyledImage = styled('img')({
    width: "fill-available"
});

interface ImageUploadFieldProps {
    image?: Image,
    onUpload: (image: Blob) => Promise<void>;
    onDelete: (image: Image) => Promise<void>;
}

export default function ImageUploadField(props: ImageUploadFieldProps) {
    const notify = useNotification();
    const [uploadedImage, setUploadedImage] = React.useState<Blob>();

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        if (!uploadedImage) {
            notify("Najpierw załaduj nowy obraz", "warning");
            return;
        }
        await props.onUpload(uploadedImage);
    }

    const handleImageUpload = (evt: any) => {
        if (evt.target.files && evt.target.files[0]) {
            const img = evt.target.files[0];
            setUploadedImage(img);
        }
    }

    const handleRemoveImgae = async () => {
        try {
            props.image && await props.onDelete(props.image);
            notify("Obraz usunięty, załaduj ponownie aby zobaczyć rezultat.", "success");
        } catch (err: any) {
            notify(err.description, "error");
        }
    }

    return (
        <Grid container component="form"
            onSubmit={handleSubmit}
            direction="row"
            alignItems="stretch"
            spacing={2}
        >
            <Grid item xs={12} sm={9}>
                <StyledImage
                    src={uploadedImage ? URL.createObjectURL(uploadedImage) : ImageService.getLink(props.image)}
                    alt=''
                    sx={{ borderRadius: (theme) => theme.shape.borderRadius }}
                />
            </Grid>
            <Grid item xs={12} sm={3} sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <label htmlFor="upload-obrazu">
                    <Input
                        accept="*.(jpg|png)"
                        id="upload-obrazu"
                        type="file"
                        onChange={handleImageUpload}
                    />
                    <Button
                        color="primary"
                        variant="outlined"
                        component="span">
                        Wybierz zdjęcie
                    </Button>
                </label>

                <Button color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleRemoveImgae}
                >
                    Usuń
                </Button>

                <Button
                    type="submit"
                    color="success"
                    startIcon={<SaveIcon />}
                >
                    Zapisz
                </Button>
            </Grid>
            {/* </label> */}
        </Grid>
    )
}