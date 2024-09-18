import React, { useContext, useEffect } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import "./Dashboard.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import villa from "./villa.png";
import total from "./total.png";
import { EstateContext } from "../../Context/EstateContext";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import { Opacity } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"; // Aşağı ok ikonu

function Dashboard() {
  const {
    estateCount,
    estateTypesCount,
    fetchEstateTypeCounts,
    fetchEstateCount,
  } = useContext(EstateContext);
  const { t } = useTranslation();

  useEffect(() => {
    // Sayfa yüklendiğinde emlak detaylarını çek
    fetchEstateCount();
    fetchEstateTypeCounts();
  }, []);

  return (
    <div>
      <Box
        className="mainCardContainer"
        display="flex"
        alignItems="center" // Bileşenleri yatayda ortalar
        justifyContent="center" // Bileşenleri dikeyde ortalar
        padding={10}
      >
        {estateTypesCount
          .filter((estateType) => estateType.count > 0)
          .map((estateType) => (
            <Box
              style={{ background: "#9fb6cd", opacity: 0.9 }}
              className="cardContainer"
              key={estateType.estateTypeName}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center" // İçeriği dikeyde ortalar
              >
                <img src={villa} height="50px" />
                <div className="caredName">{estateType.estateTypeName}</div>
                <div className="cardValue"> {estateType.count}</div>
              </Box>
            </Box>
          ))}

        <Box
          style={{ background: "#9fb6cd", opacity: 0.8 }}
          className="cardContainer"
        >
          <div>
            <img src={total} height="50px" />
            <div className="caredName">{t("totalEstate")}</div>
            <div className="cardValue">{estateCount.totalEstatesCount}</div>
          </div>
        </Box>
      </Box>

      <IconButton onClick={() => {}} size="large" href="/map">
        <LocationOnIcon style={{ fontSize: 40 }} />
        <Typography variant="h6" style={{ marginLeft: 8, color: "black" }}>
          {t("gotoEstateMap")}
        </Typography>
      </IconButton>

      <IconButton
        onClick={() =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          })
        }
        size="large"
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "grey",
          color: "white",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        <ArrowDownwardIcon style={{ fontSize: 30 }} />
      </IconButton>
    </div>
  );
}

export default Dashboard;
