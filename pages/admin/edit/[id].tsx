import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { UsersService } from "../../../app/services/UsersService";
import { IUserInfo } from "../../../app/constants/interface";
import { useRouter } from "next/router";
import Wrapper from "../../../app/components/Wrapper/Wrapper";
import Layout from "../../../app/components/Layout/Layout";
import ActionForm from "../../../app/components/ActionForm/ActionForm";

const Edit = ({ id }: any) => {
	const [userInfo, setUserInfo] = useState<IUserInfo>();
	const router = useRouter();
	// get user
	useEffect(() => {
		UsersService.getUser(id).then((res) => setUserInfo(res?.data));
	}, []);

	// submit edited data
	const onSubmit = (data: IUserInfo) => {
		console.log(data);
		const editData = {
			first_name: data.first_name,
			last_name: data.last_name,
			middle_name: data.middle_name,
			email: data.email,
			iin_bin: data.iin_bin,
			password: data.password,
			role_id: data.role_id,
		};
		UsersService.editUser(id, editData);
		router.push("/admin");
	};
	return (
		<Wrapper>
			<Layout>
				{userInfo && (
					<ActionForm
						userInfo={userInfo}
						onSubmit={onSubmit}
						title={"Редактирование пользователя"}
					/>
				)}
			</Layout>
		</Wrapper>
	);
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async ({
	query,
}: any) => {
	console.log(query);
	const { id } = query;
	return { props: { id } };
};
