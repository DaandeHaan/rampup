import React from "react";
import WritePost from "../posts/WritePost";
import img from "../../assets/images/profilepicture.jpg";

import { useGetDataQuery } from "../../logic/apiSlice";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { TbSettings, TbSettingsFilled } from "react-icons/tb";
import { MdAccountCircle, MdOutlineAccountCircle } from "react-icons/md"; // to be implemented
import { MdLogout } from "react-icons/md";

function Header({ logOut }) {
    const title = useSelector((state) => state.context.title);

    const { data: accountData, isSuccess } = useGetDataQuery("/account/user");

    const location = useLocation();

    return (
        isSuccess && (
            <div className="w-full justify-start sm:flex sm:w-20">
                <div className="w-full sm:relative sm:flex sm:h-[calc(100vh-7rem)] sm:w-auto sm:flex-col sm:justify-between">
                    <nav className="bg-dark-bg sm:bg-dark-bg-shade border-b-dark-primary fixed top-0 z-40 flex h-14 w-full flex-row items-center justify-between border-b px-6 py-2 sm:relative sm:h-auto sm:w-auto sm:rounded-xl sm:border-0 sm:p-2">
                        {/* <button className="sm:hidden">
                        <TbSettings className="size-10" />
                    </button> */}
                        <button onClick={() => logOut()} className="sm:hidden">
                            <MdLogout className="text-dark-primary size-10" />
                        </button>
                        <h5 className="text-xl font-bold sm:hidden">{title}</h5>
                        <Link
                            to={`/profile/${accountData?.accountID}/posts`}
                            className={isSuccess ? "" : `pointer-events-none`}
                        >
                            <div className="flex-row items-center gap-2 lg:flex">
                                <div
                                    className={`border-dark-secondary box-border size-10 rounded-full sm:flex sm:size-14 sm:items-center ${location.pathname.includes("/profile") ? "border-[3px]" : "border-2"} relative z-10`}
                                >
                                    <img
                                        className="size-full rounded-full"
                                        src={img}
                                        alt="Profile"
                                    />
                                </div>
                                <span className="hidden font-bold lg:flex">
                                    @{accountData.username}
                                </span>
                            </div>
                        </Link>
                    </nav>
                    {isSuccess && (location.pathname === "/feed" || location.pathname === "/friends") && [1, 2].includes(accountData.permissionID) && (
                        <div className="sm:bg-dark-bg-shade box-content hidden size-14 items-center justify-center rounded-xl p-2 sm:relative sm:flex">
                            <WritePost />
                        </div>
                    )}
                </div>
            </div>
        )
    );
}

export default Header;
