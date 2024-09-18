import React from "react";
import "./Home.css";
import Dashboard from "../Dashboard/Dashboard";
import Navbar from "../../Components/Navbar/Navbar";
import EstateFilterListPage from "../EstateFilterListPage/EstateFilterListPage";
import { Box } from "@mui/material";
import backgroundImage from "./background.jpg"; // Arka plan resmi için

function Home() {
  return (
    <>
      <Box
        className="dashboard"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", // Resmi kaplama şeklinde yerleştirir
          backgroundPosition: "center", // Resmi ortalar
          backgroundRepeat: "no-repeat", // Resmin tekrar etmesini engeller
        }}
      >
        <Dashboard />
      </Box>

      <Box
        className="all-estates"
        sx={
          {
            // backgroundColor: "#BFBFBF",
          }
        }
      >
        <EstateFilterListPage />
      </Box>
    </>
  );
}

export default Home;
