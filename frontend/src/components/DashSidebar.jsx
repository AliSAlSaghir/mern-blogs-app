import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useSignoutMutation } from "../redux/api/auth";
import { toast } from "react-toastify";
import { logout } from "../redux/features/auth/authSlice";

const DashSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const [signout] = useSignoutMutation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    tabFromUrl && setTab(tabFromUrl);
  }, [location.search]);

  const handleNavigation = path => {
    navigate(path);
  };

  const handleSignOut = async () => {
    try {
      await signout();
      dispatch(logout());
      toast.success("Signed out successfully");
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            onClick={() => handleNavigation("/dashboard?tab=profile")}
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
