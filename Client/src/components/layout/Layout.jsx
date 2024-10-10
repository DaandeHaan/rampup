import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetDataQuery } from "../../logic/apiSlice";

import apiService from "../../logic/apiService";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

function Layout() {
    const title = useSelector((state) => state.context.title);

    const { refetch } = useGetDataQuery("/account/user");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/feed");
        }
    }, []);

    function logOut() {
        // Clear Cache
        apiService.post("/auth/logout").then(() => {
            refetch();
            navigate("/auth/login");
        });
    }

    return (
        <div className="flex-col sm:relative sm:flex">
            <span className="text-dark-text z-50 hidden font-bold sm:fixed sm:flex sm:h-14 sm:w-full sm:items-center sm:justify-center sm:gap-2 sm:text-xl">
                {title}
            </span>
            <div className="bg-dark-bg text-dark-text flex min-h-dvh flex-col items-center sm:flex-row-reverse sm:items-center sm:justify-center sm:gap-4 sm:py-14 md:gap-6">
                <Header logOut={logOut} />
                <div className="sm:bg-dark-bg-shade flex w-full flex-col items-center justify-center pt-14 sm:h-[calc(100vh-7rem)] sm:max-w-md sm:justify-start sm:rounded-xl sm:pt-0 sm:shadow-xl md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
                    <Outlet />
                </div>
                <Footer logOut={logOut} />
            </div>
        </div>
    );
}

export default Layout;
