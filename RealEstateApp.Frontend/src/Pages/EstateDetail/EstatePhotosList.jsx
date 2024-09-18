import React, { useContext, useEffect, useState } from "react";
import { PhotoContext } from "../../Context/PhotoContext";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

function EstatePhotosList() {
  const { estatePhotos, fetchOneEstatePhotos, handleDeletePhoto } =
    useContext(PhotoContext);
  const { id } = useParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { t } = useTranslation();

  useEffect(() => {
    fetchOneEstatePhotos(id);
  }, [id]);

  if (!Array.isArray(estatePhotos)) {
    return (
      <Typography variant="body2" color="text.secondary">
        No photos available
      </Typography>
    );
  }

  const handleDeleteClick = (photoId) => {
    handleDeletePhoto(photoId)
      .then(() => {
        setSnackbarMessage(t("Photodeletedsuccessfully"));
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        fetchOneEstatePhotos(id);
      })
      .catch((error) => {
        setSnackbarMessage(t("Erroroccurredwhiledeletingphoto"));
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          marginTop: 5,
        }}
      >
        {estatePhotos.map((photo) => {
          const { id, description, base64Image } = photo;

          return (
            <div key={id}>
              <Card sx={{ maxWidth: 250, marginBottom: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <CloseIcon
                    sx={{
                      cursor: "pointer",
                      color: "inherit", // Varsayılan renk
                      "&:hover": {
                        color: "red", // Üzerine gelindiğinde renk değişimi
                      },
                    }}
                    onClick={() => handleDeleteClick(id)}
                  />
                </Box>
                <CardMedia
                  component="img"
                  alt={description}
                  image={base64Image}
                  sx={{
                    objectFit: "cover",
                    height: 150, // Kartın yüksekliği (isteğe bağlı olarak değiştirilebilir)
                  }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default EstatePhotosList;
