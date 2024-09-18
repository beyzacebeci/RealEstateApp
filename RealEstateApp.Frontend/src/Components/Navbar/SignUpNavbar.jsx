import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import estateIcon from "./estateicon.png";
import trFlag from "./tr-flag.png";
import engFlag from "./en-flag.png";
import { AuthContext } from "../../Context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

function SignUpNavbar() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { tokenValidation, adminValidation, logout } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  //admin ya da user giris yaptiysa
  const adminAnduser = isAdmin === true || isAdmin === false;
  const noAuth = isAdmin === null;

  // useEffect(() => {
  //   // Admin bilgisini güncelle
  //   setIsAdmin(adminValidation());
  //   console.log("Navbardaki is admin : " + isAdmin);
  // }, [adminValidation]); // adminValidation bağımlılığı

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await adminValidation();
      setIsAdmin(adminStatus);
    };
    checkAdminStatus();
  }, [adminValidation]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        height: "90px",
        boxShadow: "none",
        borderBottom: "1px solid #908f8f",
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="/home">
            <img src={estateIcon} alt="Estate Icon" width="90px" />
          </a>
          <Typography variant="h6" sx={{ ml: 2, mr: 5, fontWeight: "bold" }}>
            Real Estate App
          </Typography>
          <Button
            color="inherit"
            href="/home"
            sx={{
              textTransform: "none",
              fontSize: "16px", // Font boyutunu büyüt
            }}
          >
            {t("home")}
          </Button>
          <Button
            color="inherit"
            href="/map"
            sx={{
              textTransform: "none",
              fontSize: "16px", // Font boyutunu büyüt
            }}
          >
            Map
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {noAuth && (
            <Button
              color="inherit"
              href="/login"
              sx={{
                "&:hover": {
                  border: "1px solid #2f2d51",
                },
                ml: 2,
                textTransform: "none",
                fontSize: "16px", // Font boyutunu büyüt
              }}
            >
              {t("signIn")}
            </Button>
          )}

          <div style={{ marginLeft: "16px" }}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClick}
              aria-controls="language-menu"
              aria-haspopup="true"
            >
              <LanguageIcon />
            </IconButton>
            <Menu
              id="language-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => changeLanguage("en")}>
                <img
                  src={engFlag}
                  alt="English"
                  width="24px"
                  style={{ marginRight: "8px" }}
                />
                English
              </MenuItem>
              <MenuItem onClick={() => changeLanguage("tr")}>
                <img
                  src={trFlag}
                  alt="Türkçe"
                  width="24px"
                  style={{ marginRight: "8px" }}
                />
                Türkçe
              </MenuItem>
            </Menu>

            {adminAnduser && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={logout}
                aria-controls="language-menu"
                aria-haspopup="true"
                sx={{ ml: 2 }}
                href="/login"
              >
                <LogoutIcon />
              </IconButton>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default SignUpNavbar;
