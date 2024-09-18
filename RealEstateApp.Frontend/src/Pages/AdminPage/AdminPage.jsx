import React from "react";
import Currency from "./Currency";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import EstateType from "./EstateType";
import EstateStatus from "./EstateStatus";

function AdminPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      padding={10}
    >
      <EstateType />
      <EstateStatus />
      <Currency />
    </Box>
  );
}

export default AdminPage;
