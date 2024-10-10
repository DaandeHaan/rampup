import React from "react";
import img from "../assets/images/profilepicture.jpg";

export default function Comment() {
    return (
        <div className="flex h-20 w-full max-w-3xl gap-3 p-3">
            <img
                className="size-16 w-16 flex-none rounded-full"
                src={img}
                alt="Profile"
            />
            <div className="w-72 flex-auto">
                <h5 className="h-5 text-base font-bold">@daan</h5>
                <div className="space-y-1.5">
                    <span className="text-dark-text-0.5 text-sm">22m ago</span>
                    <p className="text-sm">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Ut ducimus rerum nostrum modi facilis, illo, porro
                        placeat sed et vero necessitatibus qui voluptates eaque
                    </p>
                </div>
            </div>
        </div>
    );
}