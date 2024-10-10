import React from "react";
import { useGetDataQuery } from "../logic/apiSlice";

function Loading() {
    const { isSuccess, isLoading } = useGetDataQuery("/account/user");

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-white ${isSuccess && "ani"}`}
        >
            Loading...
        </div>
    );
}

export default Loading;
