import React, { useEffect } from "react";
import useFetch from "../../hooks/asyncAction";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";

const RefreshToken = () => {
	const [{ response, isLoading, error }, doFetch] = useFetch();
	const history = useHistory();

	const refreshToken = () => {
		const user = JSON.parse(window.localStorage.getItem("user"));
		window.localStorage.setItem(
			"user",
			JSON.stringify({ ...user, token: user.refresh }),
		);

		doFetch({
			url: "login/refresh",
			method: "POST",
		});
	};

	useEffect(() => {
		refreshToken();
	}, []);

	useEffect(() => {
		if (response) {
			localStorage.setItem("user", JSON.stringify(response));
			history.goBack();
		}
	}, [response]);

	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100vh",
				flexDirection: "column",
				justifyContent: "center",
				alignContent: "center",
			}}
		>
			<Spin />
		</div>
	);
};

export default RefreshToken;
