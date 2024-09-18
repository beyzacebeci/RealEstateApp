import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EstateStatusContext } from "../../Context/EstateStatusContext";
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

function EstateStatus() {
  const { t } = useTranslation();
  const {
    estateStatuses,
    estateStatus,
    fetchEstateStatuses,
    fetchEstateStatus,
    handleAddEstateStatus,
    handleEditEstateStatus,
    handleDeleteEstateStatus,
  } = useContext(EstateStatusContext);

  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEstateStatusId, setSelectedEstateStatusId] = useState(null);

  const [formData, setFormData] = useState({
    status: "",
  });

  useEffect(() => {
    fetchEstateStatuses();
    if (selectedEstateStatusId) {
      fetchEstateStatus(selectedEstateStatusId);
    }
  }, [selectedEstateStatusId]);

  useEffect(() => {
    fetchEstateStatuses();
    fetchEstateStatus(estateStatus?.id);
  }, [estateStatus?.id]);

  useEffect(() => {
    if (estateStatus) {
      setFormData({
        status: estateStatus.status || "",
      });
    }
  }, [estateStatus]);

  useEffect(() => {
    if (selectedEstateStatusId) {
      fetchEstateStatus(selectedEstateStatusId);
    }
  }, [selectedEstateStatusId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddEstateStatus(formData);
    setIsAddMode(false);
    setFormData({ status: "" }); // Formu sıfırla
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleEditEstateStatus({
      id: selectedEstateStatusId, // Bu satırda `selectedEstateTypeId` bir id olarak kullanılmalı
      ...formData,
    });
    setIsEditMode(false);
    setSelectedEstateStatusId(null); // Bu satırda `setSelectedEstateTypeId` fonksiyonunu kullanmalısınız
    setFormData({ status: "" }); // Formu sıfırla
  };

  const handleEditClick = (id) => {
    setSelectedEstateStatusId(id);
    setIsEditMode(true);
  };

  const handleDeleteClick = (id) => {
    handleDeleteEstateStatus(id);
  };

  const handleAddModeClick = () => {
    setFormData({ status: "" }); // Formu sıfırla
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
                {t("status")}
              </Typography>
              <IconButton onClick={handleAddModeClick} color="success">
                <AddBoxIcon />
              </IconButton>
            </Box>

            {estateStatuses.map((estateStatus) => (
              <React.Fragment key={estateStatus.id}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <Typography variant="body2">
                      {estateStatus.status}
                    </Typography>
                  </Box>

                  <Box>
                    <Button
                      onClick={() => {
                        handleEditClick(estateStatus.id);
                      }}
                    >
                      {t("update")}
                    </Button>

                    <Button
                      color="error"
                      onClick={() => {
                        handleDeleteClick(estateStatus.id);
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
              label={t("status")}
              name="status"
              value={formData.status}
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
              label={t("status")}
              name="status"
              value={formData.status}
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

export default EstateStatus;
