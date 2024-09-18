import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "./Service";
import { useTranslation } from "react-i18next";

export const UserContext = createContext();

function UserProvider(props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const addUser = async (data) => {
    const url = "/authentication";
    return await postAPI(url, data)
      .then((res) => res)
      .catch((error) => error);
  };

  // HANDLE EVENT FUNCTIONS
  const handleAddUser = async (form) => {
    try {
      const response = await addUser(form);

      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);

        return {
          success: true,
          message: t("userCreatedSuccessfully"),
        }; // Başarılı durumda
      } else if (response.status === 400) {
        const errorMessages = response.data.data;
        const errorKeys = [
          "DuplicateUserName",
          "PasswordTooShort",
          "PasswordRequiresDigit",
        ];

        for (const key of errorKeys) {
          if (errorMessages[key]) {
            return { success: false, message: errorMessages[key] }; // Hata durumunda
          }
        }
      }
      return { success: false, message: "errorOccurred" }; // Genel hata
    } catch (error) {
      return { success: false, message: "errorOccurred" }; // Yakalanan hata
    }
  };

  return (
    <UserContext.Provider
      value={{
        handleAddUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
