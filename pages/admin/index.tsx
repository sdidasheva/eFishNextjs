import React from "react";
import Wrapper from "../../app/components/Wrapper/Wrapper";
import withRequiredAuth from "../../app/hoc/withRequiredAuth";
import UsersListTable from "../../app/pages/UsersListTable/UsersListTable";

const Admin = () => {
	return (
		<>
			<Wrapper>
				<UsersListTable />
			</Wrapper>
		</>
	);
};

export default Admin;
