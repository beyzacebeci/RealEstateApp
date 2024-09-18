import React, { createContext, useState } from "react";
import { getAPI, putAPI, postAPI, deleteAPI } from "./Service";

export const EstateStatusContext = createContext();

function EstateStatusProvider(props) {
  const [estateStatuses, setEstateStatuses] = useState([]);
  const [estateStatus, setEstateStatus] = useState([]);

  const fetchEstateStatuses = async () => {
    const url = "/estateStatuses";

    try {
      const response = await getAPI(url);

      if (response.status === 200) {
        setEstateStatuses(response.data);
      } else {
        alert("Error occurred.");
      }
    } catch (error) {
      alert("Error occurred: " + error);
    }
  };

  const fetchEstateStatus = async (id) => {
    if (!id) {
      console.log("No ID provided.");
      return;
    }

    try {
      const url = `/estateStatuses/${id}`;
      const response = await getAPI(url);

      if (response.status === 200) {
        setEstateStatus(response.data);
      } else {
        console.log("Error occurred!");
      }
    } catch (error) {
      console.log("Error occurred while fetching estate: " + error);
    }
  };

  const handleAddEstateStatus = async (data) => {
    const url = "/estateStatuses";
    try {
      const response = await postAPI(url, data);

      if (response.status === 201) {
        fetchEstateStatuses();
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  const handleEditEstateStatus = async ({ id, status }) => {
    const url = `/estateStatuses/${id}`;
    try {
      const response = await putAPI(url, { id, status });

      if (response.status === 200 || response.status === 204) {
        fetchEstateStatuses();
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };
  const handleDeleteEstateStatus = async (id) => {
    try {
      const url = `/estateStatuses/${id}`;

      const response = await deleteAPI(url);
      if (response.status === 204) {
        fetchEstateStatuses();
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  return (
    <EstateStatusContext.Provider
      value={{
        estateStatuses,
        estateStatus,
        fetchEstateStatuses,
        fetchEstateStatus,
        handleAddEstateStatus,
        handleEditEstateStatus,
        handleDeleteEstateStatus,
      }}
    >
      {props.children}
    </EstateStatusContext.Provider>
  );
}

export default EstateStatusProvider;
