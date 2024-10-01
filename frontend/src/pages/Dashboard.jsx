import React from "react";
import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useContext } from 'react';
import { UserContext } from "../context/userContext";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
    const {user} = useContext(UserContext);
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case "/dashboard-b":
                return "Admin Dashboard";
            case "/dashboard-b/recycling":
                return "Recycling Guide";
            case "/dashboard-b/disposal":
                return "Disposal Locations";
            case "/dashboard-b/user-profile":
                return "Profile Settings";
            case "/dashboard-b/user-profile/addresses":
                return "Addresses";
            case "/dashboard-b/regulations":
                return "Regulations";
            case "/dashboard-b/feedback":
                return "Feedback";
            case "/dashboard-b/c-schedule":
                return "Collection Schedule";
            case "/dashboard-b/c-routes":
                return "Collection Routes";
            default:
                return "Admin Dashboard";
        }
    };

    return(
        <>
            <div className="flex items-center bg-black justify-between h-[70px] rounded-lg m-2 mt-3 px-[25px]">
                <div className='p-4'>
                    <h1 className='text-white text-2xl font-semibold'>{getPageTitle()}</h1>
                </div>
                <div className="flex items-center gap-[15px] relative">
                    <div className="border-r-[1px] pr-[25px]">
                        {!!user && (<h2 className="text-white text-sm bg-white/20 rounded-sm py-1 px-3 cursor-pointer">{user.name}</h2>)}
                    </div>
                    <div className="gap-[25px] flex items-center justify-center relative">
                    <Link to="/dashboard-b/user-profile">
                        {
                            user && user.avatar
                            ? <img src={user.avatar} alt="User Avatar" className="cursor-pointer rounded-full w-[50px] h-[50px] object-cover" />
                            : <FaCircleUser className="text-white text-3xl cursor-pointer" />
                        }
                    </Link>
                        <div>
                            <FaBell className="text-white text-2xl cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Dashboard;