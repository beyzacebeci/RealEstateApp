import React, { createContext, useState } from "react";
import { getAPI, postAPI, deleteAPI, putAPI } from "./Service";
export const CurrencyContext = createContext();

function CurrencyProvider(props) {
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState([]);

  const fetchCurrencies = async () => {
    const url = "/currencies";

    try {
      const response = await getAPI(url);

      if (response.status === 200) {
        setCurrencies(response.data);
      } else {
        alert("Error occurred.");
      }
    } catch (error) {
      alert("Error occurred: " + error);
    }
  };

  const fetchCurrency = async (id) => {
    if (!id) {
      console.log("No ID provided.");
      return;
    }

    try {
      const url = `/currencies/${id}`;
      const response = await getAPI(url);

      if (response.status === 200) {
        setCurrency(response.data);
      } else {
        console.log("Error occurred!");
      }
    } catch (error) {
      console.log("Error occurred while fetching currency: " + error);
    }
  };

  const handleAddCurrency = async (data) => {
    const url = "/currencies";
    try {
      const response = await postAPI(url, data);

      if (response.status === 201) {
        fetchCurrencies();
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  const handleEditCurrency = async ({ id, code, currencyName }) => {
    const url = `/currencies/${id}`;
    try {
      const response = await putAPI(url, { id, code, currencyName });

      if (response.status === 200 || response.status === 204) {
        fetchCurrencies();
        // navigate("/estates");
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  const handleDeleteCurrency = async (id) => {
    try {
      const url = `/currencies/${id}`;
      // const url = "/currencies?id=" + id; // Alternatif URL formatı

      const response = await deleteAPI(url);
      if (response.status === 204) {
        fetchCurrencies();
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        currency,
        fetchCurrencies,
        fetchCurrency,
        handleAddCurrency,
        handleDeleteCurrency,
        handleEditCurrency,
      }}
    >
      {props.children}
    </CurrencyContext.Provider>
  );
}

export default CurrencyProvider;
