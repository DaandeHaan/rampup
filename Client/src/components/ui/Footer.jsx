import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
    IoHomeOutline,
    IoHome,
    IoSearchOutline,
    IoSearch,
    IoNotifications,
    IoNotificationsOutline,
    IoMail,
    IoMailOutline,
} from "react-icons/io5";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

function Footer({ logOut }) {
    const location = useLocation();

    return (
        <div className="flex w-full flex-col items-end sm:w-20 sm:gap-4">
            <div className="border-t-dark-primary sm:bg-dark-bg-shade bg-dark-bg-0.95 fixed bottom-0 z-40 flex h-20 w-full flex-row items-center justify-around border-t sm:relative sm:bottom-auto sm:h-auto sm:w-14 sm:flex-col sm:gap-2 sm:rounded-xl sm:border-0 sm:p-2">
                <Link
                    to="/feed"
                    className={`sm:hover:bg-dark-bg-0.5 sm:rounded-lg sm:p-1 sm:duration-300`}
                >
                    {location.pathname.includes("/feed") ? (
                        <IoHome className="text-dark-secondary size-9" />
                    ) : (
                        <IoHomeOutline className="text-dark-primary size-9" />
                    )}
                </Link>
                <Link
                    to="/friends"
                    className={`sm:hover:bg-dark-bg-0.5 sm:rounded-lg sm:p-1 sm:duration-300`}
                >
                    {location.pathname.includes("/friends") ? (
                        <BsPeopleFill className="text-dark-secondary size-9" />
                    ) : (
                        <BsPeople className="text-dark-primary size-9" />
                    )}
                </Link>
                <Link
                    to="/search"
                    className={`sm:hover:bg-dark-bg-0.5 sm:rounded-lg sm:p-1 sm:duration-300`}
                >
                    {location.pathname.includes("/search") ? (
                        <IoSearch className="text-dark-secondary size-9" />
                    ) : (
                        <IoSearchOutline className="text-dark-primary size-9" />
                    )}
                </Link>
                {/* This functionally will be inplemented in the future */}
                {/* <Link 
                    to="/notifications"
                    className={`sm:hover:bg-dark-bg-0.5 sm:rounded-lg sm:p-1 sm:duration-300`}
                >
                    {location.pathname.includes("/notifications") ? (
                        <IoNotifications className="text-dark-secondary size-9" />
                    ) : (
                        <IoNotificationsOutline className="text-dark-primary size-9" />
                    )}
                </Link>
                <Link
                    to="/messages"
                    className={`sm:hover:bg-dark-bg-0.5 sm:rounded-lg sm:p-1 sm:duration-300`}
                >
                    {location.pathname.includes("/messages") ? (
                        <IoMail className="text-dark-secondary size-9" />
                    ) : (
                        <IoMailOutline className="text-dark-primary size-9" />
                    )}
                </Link> */}
            </div>
            <div className="border-t-dark-primary sm:bg-dark-bg-shade bg-dark-bg-0.95 fixed bottom-0 z-40 hidden h-20 w-full flex-row items-center justify-around border-t sm:relative sm:bottom-auto sm:flex sm:h-auto sm:w-14 sm:flex-col sm:gap-2 sm:rounded-xl sm:border-0 sm:p-2">
                <button
                    onClick={() => logOut()}
                    className="sm:hover:bg-dark-bg-0.5 hidden sm:flex sm:rounded-lg sm:p-1 sm:duration-300"
                >
                    <MdLogout className="text-dark-primary size-9" />
                </button>
            </div>
        </div>
    );
}

export default Footer;
