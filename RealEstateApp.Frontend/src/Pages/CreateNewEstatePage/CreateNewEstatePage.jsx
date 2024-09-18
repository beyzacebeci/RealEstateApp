import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EstateContext } from "../../Context/EstateContext";
import { EstateTypeContext } from "../../Context/EstateTypeContext";
import { EstateStatusContext } from "../../Context/EstateStatusContext";
import { CurrencyContext } from "../../Context/CurrencyContext";
import { AuthContext } from "../../Context/AuthContext";

function CreateNewEstatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { getUserId } = useContext(AuthContext);
  const { handleAddEstate } = useContext(EstateContext);
  const { estateStatuses, fetchEstateStatuses } =
    useContext(EstateStatusContext);
  const { estateTypes, fetchEstateTypes } = useContext(EstateTypeContext);
  const { currencies, fetchCurrencies } = useContext(CurrencyContext);

  const [formData, setFormData] = useState({
    userId: getUserId(),
    title: "",
    estatePriceAmount: "",
    currencyId: "",
    estateTypeId: "",
    estateStatusId: "",
    startDate: "",
    endDate: "",
    district: "",
    city: "",
    images: [], // Eklenen fotoğraflar için state
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getUserId();
    fetchEstateStatuses();
    fetchEstateTypes();
    fetchCurrencies();
    console.log(getUserId());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddEstate(formData);
    setOpenSnackbar(true); // Snackbar'ı aç
    setFormData({
      userId: getUserId(),
      title: "",
      district: "",
      city: "",
      estatePriceAmount: "",
      currencyId: "",
      estateTypeId: "",
      estateStatusId: "",
      startDate: "",
      endDate: "",
    }); // Formu sıfırla
    // Snackbar gösterildikten sonra All Estates sayfasına yönlendir

    setTimeout(() => {
      navigate("/user-estate-list-page");
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Snackbar'ı kapat
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
              required
              label={t("title")}
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <TextField
                required
                label={t("price")}
                name="estatePriceAmount"
                value={formData.estatePriceAmount}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                inputProps={{
                  min: 0, // Negatif değerleri engeller
                  step: "any", // Ondalık sayılara izin verir
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>{t("currencyCode")}</InputLabel>
                <Select
                  required
                  name="currencyId"
                  value={formData.currencyId}
                  onChange={handleChange}
                  label={t("currencyCode")} // InputLabel'ı Select ile ilişkilendirir
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.id} value={currency.id}>
                      {currency.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <FormControl fullWidth margin="normal">
              <InputLabel>{t("type")}</InputLabel>
              <Select
                required
                name="estateTypeId"
                value={formData.estateTypeId}
                onChange={handleChange}
                label={t("type")} // InputLabel'ı Select ile ilişkilendirir
              >
                {estateTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>{t("status")}</InputLabel>
              <Select
                required
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

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <TextField
                required
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
                required
                label={t("estateEndDate")}
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <TextField
                required
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
                required
                label={t("district")}
                name="district"
                type="text"
                value={formData.district}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Box>

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
        </CardContent>
      </Card>

      {/* Fotograf Yukleme Alani  */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {t("Operation successful!")}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreateNewEstatePage;
