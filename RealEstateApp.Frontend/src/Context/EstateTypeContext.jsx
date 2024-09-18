import React, { createContext, useState } from "react";
import { getAPI, postAPI, putAPI, deleteAPI } from "./Service";
export const EstateTypeContext = createContext();

function EstateTypeProvider(props) {
  const [estateTypes, setEstateTypes] = useState([]);
  const [estateType, setEstateType] = useState([]);

  const fetchEstateTypes = async () => {
    const url = "/EstateTypes";

    try {
      const response = await getAPI(url);

      if (response.status === 200) {
        setEstateTypes(response.data);
      } else {
        alert("Error occurred.");
      }
    } catch (error) {
      alert("Error occurred: " + error);
    }
  };

  const fetchEstateType = async (id) => {
    if (!id) {
      console.log("No ID provided.");
      return;
    }

    try {
      const url = `/EstateTypes/${id}`;
      const response = await getAPI(url);

      if (response.status === 200) {
        setEstateType(response.data);
      } else {
        console.log("Error occurred!");
      }
    } catch (error) {
      console.log("Error occurred while fetching estateType: " + error);
    }
  };

  const handleAddEstateType = async (data) => {
    const url = "/EstateTypes";
    try {
      const response = await postAPI(url, data);

      if (response.status === 201) {
        fetchEstateTypes();
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  const handleEditEstateType = async ({ id, name }) => {
    const url = `/EstateTypes/${id}`;
    try {
      const response = await putAPI(url, { id, name });

      if (response.status === 200 || response.status === 204) {
        fetchEstateTypes();
        // navigate("/estates");
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };
  const handleDeleteEstateType = async (id) => {
    try {
      const url = `/EstateTypes/${id}`;

      const response = await deleteAPI(url);
      if (response.status === 204) {
        fetchEstateTypes();
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  return (
    <EstateTypeContext.Provider
      value={{
        estateTypes,
        estateType,
        fetchEstateTypes,
        fetchEstateType,
        handleAddEstateType,
        handleEditEstateType,
        handleDeleteEstateType,
      }}
    >
      {props.children}
    </EstateTypeContext.Provider>
  );
}

export default EstateTypeProvider;
