import apiService from "../logic/apiService"
import React, { useEffect, useState } from "react"
import { useGetDataQuery } from "../logic/apiSlice"
export default function FollowButton({ account, setFollowers }) {
    const {
        data: accountData,
        isSuccess,
        isLoading,
    } = useGetDataQuery("/account/user");

    const [following, setFollowing] = useState()

    async function handleFollow() {
        // Follow or unfollow the account
        const res = await apiService.post("/follow", { followingId: account.accountID })
        // account.followers = account.followers.push(accountData.accountID)
        setFollowing(res.following)
        if (res.following)
            setFollowers((prev) => prev + 1)
        else
            setFollowers((prev) => prev - 1)
    }

    useEffect(() => {
        // Check if account is empty obj
        if (isSuccess && Object.keys(account).length > 0) {
            setFollowing(account.followers.includes(accountData.accountID))
        }
    }, [account, accountData])

    return (
        <button
        onClick={() => handleFollow()}
        className={`px-2 py-1 rounded text-sm ${following ? "text-dark-secondary border-dark-secondary border font-bold" : "text-dark-primary bg-dark-secondary border-none font-normal"}`}
        >
            {following ? "Following" : "Follow"}
        </button>
    )
}