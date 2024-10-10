import React from "react";
import Post from "../../components/posts/Post";
import img from "../../assets/images/profilepicture.jpg";

function PostOverview() {
    const data = {
        // Mock data for posts
        username: "mintchoco",
        timestamp: 1727434025000,
        content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, id quos vel, rem officia in ducimus aliquam expedita perspiciatis ab earum, ea rerum accusamus corrupti totam maiores vero ratione. Sint?",
        totalLikes: 0,
        totalComments: 0,
        image: img,
        relation: "you",
    };

    return (
        <div>
            <Post data={data} />
        </div>
    );
}

export default PostOverview;
