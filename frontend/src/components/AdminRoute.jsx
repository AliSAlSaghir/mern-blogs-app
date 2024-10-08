import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useSelector(state => state.auth);
  return userInfo.isAdmin ? <Outlet /> : <Navigate to="sign-in" />;
};

export default AdminRoute;
