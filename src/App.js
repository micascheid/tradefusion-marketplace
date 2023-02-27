// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';


import { getAuth } from 'firebase/auth';
import {useState} from "react";
import {Switch} from "@mui/material";
import {Route} from "react-router";
import MainRoutes from "./routes/MainRoutes";
import LoginRoutes from "./routes/LoginRoutes";
import AuthGuard from "./pages/authentication/AuthGuard";
import AuthRegister from "./pages/authentication/auth-forms/AuthRegister";
import AuthLogin from "./pages/authentication/auth-forms/AuthLogin";
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
      <ScrollTop>
          <Routes/>
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
