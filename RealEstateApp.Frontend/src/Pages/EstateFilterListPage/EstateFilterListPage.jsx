import React, { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { EstateTypeContext } from "../../Context/EstateTypeContext";
import { EstateStatusContext } from "../../Context/EstateStatusContext";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import AllEstateList from "./AllEstateList";

function EstateFilterListPage() {
  const { t } = useTranslation();
  const { estateStatuses, fetchEstateStatuses } =
    useContext(EstateStatusContext);
  const { estateTypes, fetchEstateTypes } = useContext(EstateTypeContext);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minStartDate: "",
    maxEndDate: "",
    estateTypes: [],
    estateStatuses: [],
  });

  useEffect(() => {
    fetchEstateStatuses();
    fetchEstateTypes();
  }, []);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setSelectedTypes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setSelectedStatuses((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);

  const handleMinPriceChange = (event) => {
    const value = event.target.value;
    if (value === "" || parseFloat(value) >= 0) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (event) => {
    const value = event.target.value;
    if (value === "" || parseFloat(value) >= 0) {
      setMaxPrice(value);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePriceSearchClick = () => {
    setFilters({
      minPrice,
      maxPrice,
      minStartDate: startDate, // Yeni eklendi
      maxEndDate: endDate, // Yeni eklendi
      estateTypes: selectedTypes,
      estateStatuses: selectedStatuses,
    });
  };

  const handleDateSearchClick = () => {
    setFilters({
      minStartDate: startDate, // Yeni eklendi
      maxEndDate: endDate, // Yeni eklendi
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 2, p: 4 }}>
      <Box sx={{ flexShrink: 0, width: "350px" }}>
        <Box
          sx={{
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            maxWidth: 420,
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, fontSize: "1rem" }}>
            {t("category")}
          </Typography>

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleAccordionChange("panel1")}
            sx={{ p: 0 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                {t("type")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {estateTypes.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    control={
                      <Checkbox
                        value={option.name || ""}
                        checked={selectedTypes.includes(option.name)}
                        onChange={handleTypeChange}
                        sx={{ p: 0.5 }}
                      />
                    }
                    label={option.name}
                    sx={{
                      mb: 0.5,
                      "& .MuiTypography-root": { fontSize: "0.75rem" },
                    }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleAccordionChange("panel2")}
            sx={{ mt: 1, p: 0 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                {t("status")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {estateStatuses.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    control={
                      <Checkbox
                        value={option.status || ""}
                        checked={selectedStatuses.includes(option.status)}
                        onChange={handleStatusChange}
                        sx={{ p: 0.5 }}
                      />
                    }
                    label={option.status}
                    sx={{
                      mb: 0.5,
                      "& .MuiTypography-root": { fontSize: "0.75rem" },
                    }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <TextField
                type="date"
                label={t("estateStartDate")}
                value={startDate || ""}
                onChange={handleStartDateChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  flex: 1,
                  minWidth: 80,
                  "& .MuiInputLabel-root": { fontSize: "0.75rem" },
                  "& .MuiInputBase-input": { fontSize: "0.75rem" },
                }}
              />
              {"_"}
              <TextField
                type="date"
                label={t("estateEndDate")}
                value={endDate || ""}
                onChange={handleEndDateChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  flex: 1,
                  minWidth: 80,
                  "& .MuiInputLabel-root": { fontSize: "0.75rem" },
                  "& .MuiInputBase-input": { fontSize: "0.75rem" },
                }}
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleDateSearchClick} // Butona tıklanınca filtreler yenilensin
                sx={{
                  fontSize: "0.75rem",
                  minWidth: 60,
                  borderRadius: 10,
                }}
              >
                <SearchIcon />
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <TextField
                type="number"
                label="Min"
                value={minPrice || ""}
                onChange={handleMinPriceChange}
                sx={{
                  flex: 1,
                  minWidth: 80,
                  "& .MuiInputLabel-root": { fontSize: "0.75rem" },
                  "& .MuiInputBase-input": { fontSize: "0.75rem" },
                }}
              />
              <TextField
                type="number"
                label="Max"
                value={maxPrice || ""}
                onChange={handleMaxPriceChange}
                InputProps={{ inputProps: { min: 0 } }}
                sx={{
                  flex: 1,
                  minWidth: 80,
                  "& .MuiInputLabel-root": { fontSize: "0.75rem" },
                  "& .MuiInputBase-input": { fontSize: "0.75rem" },
                }}
              />
              <Button
                variant="contained"
                color="success"
                onClick={handlePriceSearchClick}
                sx={{
                  fontSize: "0.75rem",
                  minWidth: 60,
                  borderRadius: 15,
                }}
              >
                <SearchIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/**/}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <AllEstateList
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          selectedTypes={selectedTypes}
          selectedStatuses={selectedStatuses}
          startDate={startDate} // startDate'i prop olarak geçin
          endDate={endDate} // endDate'i prop olarak geçin
        />
      </Box>
    </Box>
  );
}

export default EstateFilterListPage;
