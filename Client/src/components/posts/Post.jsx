import React, { useState, useEffect } from "react";
import img from "../../assets/images/profilepicture.jpg";
import apiService from "../../logic/apiService";
import { FaRegComment, FaComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoShareSocialOutline, IoShareSocial } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGetDataQuery } from "../../logic/apiSlice";

function Post({ data }) {
    const { data: accountData, isSuccess } = useGetDataQuery("/account/user");

    const [isLiked, setIsLiked] = useState(
        isSuccess && data.likedByCurrentUser,
    );
    const [totalLikes, setTotalLikes] = useState(data.likeCount);
    const [totalComments, setTotalComments] = useState(0);
    const [timeStamp, setTimeStamp] = useState("");
    const [fullDateWithSeconds, setFullDateWithSeconds] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const timestampDate = new Date(data.dateCreated);
        const now = new Date();

        // Format full date with time (including seconds) in local time zone
        const formattedFullDateWithSeconds = timestampDate.toLocaleString(
            "en-CA",
            {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            },
        );
        setFullDateWithSeconds(formattedFullDateWithSeconds);

        // Calculate time difference
        const timeDifference = now.getTime() - timestampDate.getTime();
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (days >= 1) {
            // Show full date after 24 hours
            setTimeStamp(timestampDate.toLocaleDateString("en-CA"));
        } else if (hours > 0) {
            setTimeStamp(`${hours}h ago`);
        } else if (minutes > 0) {
            setTimeStamp(`${minutes}m ago`);
        } else {
            setTimeStamp("Just now");
        }
    }, [data]);

    function handleLiking() {
        if (isLiked) {
            setIsLiked(false);
            setTotalLikes(totalLikes - 1);
        } else {
            setIsLiked(true);
            setTotalLikes(totalLikes + 1);
        }
        apiService.post("/feed/like", { postID: data.postID });
    }

    return (
        <div className="animate-fadeIn border-b-dark-primary flex min-h-20 w-full max-w-3xl flex-col gap-2.5 border-b px-5 py-3 last:mb-20 last:border-b-0 sm:flex-shrink-0 sm:last:mb-0">
            {/* Content */}
            <div className="flex flex-row gap-2.5">
                {/* Profile picture */}
                <img className="size-12 rounded-full" src={img} alt="Profile" />
                {/* Content */}
                <div className="flex w-full flex-col gap-2">
                    {/* Header */}
                    <div className="flex flex-col">
                        <div className="flex w-full flex-row items-center gap-2">
                            <h5
                                className="text-base font-bold hover:underline"
                                onClick={() =>
                                    navigate(`/profile/${data.accountID}/posts`)
                                }
                            >
                                @{data.username}
                            </h5>
                            {isSuccess &&
                            accountData.accountID === data.accountID ? (
                                <>
                                    <span className="text-sm">&#8226;</span>
                                    <span className="text-sm">you</span>
                                </>
                            ) : null}
                        </div>
                        <div className="flex w-full flex-row items-center gap-2">
                            <span
                                className="text-dark-text-0.5 text-sm"
                                title={fullDateWithSeconds}
                            >
                                {timeStamp}
                            </span>
                            {data.category && (
                                <>
                                    <span className="text-sm">&#8226;</span>
                                    <span className="text-dark-accent text-sm">
                                        {data.category}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    {/* Body */}
                    <div className="flex w-full max-w-full">
                        <p className="flex w-full whitespace-normal break-words break-all text-sm">
                            {data.body}
                        </p>
                    </div>
                </div>
            </div>
            {/* Engagement */}
            <div className="flex h-6 w-full flex-row items-center justify-center gap-2.5">
                {/* Comments */}
                <div className="flex w-full flex-row items-center justify-end gap-2">
                    <span className="text-sm">{totalComments}</span>
                    <Link to="" className="size-6">
                        <FaRegComment className="size-full" />
                    </Link>
                </div>
                {/* Share functionality for later */}
                {/* <div className="flex">
                    <button className="size-6">
                        <IoShareSocialOutline className="size-full" />
                    </button>
                </div> */}
                {/* Likes */}
                <div className="flex w-full flex-row items-center justify-start gap-2">
                    <button
                        onClick={() => handleLiking()}
                        className="relative size-6"
                    >
                        <FaHeart
                            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 duration-[400ms] ease-out ${isLiked ? "size-full" : "size-0"}`}
                        />
                        <FaRegHeart
                            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-150 ease-in-out ${isLiked ? "size-0" : "size-full"}`}
                        />
                    </button>
                    <span className="text-sm">{totalLikes}</span>
                </div>
            </div>
        </div>
    );
}

export default Post;
