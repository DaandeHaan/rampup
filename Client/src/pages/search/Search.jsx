import React, { useEffect, useState } from "react";
import { updateTitle } from "../../app/redux-reducers/contextProvider";
import { useDispatch } from "react-redux";
import SearchItem from "./SearchItem";
import apiService from "../../logic/apiService";
import { useGetDataQuery } from "../../logic/apiSlice";
function Search() {
    const dispatch = useDispatch();
    const [accounts, setAccounts] = useState([]);
    const [search, setSearch] = useState("");
    const {
        data: accountData,
        isSuccess,
        isLoading,
    } = useGetDataQuery("/account/user");

    useEffect(() => {
        dispatch(updateTitle("Search"));

        apiService.get("/account/all", {}).then((res) => {
            setAccounts(res.result);
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
            {isSuccess &&
                accounts
                    .filter(
                        (account) =>
                            account.accountID !== accountData.accountID && // This filters out your own account.
                            (account.username
                                .toLowerCase()
                                .includes(search.toLowerCase()) || // Allows for searching by username.
                                account.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase())), // Allows for searching by name.
                    )
                    .map((account) => (
                        <SearchItem key={account.accountID} data={account} />
                    ))}
        </div>
    );
}

export default Search;
