import React from "react";
import { UsersService } from "../../../app/services/UsersService";
import { IUserInfo } from "../../../app/constants/interface";
import { useRouter } from "next/router";
import Wrapper from "../../../app/components/Wrapper/Wrapper";
import Layout from "../../../app/components/Layout/Layout";
import ActionForm from "../../../app/components/ActionForm/ActionForm";

const Add = () => {
	const router = useRouter();
	// submit/add data
	const onSubmit = (data: IUserInfo) => {
		// console.log(data);
		const addData = {
			first_name: data.first_name,
			last_name: data.last_name,
			middle_name: data.middle_name,
			email: data.email,
			iin_bin: data.iin_bin,
			password: data.password,
			role_id: data.role_id,
		};
		UsersService.createUser(addData);
		router.push("/admin");
	};

	return (
		<Wrapper>
			<Layout>
				<ActionForm
					onSubmit={onSubmit}
					title={"Добавление пользователя"}
					userInfo={undefined}
				/>
			</Layout>
		</Wrapper>
	);
};

export default Add;
