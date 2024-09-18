import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyContext } from "../../Context/CurrencyContext";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";

function Currency() {
  const { t } = useTranslation();
  const {
    currencies,
    currency,
    fetchCurrencies,
    fetchCurrency,
    handleAddCurrency,
    handleEditCurrency,
    handleDeleteCurrency,
  } = useContext(CurrencyContext);

  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState(null);

  const [formData, setFormData] = useState({
    currencyName: "",
    code: "",
  });
  useEffect(() => {
    fetchCurrencies();
    if (selectedCurrencyId) {
      fetchCurrency(selectedCurrencyId);
    }
  }, [selectedCurrencyId]);

  useEffect(() => {
    fetchCurrencies();
    fetchCurrency(currency?.id);
  }, [currency?.id]);

  useEffect(() => {
    if (currency) {
      setFormData({
        code: currency.code || "",
        currencyName: currency.currencyName || "",
      });
    }
  }, [currency]);

  useEffect(() => {
    if (selectedCurrencyId) {
      fetchCurrency(selectedCurrencyId);
    }
  }, [selectedCurrencyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCurrency(formData);
    setIsAddMode(false);
    setFormData({ currencyName: "", code: "" }); // Formu sıfırla
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleEditCurrency({
      id: selectedCurrencyId,
      ...formData,
    });
    setIsEditMode(false);
    setSelectedCurrencyId(null);
    setFormData({ currencyName: "", code: "" }); // Formu sıfırla
  };

  const handleEditClick = (id) => {
    setSelectedCurrencyId(id);
    setIsEditMode(true);
  };

  const handleDeleteClick = (id) => {
    handleDeleteCurrency(id);
  };

  const handleAddModeClick = () => {
    setFormData({ currencyName: "", code: "" }); // Formu sıfırla
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
                {t("currencyCode")}
              </Typography>
              <IconButton onClick={handleAddModeClick} color="success">
                <AddBoxIcon />
              </IconButton>
            </Box>

            {currencies.map((currency) => (
              <React.Fragment key={currency.id}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <Typography variant="subtitle1" component="div">
                      {currency.currencyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("Code")}: {currency.code}
                    </Typography>
                  </Box>

                  <Box>
                    <Button
                      onClick={() => {
                        handleEditClick(currency.id);
                      }}
                    >
                      {t("update")}
                    </Button>

                    <Button
                      color="error"
                      onClick={() => {
                        handleDeleteClick(currency.id);
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
              label={t("currencyName")}
              name="currencyName"
              value={formData.currencyName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label={t("code")}
              name="code"
              value={formData.code}
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
              label={t("currencyName")}
              name="currencyName"
              value={formData.currencyName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>{t("currencyCode")}</InputLabel>
              <Select
                name="code"
                value={formData.code || ""} // Varsayılan olarak boş bir string kullanıyoruz
                onChange={handleChange}
                label={t("currencyCode")}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.id} value={currency.code}>
                    {currency.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
export default Currency;
