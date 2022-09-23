import React, { useState, useEffect } from "react";
import { UsersService } from "../../app/services/UsersService";
import { GetServerSideProps } from "next";
import { IUserInfo } from "../../app/constants/interface";
import Wrapper from "../../app/components/Wrapper/Wrapper";
import Layout from "../../app/components/Layout/Layout";
import ShowUser from "../../app/pages/ShowUser/ShowUser";

const Show = ({ id }) => {
	const [userInfo, setUserInfo] = useState<IUserInfo>();

	// get user
	useEffect(() => {
		UsersService.getUser(id).then((res) => setUserInfo(res?.data));
	}, []);
	// console.log(userInfo);

	return (
		<Wrapper>
			<Layout>{userInfo && <ShowUser userInfo={userInfo} />}</Layout>
		</Wrapper>
	);
};

export default Show;

export const getServerSideProps: GetServerSideProps = async ({
	query,
}: any) => {
	console.log(query);
	const { id } = query;
	return { props: { id } };
};
