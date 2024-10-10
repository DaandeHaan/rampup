import React, { useEffect } from "react";
import { updateTitle } from "../app/redux-reducers/contextProvider";
import { useDispatch } from "react-redux";

function Messages() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateTitle("Messages"));
	}, []);

	return <div>Messages</div>;
}

export default Messages;
