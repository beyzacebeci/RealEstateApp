import React, { useState, useEffect, useContext } from "react";
import "./MapPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EstateContext } from "../../Context/EstateContext";
import { Box } from "@mui/material";

// Şehir ve ilçe adını alıp koordinatları döndüren fonksiyon
async function getCoordinates(city, district) {
  const apiKey = "50aef3fd98fd4703924604ff667de220"; // OpenCage API anahtarınızı buraya ekleyin
  const query = `${district}, ${city}`; // İlçe ve şehir bilgilerini birleştir
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      query
    )}&key=${apiKey}`
  );
  const data = await response.json();
  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry;
    return { lat, lon: lng };
  } else {
    throw new Error("Koordinatlar bulunamadı");
  }
}
function MapPage() {
  const { allEstatesNoFilter, fetchAllEstatesNoFilter } =
    useContext(EstateContext);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Tüm emlakları fetch et
    fetchAllEstatesNoFilter();
  }, []);

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        // Emlakların bilgilerini ve koordinatlarını al
        const positionsWithDetails = await Promise.all(
          allEstatesNoFilter.map(async (estate) => {
            try {
              const { lat, lon } = await getCoordinates(
                estate.city,
                estate.district
              );
              return {
                ...estate,
                lat,
                lon,
              };
            } catch (error) {
              console.error(
                `Koordinatlar alınamadı: ${estate.city}, ${estate.district}`,
                error
              );
              return null;
            }
          })
        );

        // Koordinatları state'e kaydet
        setPositions(positionsWithDetails.filter((pos) => pos !== null));
      } catch (error) {
        console.error("Koordinatlar alınamadı:", error);
      }
    }

    if (allEstatesNoFilter.length > 0) {
      fetchCoordinates();
    }
  }, [allEstatesNoFilter]);

  // Harita merkezini Türkiye'nin batısında, İstanbul'a yakın bir konuma ayarlayalım
  const centerPosition =
    positions.length > 0 ? [positions[0].lat, positions[0].lon] : [39.5, 30.0];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <MapContainer
        center={centerPosition}
        zoom={6}
        style={{
          height: "60vh",
          width: "100vh",
          border: "2px solid black",
        }} // Yüksekliği ve genişliği küçültme
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {positions.map(
          ({
            city,
            district,
            lat,
            lon,
            title,
            typeName,
            statusName,
            priceAmount,
            priceCurrencyCode,
            startDate,
            endDate,
          }) => (
            <Marker key={`${district}-${lat}-${lon}`} position={[lat, lon]}>
              <Popup>
                <strong>{title}</strong>
                <br />
                Tip: {typeName}
                <br />
                Durum: {statusName}
                <br />
                Fiyat: {priceAmount} {priceCurrencyCode}
                <br />
                Başlangıç Tarihi: {new Date(startDate).toLocaleDateString()}
                <br />
                Bitiş Tarihi: {new Date(endDate).toLocaleDateString()}
                <br />
                Şehir: {city}
                <br />
                İlçe: {district}
              </Popup>
            </Marker>
          )
        )}
      </MapContainer>
    </Box>
  );
}

export default MapPage;
