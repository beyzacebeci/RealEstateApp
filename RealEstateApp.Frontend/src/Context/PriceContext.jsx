import React, { createContext, useState } from "react";
import { getAPI } from "./Service";

export const PriceContext = createContext();

function PriceProvider(props) {
  const [prices, setPrices] = useState([]);
  const [price, setPrice] = useState([]);

  const fetchPrices = async () => {
    const url = "/prices";

    try {
      const response = await getAPI(url);

      if (response.status === 200) {
        setPrices(response.data);
      } else {
        alert("Error occurred.");
      }
    } catch (error) {
      alert("Error occurred: " + error);
    }
  };

  const fetchPrice = async (id) => {
    if (!id) {
      console.log("No ID provided.");
      return;
    }

    try {
      const url = `/price/${id}`;
      const response = await getAPI(url);

      if (response.status === 200) {
        setPrice(response.data);
      } else {
        console.log("Error occurred!");
      }
    } catch (error) {
      console.log("Error occurred while fetching price: " + error);
    }
  };

  return (
    <PriceContext.Provider
      value={{
        prices,
        price,
        fetchPrices,
        fetchPrice,
      }}
    >
      {props.children}
    </PriceContext.Provider>
  );
}
export default PriceProvider;
