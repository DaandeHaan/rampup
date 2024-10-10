import React, { useEffect, useState } from "react";
import { updateTitle } from "../../app/redux-reducers/contextProvider";
import { useDispatch } from "react-redux";
import UserItem from "./UserItem";
import apiService from "../../logic/apiService";

function AdminUsers() {
    const dispatch = useDispatch();
    const [accounts, setAccounts] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(updateTitle("Admin - Users"));

        apiService.get("/admin/users/all", {}).then((res) => {
            setAccounts(res.result);
        });
        apiService.get("/admin/users/permissions", {}).then((res) => {
            setPermissions(res.result);
        });
    }, []);

    return (
        <div className="no-scrollbar flex w-full flex-col sm:overflow-auto">
            <div className="border-dark-primary w-full max-w-3xl border-b px-6 py-3">
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="focus:border-dark-accent border-dark-primary bg-dark-bg h-8 w-full rounded-full border px-2 outline-none focus:border-2"
                />
            </div>
            {accounts
                .filter(
                    (account) =>
                        account.username
                            .toLowerCase()
                            .includes(search.toLowerCase()) || // Allows for searching by username.
                        account.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) || // Allows for searching by name.
                        permissions
                            .find(
                                (permission) =>
                                    permission.permissionID ===
                                    account.permissionID,
                            )
                            ?.name.toLowerCase()
                            .includes(search.toLowerCase()), // Allows for searching by permission.
                )
                .map((account) => (
                    <UserItem
                        key={account.accountID}
                        data={account}
                        permissions={permissions}
                    />
                ))}
        </div>
    );
}

export default AdminUsers;
