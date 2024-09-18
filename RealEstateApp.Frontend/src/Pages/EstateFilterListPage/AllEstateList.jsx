import React, { useEffect, useState } from "react";
import EstateCard from "../../Components/EstateCard/EstateCard";
import { Box, Pagination, CircularProgress, Typography } from "@mui/material";
import { getAPI } from "../../Context/Service";
import { useTranslation } from "react-i18next";

const AllEstateList = ({
  minPrice,
  maxPrice,
  selectedTypes,
  selectedStatuses,
  startDate,
  endDate,
}) => {
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1 });
  const [pageSize, setPageSize] = useState(10);

  const { currentPage, totalPages } = paging;
  const { t } = useTranslation();

  const fetchEstates = async () => {
    setLoading(true);
    setError(null);

    const queryParameters = [
      ...selectedTypes.map(
        (type) => `EstateTypeNames=${encodeURIComponent(type)}`
      ),
      ...selectedStatuses.map(
        (type) => `EstateStatusNames=${encodeURIComponent(type)}`
      ),
      minPrice ? `MinPrice=${minPrice}` : null,
      maxPrice ? `MaxPrice=${maxPrice}` : null,
      startDate ? `MinStartDate=${startDate}` : null, // startDate parametresini ekleyin
      endDate ? `MaxEndDate=${endDate}` : null, // endDate parametresini ekleyin
      `PageSize=${pageSize}`,
      `PageNumber=${currentPage}`,
    ]
      .filter(Boolean)
      .join("&");

    const query = queryParameters ? `?${queryParameters}` : "";

    try {
      const response = await getAPI(`/estates${query}`);
      if (response.status === 200) {
        const pagingHeader = response.headers["x-pagination"];
        if (pagingHeader) {
          const parsedPaging = JSON.parse(pagingHeader);
          setPaging({
            currentPage: parsedPaging.CurrentPage,
            totalPages: parsedPaging.TotalPage,
          });
        } else {
          console.error("Pagination header is missing.");
        }
        setEstates(response.data);
      } else {
        setError("Failed to fetch estates.");
      }
    } catch (error) {
      console.error("Error fetching estates:", error);
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstates();
  }, [
    currentPage,
    pageSize,
    minPrice,
    maxPrice,
    selectedTypes,
    selectedStatuses,
  ]);

  const handlePageChange = (event, value) => {
    setPaging((prevPaging) => ({ ...prevPaging, currentPage: value }));
  };

  return (
    <div>
      <div className="estate-container">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : estates.length > 0 ? (
          estates.map((estate) => (
            <EstateCard key={estate.id} estate={estate} />
          ))
        ) : (
          <Typography>{t("noestatesfound")}</Typography>
        )}
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="standard"
        />
      </Box>
    </div>
  );
};

export default AllEstateList;
