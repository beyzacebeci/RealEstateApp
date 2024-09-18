import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../Context/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import SignUpNavbar from "../../Components/Navbar/SignUpNavbar";

const defaultTheme = createTheme();

export default function Login() {
  const { login, adminValidation } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isAdmin, setIsAdmin] = useState();

  //admin ya da user giris yaptiysa
  const adminAnduser = isAdmin === true || isAdmin === false;
  //kimse giris yapmadiysa
  const noAuth = isAdmin === null;

  useEffect(() => {
    // Admin bilgisini güncelle
    setIsAdmin(adminValidation());
    console.log("Navbardaki is admin : " + isAdmin);
  }, [adminValidation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form verilerinin eksiksiz olduğunu kontrol et
    const { userName, password } = formData;
    if (!userName || !password) {
      setSnackbarMessage(t("allFieldsRequired"));
      setSnackbarSeverity("error");
      setOpenSnackbar(true);

      return;
    }
    const result = await login(formData);
    if (result.success) {
      setSnackbarMessage(t(result.message));
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      console.log(adminValidation());

      navigate("/home");
    } else {
      setSnackbarMessage(t(result.message));
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }

    setIsAdmin(adminValidation());
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {adminAnduser && <Navbar></Navbar>}
      {noAuth && <SignUpNavbar />}

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("signIn")}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {isAdmin && <div>aaaaa</div>}
              <TextField
                value={formData.userName}
                margin="normal"
                fullWidth
                id="username"
                label={t("userName")}
                name="userName"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                value={formData.password}
                margin="normal"
                fullWidth
                name="password"
                label={t("password")}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t("signIn")}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/register" variant="body2">
                    {t("navigateSignUpMessage")}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
}
