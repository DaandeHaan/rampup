import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    const content = [
        "Did you get lost?",
        "This page does not exist",
        "New area discovered",
        "You're not supposed to be here",
        "You're in the wrong neighborhood",
        "Nothing to see here",
        "Where did you come from?",
        "Whoops! Wrong turn",
        "404: Page not found",
        "Looks like you're lost",
        "Are you lost?",
        "Welcome to the void",
        "Welcome to the dark side",
        "Welcome to the dark web",
    ];

    return (
        <div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center">
            <div className="text-dark-text flex flex-col items-center justify-center sm:size-full">
                <span className="mb-2 flex items-center justify-center text-center sm:text-xl">
                    {content[Math.floor(Math.random() * content.length)]}
                </span>
                <Link
                    to="/feed"
                    className="bg-dark-secondary rounded-md p-2 duration-300 ease-in-out hover:brightness-90"
                >
                    Back to Civilization
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
