import React, { createContext, useState } from "react";
import { getAPI, postAPI, deleteAPI } from "./Service";

export const PhotoContext = createContext();

function PhotoProvider(props) {
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [estatePhotos, setEstatePhotos] = useState(null);

  const fetchPhotos = async () => {
    const url = "/photos";

    try {
      const response = await getAPI(url);

      if (response.status === 200) {
        setPhotos(response.data);
      } else {
        alert("Error occurred.");
      }
    } catch (error) {
      alert("Error occurred: " + error);
    }
  };

  const fetchPhoto = async (id) => {
    if (!id) {
      console.log("No ID provided.");
      return;
    }

    try {
      const url = `/photos/${id}`;
      const response = await getAPI(url);

      if (response.status === 200) {
        setPhoto(response.data);
      } else {
        console.log("Error occurred!");
      }
    } catch (error) {
      console.log("Error occurred while fetching estate: " + error);
    }
  };

  const fetchOneEstatePhotos = async (id) => {
    if (!id) {
      console.log("No ID provided.");
      return;
    }

    try {
      const url = `/photos/estateallPhotos/${id}`;
      const response = await getAPI(url);

      if (response.status === 200) {
        setEstatePhotos(response.data);
      } else {
        console.log("Error occurred!");
      }
    } catch (error) {
      console.log("Error occurred while fetching estate: " + error);
    }
  };

  const handleAddPhoto = async (data) => {
    const url = "/photos";
    try {
      const response = await postAPI(url, data);

      if (response.status === 201) {
        alert("Operation successful!");
        fetchPhotos();
        fetchOneEstatePhotos();
      } else {
        alert("Operation failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred:\n" + error);
    }
  };

  // const handleDeletePhoto = async (id) => {
  //   try {
  //     const url = `/photos/${id}`;

  //     const response = await deleteAPI(url);
  //     if (response.status === 204) {
  //       alert("Operation successful!");
  //       fetchPhotos();
  //     } else {
  //       alert("Operation failed!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error occurred:\n" + error);
  //   }
  // };

  const handleDeletePhoto = async (id) => {
    try {
      const url = `/photos/${id}`;
      const response = await deleteAPI(url);
      if (response.status === 204) {
        return Promise.resolve();
      } else {
        return Promise.reject("Operation failed!");
      }
    } catch (error) {
      return Promise.reject("Error occurred:\n" + error);
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        photo,
        estatePhotos,
        fetchPhotos,
        fetchPhoto,
        handleAddPhoto,
        fetchOneEstatePhotos,
        handleDeletePhoto,
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  );
}

export default PhotoProvider;
