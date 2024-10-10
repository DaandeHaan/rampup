import React, { useEffect } from "react";
import { updateTitle } from "../app/redux-reducers/contextProvider";
import { useDispatch } from "react-redux";

function Notifications() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateTitle("Notifications"));
	}, []);

	return <div>Notifications</div>;
}

export default Notifications;
