import React, { useState, useEffect } from "react";
import "../app/styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { AuthContext } from "../app/context/AuthContext";
import { LocalStorageHandler } from "../app/utils/localStorageHandler";
import { AuthService } from "../app/services/AuthService";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

export default function MyApp({ Component, pageProps }: AppProps) {
	const [userInfo, setUserInfo] = useState();
	const updateUserInfo = (userInfo: any) => {
		setUserInfo(userInfo);
	};
	const router = useRouter();

	useEffect(() => {
		const userToken = LocalStorageHandler.getUserToken();
		if (userToken) {
			AuthService.getCurrentUser()
				.then((res) => {
					setUserInfo(res.data);
				})
				.catch((err) => {
					LocalStorageHandler.clearUserToken();
					router.push("/login");
				});
		}
	}, []);

	return (
		<AuthContext.Provider value={{ userInfo, updateUserInfo }}>
			<Component {...pageProps} />
		</AuthContext.Provider>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			cookies: context.req.cookies ?? "",
		},
	};
};
