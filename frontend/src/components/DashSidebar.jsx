import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUser,
  HiUser,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useSignoutMutation } from "../redux/api/auth";
import { toast } from "react-toastify";
import { logout } from "../redux/features/auth/authSlice";

const DashSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [signout] = useSignoutMutation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    tabFromUrl && setTab(tabFromUrl);
  }, [location.search]);

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
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={userInfo.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {userInfo.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {userInfo.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item
                active={tab === "users"}
                icon={HiOutlineUser}
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
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
