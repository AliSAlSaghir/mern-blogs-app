import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiArrowSmRight, HiUser } from "react-icons/hi";

const DashSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    tabFromUrl && setTab(tabFromUrl);
  }, [location.search]);

  const handleNavigation = path => {
    navigate(path);
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
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
