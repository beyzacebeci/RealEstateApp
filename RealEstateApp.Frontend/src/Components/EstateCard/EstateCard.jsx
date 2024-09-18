import React, { useEffect, useState } from "react";
import "./EstateCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";

export default function EstateCard({ estate }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDetailClick = () => {
    navigate(`/estate-detail/${estate.id}`); // EstateDetail sayfasına yönlendirme
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR");
  };

  const formatNumber = (number) => {
    return number.toLocaleString("tr-TR");
  };

  return (
    <Card sx={{ maxWidth: 250, marginBottom: 4 }}>
      <CardActionArea>
        <div style={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="130"
            image={estate.estateFirstImage || "https://via.placeholder.com/250"} // Eğer fotoğraf varsa kullan, yoksa varsayılan görseli göster
          />
          <Typography
            variant="body2"
            color="white"
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#000000a0",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "0.75rem",
            }}
          >
            {formatNumber(estate.priceAmount)} {estate.priceCurrencyCode}
          </Typography>
        </div>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: "1rem" }}
          >
            {estate.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ marginBottom: 1, fontSize: "0.75rem" }}
          >
            {formatDate(estate.startDate)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto", borderRadius: 15, fontSize: "0.75rem" }}
          onClick={handleDetailClick}
        >
          {t("gotoDetail")}
        </Button>
        <Typography
          size="small"
          color="primary"
          style={{ flex: 1, textAlign: "right", fontSize: "0.75rem" }}
        >
          {estate.statusName} {estate.typeName}
        </Typography>
      </CardActions>
    </Card>
  );
}
