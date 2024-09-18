import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "./Service";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

export const AuthContext = createContext();

function AuthProvider(props) {
  const { t } = useTranslation();

  const login = async (form) => {
    const url = "/authentication/login";
    try {
      const res = await postAPI(url, form);
      const token = res.data.token;

      // Set token
      localStorage.setItem("token", token);

      // Decode token
      const tokenData = token.split(".")[1];
      const decodedTokenJsonData = window.atob(tokenData);
      const decodedTokenData = JSON.parse(decodedTokenJsonData);

      // Set username, userıd, roles
      const username =
        decodedTokenData[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
      localStorage.setItem("username", username);

      const userId =
        decodedTokenData[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      localStorage.setItem("userId", userId);

      // Set is admin value
      const roles =
        decodedTokenData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      //exp date token geçerlilik süresi
      const exp = decodedTokenData["exp"];
      localStorage.setItem("tokenExpiration", exp);

      const isAdmin = roles.includes("Admin");
      localStorage.setItem("isAdmin", isAdmin);

      return {
        success: true,
        message: t("loginSuccess"),
      };
    } catch (error) {
      return {
        success: false,
        message: t("userNamePasswordError"),
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");

    return;
  };

  //tokenex degerini now degeri ile karsilasitrir ,
  const tokenValidation = () => {
    const token = localStorage.getItem("token");
    const tokenExp = localStorage.getItem("tokenExpiration");
    const current = Date.now();
    const parseTokenExp = tokenExp && parseInt(tokenExp, 10) * 1000;
    return token && parseTokenExp && parseTokenExp > current;
  };

  const adminValidation = () => {
    const isAdmin = localStorage.getItem("isAdmin");
    return (
      tokenValidation() &&
      isAdmin != null &&
      isAdmin != "" &&
      JSON.parse(isAdmin) == true
    );
  };
  // tokenValidation bağımlılık olarak eklendi

  const getUsername = () => {
    return tokenValidation() ? localStorage.getItem("username") : "";
  };

  const getUserId = () => {
    return tokenValidation() ? localStorage.getItem("userId") : "";
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        tokenValidation,
        adminValidation,
        getUsername,
        getUserId,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
