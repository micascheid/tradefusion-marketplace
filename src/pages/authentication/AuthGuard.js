import React from 'react';
import { Outlet, Navigate} from "react-router-dom";
import { getAuth } from 'firebase/auth';


const AuthGuard = ({children}) => {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    user ? children : <Navigate to={'/login'}/>
  );
};

export default AuthGuard;