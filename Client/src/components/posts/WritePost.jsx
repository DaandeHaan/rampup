import React, { useState, useEffect } from "react";
import { useGetDataQuery } from "../../logic/apiSlice";

import apiService from "../../logic/apiService";
import img from "../../assets/images/profilepicture.jpg";

import { FaPenFancy } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function WritePost() {
    const [isOpen, setIsOpen] = useState(false);
    const [postContent, setPostContent] = useState("");
    const [postCategory, setPostCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const { data: accountData, isSuccess } = useGetDataQuery("/account/user");

    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        apiService.get("/feed/categories", {}).then((res) => {
            setCategories(res.result);
        });
    }, []);

    const handleMenu = () => setIsOpen(!isOpen);
    const handleChange = (e) => setPostContent(e.target.value);
    const handleSelect = (e) => setPostCategory(e.target.value);

    function handlePost() {
        if (!postContent) {
            alert("Please complete all fields");
            return;
        }

        apiService
            .post("/feed/post", {
                body: postContent,
                categoryID: postCategory === "" ? null : postCategory,
            })
            .then((res) => {
                if (!res.success) {
                    alert(res.message || "An error occurred.");
                } else {
                    navigate(0);
                }
            })
            .catch((err) => {
                alert("An error occurred while posting.");
                console.error(err);
            });
    }

    return (
        <>
            {/* Open menu button */}
            <div
                className={`duration-400 fixed bottom-24 right-4 z-10 ease-in-out sm:relative sm:bottom-auto sm:right-auto ${isOpen ? "translate-y-40 sm:translate-y-0" : "translate-y-0"}`}
            >
                <button
                    onClick={handleMenu}
                    className="bg-dark-secondary border-dark-accent flex size-12 items-center justify-center rounded-full border-2 shadow-md duration-150 ease-in-out hover:shadow-lg sm:size-14"
                >
                    <FaPenFancy className="text-dark-accent hover:text-dark-primary size-5 duration-150 ease-in-out sm:size-7" />
                </button>
            </div>

            {/* Modal */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ease-in-out ${
                    isOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
            >
                {/* Background */}
                <div
                    onClick={handleMenu}
                    className={`fixed inset-0 bg-black transition-opacity duration-500 ease-in-out ${
                        isOpen ? "opacity-50" : "opacity-0"
                    }`}
                />

                {/* Write post container */}
                <div
                    className={`bg-dark-bg h fixed z-50 h-full max-h-96 w-4/5 rounded-xl pb-12 transition-transform duration-500 ease-in-out sm:max-w-md ${
                        isOpen
                            ? "translate-y-0 scale-100 opacity-100"
                            : "translate-y-full scale-90 opacity-0"
                    }`}
                >
                    {/* Header */}
                    <div className="border-dark-primary flex h-12 w-full flex-row items-center justify-between border-b px-5">
                        <button
                            onClick={handleMenu}
                            className="hover:text-dark-secondary duration-150 ease-in-out hover:underline"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePost}
                            disabled={!postContent}
                            className={`border-dark-secondary hover:text-dark-primary rounded-full border px-4 py-0.5 shadow-md duration-300 ease-in-out hover:shadow-lg hover:brightness-75 ${
                                postContent
                                    ? "bg-dark-secondary text-dark-primary"
                                    : "text-dark-secondary bg-transparent"
                            }`}
                        >
                            Post
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex h-full flex-col px-5 py-3">
                        <div className="flex h-full flex-row gap-2.5">
                            {/* Profile picture */}
                            <img className="size-12 rounded-full" src={img} />
                            {/* Content */}
                            <div className="flex h-full w-full flex-col">
                                {/* Header */}
                                <div className="flex flex-col">
                                    <h5 className="text-base font-bold">
                                        @{isSuccess && accountData.username}
                                    </h5>
                                    <select
                                        onChange={(e) => handleSelect(e)}
                                        defaultValue={postCategory}
                                        className="bg-dark-bg text-dark-secondary ml-0 flex -translate-x-1 text-sm focus:outline-none"
                                    >
                                        <option value={""}>Category</option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.categoryID}
                                                value={category.categoryID}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Input */}
                                <textarea
                                    placeholder="What's on your mind?"
                                    onChange={(e) => handleChange(e)}
                                    value={postContent}
                                    className="bg-dark-bg h-full w-full flex-grow resize-none text-sm focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WritePost;
