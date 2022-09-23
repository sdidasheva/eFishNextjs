import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { CatalogService } from "../../app/services/CatalogsService";
import { ICatalogAction } from "../../app/constants/interface";
import Wrapper from "../../app/components/Wrapper/Wrapper";
import ShowCatalogItem from "../../app/pages/ShowCatalogItem/ShowCatalogItem";

const ShowCatalog = ({ id }) => {
	const [catalogInfo, setCatalogInfo] = useState<ICatalogAction>();

	// get catalog
	useEffect(() => {
		CatalogService.showCatalog(id).then((res) => setCatalogInfo(res?.data));
	}, []);

	return (
		<Wrapper>
			{catalogInfo && <ShowCatalogItem catalogInfo={catalogInfo} />}
		</Wrapper>
	);
};

export default ShowCatalog;

export const getServerSideProps: GetServerSideProps = async ({
	query,
}: any) => {
	console.log(query);
	const { id } = query;
	return { props: { id } };
};
