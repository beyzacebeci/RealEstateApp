import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EstateTypeContext } from "../../Context/EstateTypeContext";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";

function EstateType() {
  const { t } = useTranslation();
  const {
    estateTypes,
    estateType,
    fetchEstateTypes,
    fetchEstateType,
    handleAddEstateType,
    handleEditEstateType,
    handleDeleteEstateType,
  } = useContext(EstateTypeContext);

  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEstateTypeId, setSelectedEstateTypeId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    fetchEstateTypes();
    if (selectedEstateTypeId) {
      fetchEstateType(selectedEstateTypeId);
    }
  }, [selectedEstateTypeId]);

  useEffect(() => {
    fetchEstateTypes();
    fetchEstateType(estateType?.id);
  }, [estateType?.id]);

  useEffect(() => {
    if (estateType) {
      setFormData({
        name: estateType.name || "",
      });
    }
  }, [estateType]);

  useEffect(() => {
    if (selectedEstateTypeId) {
      fetchEstateType(selectedEstateTypeId);
    }
  }, [selectedEstateTypeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddEstateType(formData);
    setIsAddMode(false);
    setFormData({ name: "" }); // Formu sıfırla
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleEditEstateType({
      id: selectedEstateTypeId, // Bu satırda `selectedEstateTypeId` bir id olarak kullanılmalı
      ...formData,
    });
    setIsEditMode(false);
    setSelectedEstateTypeId(null); // Bu satırda `setSelectedEstateTypeId` fonksiyonunu kullanmalısınız
    setFormData({ name: "" }); // Formu sıfırla
  };

  const handleEditClick = (id) => {
    setSelectedEstateTypeId(id);
    setIsEditMode(true);
  };

  const handleDeleteClick = (id) => {
    handleDeleteEstateType(id);
  };

  const handleAddModeClick = () => {
    setFormData({ name: "" }); // Formu sıfırla
    setIsAddMode(true);
  };

  const cardStyle = {
    maxWidth: 400,
    height: 400,
    width: 350,
    padding: 3,
  };

  return (
    <>
      {!isAddMode && !isEditMode && (
        <Card sx={cardStyle}>
          <CardContent
            sx={{
              maxHeight: 400,
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                border: "1px solid grey",
                borderRadius: "8px",
                padding: "4px",
                marginBottom: "10px",
              }}
            >
              <Typography variant="h6" component="div" gutterBottom>
                {t("type")}
              </Typography>
              <IconButton onClick={handleAddModeClick} color="success">
                <AddBoxIcon />
              </IconButton>
            </Box>

            {estateTypes.map((estateType) => (
              <React.Fragment key={estateType.id}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <Typography variant="body2">{estateType.name}</Typography>
                  </Box>

                  <Box>
                    <Button
                      onClick={() => {
                        handleEditClick(estateType.id);
                      }}
                    >
                      {t("update")}
                    </Button>

                    <Button
                      color="error"
                      onClick={() => {
                        handleDeleteClick(estateType.id);
                      }}
                    >
                      {t("delete")}
                    </Button>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
              </React.Fragment>
            ))}
          </CardContent>
        </Card>
      )}

      {isAddMode && (
        <Card sx={cardStyle}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <ArrowBackIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setIsAddMode(false)}
              />
            </Box>
            <TextField
              required
              label={t("type")}
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                {t("save")}
              </Button>
            </Box>
          </form>
        </Card>
      )}

      {isEditMode && (
        <Card sx={cardStyle}>
          <form onSubmit={handleEditSubmit}>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <ArrowBackIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setIsEditMode(false)}
              />
            </Box>
            <TextField
              required
              label={t("type")}
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                {t("update")}
              </Button>
            </Box>
          </form>
        </Card>
      )}
    </>
  );
}

export default EstateType;
