import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { EstateContext } from "../../Context/EstateContext";
import { useTranslation } from "react-i18next";
import { PhotoContext } from "../../Context/PhotoContext";
import { AuthContext } from "../../Context/AuthContext";

function EstateDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // URL'den emlak ID'sini al
  const { estate, fetchEstate, handleDeleteEstate } = useContext(EstateContext);
  const { estatePhotos, fetchOneEstatePhotos } = useContext(PhotoContext);
  const [selectedImage, setSelectedImage] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // Onay penceresinin açık olup olmadığını kontrol eder

  //authentication
  const { adminValidation } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState();

  const adminOrUser = isAdmin === true || isAdmin === false;
  const noAuth = isAdmin === null;

  useEffect(() => {
    setIsAdmin(adminValidation());
    console.log(adminValidation());
  }, [adminValidation]);

  const handlePhotosClick = () => {
    navigate(`/create-photos/${estate.id}`); // EstateDetail sayfasına yönlendirme
  };

  const handleDeleteClick = () => {
    setOpenDialog(true); // Onay penceresini aç
  };

  const handleDelete = async () => {
    try {
      await handleDeleteEstate(id);
      navigate(-1); // Bir önceki sayfaya yönlendir
    } catch (error) {
      console.error(t("errorDeletingEstate"), error); // Hata mesajı
    } finally {
      setOpenDialog(false); // Onay penceresini kapat
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Onay penceresini kapat
  };

  useEffect(() => {
    // Sayfa yüklendiğinde emlak detaylarını çek
    fetchOneEstatePhotos(id);
    fetchEstate(id);
  }, [id]);

  useEffect(() => {
    // Varsayılan olarak ilk fotoğrafı seç
    if (Array.isArray(estatePhotos) && estatePhotos.length > 0) {
      setSelectedImage(estatePhotos[0].base64Image);
    } else {
      setSelectedImage("https://via.placeholder.com/500x400");
    }
  }, [estatePhotos]);

  if (!Array.isArray(estatePhotos)) {
    return (
      <Typography variant="body2" color="text.secondary">
        No photos available
      </Typography>
    );
  }
  if (!estate) {
    return <div>Loading...</div>; // Veriler yüklenirken bir yükleme ekranı göster
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 800,
          margin: "0 auto",
          marginTop: 5,
          display: "flex",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: 500 }}>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              sx={{ height: 400, objectFit: "cover" }} // Resim yüksekliğini ve fit ayarını kontrol et
              image={selectedImage || "https://via.placeholder.com/500x400"}
              alt="Selected"
            />

            {adminOrUser && (
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  border: "1px solid green",
                  borderRadius: "20px",
                  padding: "2px",
                  bgcolor: "green",
                  boxShadow: 1,
                }}
              >
                <Tooltip title="Fotoğraf Ekle">
                  <IconButton
                    color="success"
                    size="small"
                    onClick={handlePhotosClick}
                    sx={{
                      backgroundColor: "lightblue",
                      "&:hover": { backgroundColor: "lightgreen" },
                    }}
                  >
                    <AddBoxIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              marginTop: 1,
              paddingBottom: 1,
              whiteSpace: "nowrap",
            }}
          >
            {estatePhotos.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                sx={{
                  width: 100,
                  height: 100,
                  marginRight: 1,
                  cursor: "pointer",
                  border:
                    selectedImage === image.base64Image
                      ? "2px solid blue"
                      : "none",
                }}
                image={image.base64Image}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImage(image.base64Image)}
              />
            ))}
          </Box>
        </Box>

        <CardContent
          sx={{
            flex: 1,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // İçeriğin taşmasını önlemek için
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", overflowWrap: "break-word" }} // Taşmayı önlemek için
          >
            {estate.title}
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: "bold" }}
            >
              {t("price")}:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {estate.priceAmount} {estate.priceCurrencyCode}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: "bold" }}
            >
              {t("status")}:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {estate.statusName}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: "bold" }}
            >
              {t("type")}:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {estate.typeName}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: "bold" }}
            >
              {t("estateStartDate")}:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(estate.startDate).toLocaleDateString()}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: "bold" }}
            >
              {t("estateEndDate")}:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(estate.endDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: "bold" }}
            >
              {t("city")}:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {estate.city}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: "bold" }}
            >
              {t("district")}:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {estate.district}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
            }}
          >
            {adminOrUser && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ flex: 1, marginRight: 1 }}
                  onClick={() => navigate(`/edit-estate/${id}`)}
                >
                  {t("update")}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ flex: 1, marginLeft: 1 }}
                  onClick={handleDeleteClick}
                >
                  {t("delete")}
                </Button>{" "}
              </>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("confirmDelete")}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            {t("areYouSureDelete")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("cancel")}</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EstateDetail;
