import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";

const withRequiredAuth: any = (Component: any) => {
	const AuthenticationComponent = () => {
		const router = useRouter();
		const { userInfo, updateUserInfo } = useAuthContext();

		useEffect(() => {
			// const time = setTimeout(() => {
			if (!userInfo) {
				router.push("/login");
			}
			// }, 1000);
			// return () => {
			// 	clearTimeout(time);
			// };
		}, [userInfo]);

		return !!userInfo ? <Component userInfo={userInfo} /> : null;
	};

	return AuthenticationComponent;
};

export default withRequiredAuth;

// HOC
