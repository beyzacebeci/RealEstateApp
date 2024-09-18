import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EstateContext } from "../../Context/EstateContext";
import { EstateStatusContext } from "../../Context/EstateStatusContext";
import { EstateTypeContext } from "../../Context/EstateTypeContext";
import { PriceContext } from "../../Context/PriceContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Typography,
  Box,
} from "@mui/material";

import { CurrencyContext } from "../../Context/CurrencyContext";

function EditEstateDetail() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();

  const { estate, fetchEstate, handleEditEstate } = useContext(EstateContext);
  const { estateStatuses, fetchEstateStatuses } =
    useContext(EstateStatusContext);
  const { estateTypes, fetchEstateTypes } = useContext(EstateTypeContext);
  const { prices, fetchPrices } = useContext(PriceContext);
  const { currencies, fetchCurrencies } = useContext(CurrencyContext);

  const [formData, setFormData] = useState({
    title: "",
    estatePriceAmount: "",
    currencyCode: "",
    estateTypeId: "",
    estateStatusId: "",
    startDate: "",
    endDate: "",
    district: "",
    city: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchEstate(id);
    fetchEstateStatuses();
    fetchEstateTypes();
    fetchPrices();
    fetchCurrencies();
  }, [id]);

  useEffect(() => {
    if (estate) {
      setFormData({
        title: estate.title || "",
        estatePriceAmount: estate.priceAmount || "",
        city: estate.city || "",
        district: estate.district || "",
        currencyCode: estate.priceCurrencyCode || "",
        estateTypeId: estate.estateTypeId || "",
        estateStatusId: estate.estateStatusId || "",
        estatePriceId: estate.estatePriceId || "",
        startDate: estate.startDate ? estate.startDate.split("T")[0] : "",
        endDate: estate.endDate ? estate.endDate.split("T")[0] : "",
      });
    }
  }, [estate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      startDate: formData.startDate ? `${formData.startDate}T00:00:00` : "",
      endDate: formData.endDate ? `${formData.endDate}T00:00:00` : "",
      id,
    };

    handleEditEstate(formattedData).then(() => {
      setSnackbarOpen(true);
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Card
        variant="outlined"
        sx={{ maxWidth: 600, margin: "auto", mt: 3, mb: 5 }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <ArrowBackIcon
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
            </Box>

            <TextField
              label={t("title")}
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <TextField
                label={t("price")}
                name="estatePriceAmount"
                value={formData.estatePriceAmount}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                inputProps={{
                  min: 0,
                  step: "any",
                }}
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>{t("currencyCode")}</InputLabel>
                <Select
                  name="currencyCode"
                  value={formData.currencyCode || ""}
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
            </Box>

            <FormControl fullWidth margin="normal">
              <InputLabel>{t("status")}</InputLabel>
              <Select
                name="estateStatusId"
                value={formData.estateStatusId}
                onChange={handleChange}
                label={t("status")}
              >
                {estateStatuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>{t("type")}</InputLabel>
              <Select
                name="estateTypeId"
                value={formData.estateTypeId}
                onChange={handleChange}
                label={t("type")}
              >
                {estateTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <TextField
                label={t("estateStartDate")}
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label={t("estateEndDate")}
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />{" "}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <TextField
                label={t("city")}
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label={t("district")}
                name="district"
                type="text"
                value={formData.district}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />{" "}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                {t("update")}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {t("updateSuccessMessage")}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EditEstateDetail;
