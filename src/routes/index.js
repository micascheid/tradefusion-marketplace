import {Routes, useRoutes} from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import {Route} from "react-router";
import Dashboard from "../pages/dashboard";
import AuthLogin from "../pages/authentication/auth-forms/AuthLogin";
import MainLayout from "../layout/MainLayout";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, LoginRoutes]);
}
