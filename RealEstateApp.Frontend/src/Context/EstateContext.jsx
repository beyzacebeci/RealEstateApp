import { createContext, useState } from "react";
import { getAPI, postAPI, putAPI, deleteAPI } from "./Service";

export const EstateContext = createContext();

function EstateProvider(props) {
  const [estates, setEstates] = useState([]);
  const [allEstatesNoFilter, setAllEstatesNoFilter] = useState([]);

  const [allEstatesWithUserId, setAllEstatesWithUserId] = useState([]);

  const [estate, setEstate] = useState([]);
  const [estateCount, setEstateCount] = useState([]);
  const [estateTypesCount, setEstateTypesCount] = useState([]);

  const fetchAllEstatesWithUserId = async (id) => {
    const url = `/estates/${id}/withUserId`;

    try {
      const response = await getAPI(url);

      if (response.status === 200) {
        setAllEstatesWithUserId(response.data);
      } else {
        alert("Error occurred.");
      }
    } catch (error) {
      alert("Error occurred: " + error);
    }
  };

  //get all estates no filter
  const fetchAllEstatesNoFilter = async () => {
    const url = "/estates/all";

    try {
      const response = await getAPI(url);

      if (response.status === 200) {
        setAllEstatesNoFilter(response.data);
      } else {
        alert("Error occurred.");
      }
    } catch (error) {
      alert("Error occurred: " + error);
    }
  };

  const fetchEstateTypeCounts = async () => {
    const url = "/estates/types/counts";

    try {
      const response = await getAPI(url);

      if (response.status === 200) {
        setEstateTypesCount(response.data);
      } else {
        alert("Error occurred.");
      }
    } catch (error) {
      alert("Error occurred: " + error);
    }
  };
  const fetchEstateCount = async () => {
    const url = "/estates/count";

    try {
      const response = await getAPI(url);

      if (response.status === 200) {
        setEstateCount(response.data);
      } else {
        alert("Error occurred.");
      }
    } catch (error) {
      alert("Error occurred: " + error);
    }
  };
  //get one estate
  const fetchEstate = async (id) => {
    if (!id) {
      console.log("No ID provided.");
      return;
    }

    try {
      const url = `/estates/${id}`;
      const response = await getAPI(url);

      if (response.status === 200) {
        setEstate(response.data);
      } else {
        console.log("Error occurred!");
      }
    } catch (error) {
      console.log("Error occurred while fetching estate: " + error);
    }
  };

  //edit estate
  const handleEditEstate = async ({
    id,
    title,
    estateTypeId,
    estateStatusId,
    estatePriceAmount,
    currencyCode,
    startDate,
    endDate,
    city,
    district,
  }) => {
    const url = `/estates/${id}`;
    try {
      const response = await putAPI(url, {
        id,
        title,
        estateTypeId,
        estateStatusId,
        estatePriceAmount,
        currencyCode,
        startDate,
        endDate,
        city,
        district,
      });

      if (response.status === 200 || response.status === 204) {
        fetchAllEstatesNoFilter();
        // navigate("/estates");
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  //add estate
  const handleAddEstate = async (data) => {
    const url = "/estates";
    try {
      const response = await postAPI(url, data);

      if (response.status === 201) {
        fetchAllEstatesNoFilter();
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  const handleDeleteEstate = async (id) => {
    try {
      const url = `/estates/${id}`;

      const response = await deleteAPI(url);
      if (response.status === 204) {
        // alert("Operation successful!");
        fetchAllEstatesNoFilter();
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  return (
    <EstateContext.Provider
      value={{
        estates,
        estate,
        estateCount,
        estateTypesCount,
        allEstatesNoFilter,
        allEstatesWithUserId,
        fetchAllEstatesNoFilter,
        fetchEstateTypeCounts,
        fetchEstateCount,
        fetchEstate,
        fetchAllEstatesWithUserId,
        handleEditEstate,
        handleAddEstate,
        handleDeleteEstate,
      }}
    >
      {props.children}
    </EstateContext.Provider>
  );
}

export default EstateProvider;
