import { Button, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Redirect, useLocation, useParams } from "react-router-dom";
import Image from "../../../../models/Image";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import { UserViewParams } from "../../../../services/UserService";
import { BuildingViewParams } from "../../../../services/BuildingService";
import { RoomViewParams } from "../../../../services/RoomService";
import ImageService from "../../../../services/ImageService";



const Input = styled('input')({
    display: 'none',
});

const StyledImage = styled('img')({
    width: "fill-available",
    maxHeight: '350px'
});

interface ImageUploadFieldProps {
    image?: Image,
    onUpload?: () => void;
    onDelete?: () => void;
}

export default function ImageUploadField(props: ImageUploadFieldProps) {
    const notify = useNotification();
    const location = useLocation();
    const urlParams = useParams<UserViewParams | BuildingViewParams | RoomViewParams>();
    const [uploadedImage, setUploadedImage] = React.useState<Blob>();


    const handleSubmit = React.useCallback(async (evt: React.FormEvent) => {
        evt.preventDefault();
        if (!uploadedImage) {
            notify("Najpierw załaduj nowy obraz", "warning");
            return;
        }
        try {
            await ImageService.upload(urlParams, uploadedImage);
            props.onUpload && props.onUpload();
            notify("Obraz został zmieniony", 'success',
                () => <Redirect to={location.pathname} /> // rerender the current page
            );

        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [
        uploadedImage,
        props,
        notify,
        location,
        urlParams,
    ]);


    const handleImageUpload = React.useCallback((evt: any) => {
        if (evt.target.files && evt.target.files[0]) {
            const img = evt.target.files[0];
            setUploadedImage(img);
        }
    }, []);


    const handleRemoveImgae = React.useCallback(async () => {
        try {
            await ImageService.remove(urlParams);
            props.onDelete && props.onDelete();
            notify("Przywrócono domyślny obraz, załaduj ponownie aby zobaczyć rezultat.", "success",
                () => <Redirect to={location.pathname} /> // rerender the current page
            );

        } catch (err: any) {
            notify(err.description, "error");
        }
    }, [
        props,
        notify,
        location,
        urlParams,
    ]);


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
                    alt='nowy obraz'
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
        </Grid>
    )
}