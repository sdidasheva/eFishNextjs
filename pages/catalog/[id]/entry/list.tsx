import React from "react";
import { GetServerSideProps } from "next";
import Wrapper from "../../../../app/components/Wrapper/Wrapper";
import CatalogItem from "../../../../app/pages/CatalogItem/CatalogItem";

const Catalog = ({ id }) => {
	return (
		<Wrapper>
			<CatalogItem id={id} />
		</Wrapper>
	);
};

export default Catalog;

export const getServerSideProps: GetServerSideProps = async ({
	query,
}: any) => {
	console.log(query);
	const { id } = query;
	return { props: { id } };
};
