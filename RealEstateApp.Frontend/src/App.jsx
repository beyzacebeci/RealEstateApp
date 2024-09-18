import "./App.css";
import AppRouter from "./AppRouter";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AuthProvider from "./Context/AuthContext";
import UserProvider from "./Context/UserContext";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </>
  );
}

export default App;
