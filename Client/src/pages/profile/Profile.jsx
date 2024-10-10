import React, { useEffect } from "react";
import img from "../../assets/images/profilepicture.jpg";
import {
    Link,
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import Post from "../../components/posts/Post";
import { useGetDataQuery } from "../../logic/apiSlice";
import { useDispatch } from "react-redux";
import { updateTitle } from "../../app/redux-reducers/contextProvider";
import apiService from "../../logic/apiService";
import WritePost from "../../components/posts/WritePost";
import FollowButton from "../../components/FollowButton";

function Profile() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [posts, setPosts] = React.useState([]);
    const [replies, setReplies] = React.useState([]);
    const [account, setAccount] = React.useState({});
    const [followers, setFollowers] = React.useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: accountData,
        isSuccess,
        isLoading,
    } = useGetDataQuery("/account/user");

    useEffect(() => {
        dispatch(updateTitle("Profile"));

        apiService.get(`/profile/${id}/account`).then((res) => {
            if (!res.success)
                return navigate(`/profile/${accountData?.accountID}/posts`);

            setAccount(res.result);
            setFollowers(res.result.followers.length);
        });

        apiService.get(`/profile/${id}/posts`).then((res) => {
            setPosts(res.result);
        });
    }, [location]);

    return isSuccess ? (
        <div className="no-scrollbar flex w-full flex-col sm:overflow-auto">
            {/* User info */}
            <div className="flex w-full flex-col pb-0.5">
                {/* Handle and Profile Picture */}
                <div className="mb-2 flex h-min w-full flex-row items-center justify-between px-5 py-2">
                    <div className="flex flex-col">
                        <div className="flex w-full flex-row items-center gap-2">
                            <span className="text-xl font-bold">
                                @{account.username}
                            </span>
                            {accountData.accountID === account.accountID ? (
                                <button 
                                    onClick={() => alert("Come back later to edit your profile! 🖋️")} 
                                    className="border-dark-secondary text-dark-secondary rounded border p-1 text-sm shadow duration-300 ease-in-out hover:bg-dark-secondary hover:text-dark-primary"
                                >
                                    Edit Profile
                                </button> 

                            ) : (
                                <>
                                    <span className="text-sm">&#8226;</span>
                                    <FollowButton
                                        account={account}
                                        setFollowers={setFollowers}
                                    />
                                </>
                            )}
                        </div>
                        <span className="text-dark-text-0.5 pl-5 text-sm">
                            {account.name}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="border-dark-secondary z-10 box-content size-20 rounded-full border-2 drop-shadow-md">
                            <img src={img} className="size-20 rounded-full" />
                        </div>
                    </div>
                </div>
                {/* Bio and Stats */}
                <div className="border-dark-primary flex flex-col gap-2 border-b px-5 pb-2">
                    <p className="text-sm">{account.description || ""}</p>
                    <div className="flex flex-row items-center justify-center text-sm">
                        <span className="flex w-full flex-row items-center justify-center">
                            {posts.length}
                            <span className="text-dark-text-0.5 ml-0.5">
                                Posts
                            </span>
                        </span>
                        <span className="flex w-full flex-row items-center justify-center">
                            {followers}
                            <span className="text-dark-text-0.5 ml-0.5">
                                Followers
                            </span>
                        </span>
                        <span className="flex w-full flex-row items-center justify-center">
                            {account.following?.length}
                            <span className="text-dark-text-0.5 ml-0.5">
                                Following
                            </span>
                        </span>
                    </div>
                </div>
                {/* Posts Toggle */}
                <div className="relative h-10 w-full">
                    <div className="border-dark-primary flex flex-row items-center justify-center border-b-2 py-2">
                        <Link
                            to={`/profile/${id}/posts`}
                            className={`flex size-full items-center justify-center transition-colors duration-300 ease-in-out ${location.pathname.includes("posts") ? "text-dark-accent" : "text-dark-primary"}`}
                        >
                            Posts
                        </Link>
                        <span className="bg-dark-primary h-6 w-0.5" />
                        <Link
                            to={`/profile/${id}/replies`}
                            className={`flex size-full items-center justify-center transition-colors duration-300 ease-in-out ${location.pathname.includes("replies") ? "text-dark-accent" : "text-dark-primary"}`}
                        >
                            Replies
                        </Link>
                    </div>
                    <span
                        className={`border-dark-accent absolute bottom-0 h-0.5 w-1/2 translate-y-0.5 border duration-300 ease-in-out ${location.pathname.includes("replies") ? "translate-x-full" : ""}`}
                    />
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Navigate to="posts" replace />} />
                <Route
                    index
                    path="posts"
                    element={
                        <div className="flex h-full w-full flex-col">
                            {posts.map((post) => (
                                <Post key={post.postID} data={post} />
                            ))}
                        </div>
                    }
                />
                <Route
                    path="replies"
                    element={
                        <div className="flex w-full flex-col">
                            {replies.map((post) => (
                                <Post key={post.postID} data={post} />
                            ))}
                        </div>
                    }
                />
            </Routes>
            {isSuccess && [1, 2].includes(accountData.permissionID) && (
                <div className="flex sm:hidden">
                    <WritePost />
                </div>
            )}
        </div>
    ) : (
        isLoading && (
            <div className="h-screen w-screen">
                <p>Loading...</p>
            </div>
        )
    );
}

export default Profile;
