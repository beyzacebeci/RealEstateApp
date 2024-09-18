import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { PhotoContext } from "../../Context/PhotoContext";
import EstatePhotosList from "./EstatePhotosList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function CreatePhotos() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const { handleAddPhoto, fetchOneEstatePhotos } = useContext(PhotoContext);

  const [formData, setFormData] = useState({
    description: "",
    estateId: id,
    fileExtension: "",
    base64Image: "",
  });

  const [base64Image, setBase64Image] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchOneEstatePhotos(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !base64Image) {
      setSnackbarMessage(t("RequiredFileField"));
      setSnackbarOpen(true);
      return;
    }

    handleAddPhoto(formData).then(() => {
      fetchOneEstatePhotos(id); // Fotoğrafları güncelledikten sonra tekrar fetch yaparak güncellenmiş haliyle gösterebilirsiniz.
      setFormData({
        description: "",
        estateId: id,
        fileExtension: "",
        base64Image: "",
      });
      setBase64Image("");
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64data = await convertedBase64(file);
      setBase64Image(base64data);
      setFormData({
        ...formData,
        base64Image: base64data,
        fileExtension: file.type.split("/")[1],
      });
    } else {
      console.error("No file selected.");
    }
  };

  const convertedBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file instanceof Blob) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error("Provided parameter is not a Blob or File."));
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 500,
          margin: "0 auto",
          marginTop: 5,
          display: "flex",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          padding: 2,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ArrowBackIcon
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </Box>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={(e) => uploadImage(e)}></input>

            <TextField
              label={t("description")}
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary">
              {t("save")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Bir estate'in sahip olduğu bütün fotolar */}
      <EstatePhotosList />
    </div>
  );
}

export default CreatePhotos;
