import React, { useEffect, useState } from "react";
import { CatalogService } from "../../../../app/services/CatalogsService";
import { GetServerSideProps } from "next";
import Wrapper from "../../../../app/components/Wrapper/Wrapper";
import CreateCatalogItemRow from "../../../../app/pages/CreateCatalogItemRow/CreateCatalogItemRow";

const create = ({ id }) => {
	const [catalogRow, setCatalogRow] = useState();
	useEffect(() => {
		CatalogService.getCatalog(id).then((res) => {
			setCatalogRow(res?.data?.data[0]?.values);
		});
	}, []);

	return (
		<Wrapper>
			<CreateCatalogItemRow id={id} catalogRow={catalogRow} />
		</Wrapper>
	);
};

export default create;

export const getServerSideProps: GetServerSideProps = async ({
	query,
}: any) => {
	console.log(query);
	const { id } = query;
	return { props: { id } };
};
