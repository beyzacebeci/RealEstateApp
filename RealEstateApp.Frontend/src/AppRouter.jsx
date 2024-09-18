import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EstateProvider from "./Context/EstateContext";
import { BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import EstateDetail from "./Pages/EstateDetail/EstateDetail";
import EditEstateDetail from "./Pages/EstateDetail/EditEstateDetail";
import EstateStatusProvider from "./Context/EstateStatusContext";
import EstateTypeProvider from "./Context/EstateTypeContext";
import PriceProvider from "./Context/PriceContext";
import PhotoProvider from "./Context/PhotoContext";
import CreateNewEstatePage from "./Pages/CreateNewEstatePage/CreateNewEstatePage";
import CurrencyProvider from "./Context/CurrencyContext";
import AdminPage from "./Pages/AdminPage/AdminPage";
import CreatePhotos from "./Pages/EstateDetail/CreatePhotos";
import EstateFilterListPage from "./Pages/EstateFilterListPage/EstateFilterListPage";
import UserProvider from "./Context/UserContext";
import AuthProvider from "./Context/AuthContext";
import Navbar from "./Components/Navbar/Navbar";
import MapPage from "./Pages/Map/MapPage";
import UserEstateListPage from "./Pages/UserEstateListPage/UserEstateListPage";

function AppRouter() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      <AuthProvider>
        <UserProvider>
          <EstateProvider>
            <EstateStatusProvider>
              <EstateTypeProvider>
                <PriceProvider>
                  <PhotoProvider>
                    <CurrencyProvider>
                      {!isLoginPage && <Navbar />}
                      <Routes>
                        <Route path="*" element={<Home />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route
                          path="/user-estate-list-page"
                          element={<UserEstateListPage />}
                        ></Route>
                        <Route
                          path="/admin-page"
                          element={<AdminPage />}
                        ></Route>
                        <Route path="/map" element={<MapPage />}></Route>
                        <Route
                          path="/all-estates"
                          element={<EstateFilterListPage />}
                        ></Route>
                        <Route
                          path="/estate-detail/:id"
                          element={<EstateDetail />}
                        />
                        <Route
                          path="/create-photos/:id"
                          element={<CreatePhotos />}
                        />
                        <Route
                          path="/edit-estate/:id"
                          element={<EditEstateDetail />}
                        />
                        <Route
                          path="/create-new-estate"
                          element={<CreateNewEstatePage />}
                        />
                      </Routes>
                    </CurrencyProvider>
                  </PhotoProvider>
                </PriceProvider>
              </EstateTypeProvider>
            </EstateStatusProvider>
          </EstateProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default AppRouter;
