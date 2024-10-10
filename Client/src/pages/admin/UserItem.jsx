import React, { useState } from "react";
import apiService from "../../logic/apiService";
import img from "../../assets/images/profilepicture.jpg";
import { useNavigate } from "react-router-dom";
import { useGetDataQuery } from "../../logic/apiSlice";
function UserItem({ data, permissions }) {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [permissionID, setPermissionID] = useState(data.permissionID);

    const {
        data: accountData,
        isSuccess,
    } = useGetDataQuery("/account/user");

    async function handlePermissionChange(permission) {
        setPermissionID(parseInt(permission));

        await apiService.put('/admin/users/permission', {
            accountID: data.accountID,
            permissionID: parseInt(permission)
        }).then((res) => {
            if (res.success)
                setSuccess(true);
        })
    }

    return (
        <div className="border-dark-primary flex h-20 w-full max-w-3xl flex-row items-center justify-between gap-2.5 border-b px-3">
            
            {/* Account Info */}
            <div className="flex flex-row items-center justify-start gap-2">
                <img src={img} className="size-12 rounded-full" />
                <div className="flex h-full flex-col justify-between">
                    <div className="flex w-full flex-row items-center gap-2">
                            <h5 className="text-base font-bold hover:underline" onClick={() => navigate(`/profile/${data.accountID}/posts`)}>@{data.username}</h5>
                            {isSuccess && accountData.accountID === data.accountID ? (
                                <>
                                    <span className="text-sm">&#8226;</span>
                                    <span className="text-sm">you</span>
                                </>
                            ) : null}
                    </div>
                    <p className="text-sm">{data.name}</p>
                </div>
            </div>

            {/* Select dropdown */}
            <select
                value={permissionID}
                onChange={(e) => handlePermissionChange(e.target.value)}
                className={`bg-dark-bg border-dark-primary border rounded-md px-2 py-1 text-sm ${success ? 'border-green-500' : ''}`}
            >
                <option value={undefined} defaultValue disabled>
                    Permissions
                </option>
                {permissions.map((permission) => (
                    <option key={permission.permissionID} value={permission.permissionID}>{permission.name}</option>
                ))}
            </select>
        </div>
    );
}

export default UserItem;