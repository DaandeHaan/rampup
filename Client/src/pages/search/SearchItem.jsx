import React, { useState } from "react";
import img from "../../assets/images/profilepicture.jpg";
import { useNavigate } from "react-router-dom";
import FollowButton from "../../components/FollowButton"
function SearchItem({ data }) {
    const navigate = useNavigate();
    const [followers, setFollowers] = useState(data.followers.length);

    return (
        <div className="border-dark-primary flex h-20 w-full max-w-3xl flex-row items-center justify-between gap-2.5 border-b px-3">
            {/* Account Info */}
            <div className="flex flex-row items-center justify-start gap-2">
                <img src={img} className="size-12 rounded-full" />
                <div className="flex h-full flex-col justify-between">
                    <h5 onClick={() => navigate(`/profile/${data.accountID}/posts`)} className="md:w-2xl max-w-52 truncate text-base font-bold hover:underline">
                        @{data.username}
                    </h5>
                    <p className="text-sm">{followers} followers</p>
                </div>
            </div>
            {/* Action Button */}
            <FollowButton account={data} setFollowers={setFollowers}/>
        </div>
    );
}

export default SearchItem;
