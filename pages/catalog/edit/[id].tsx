import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { CatalogService } from "../../../app/services/CatalogsService";
import {
	ICreateCatalog,
	ICatalogAction,
} from "../../../app/constants/interface";
import { useRouter } from "next/router";
import EditCatalogs from "../../../app/components/EditCatalogs/EditCatalogs";
import Wrapper from "../../../app/components/Wrapper/Wrapper";

const EditCatalog = ({ id }: any) => {
	return (
		<Wrapper>
			<EditCatalogs id={id} />
		</Wrapper>
	);
};

export default EditCatalog;

export const getServerSideProps: GetServerSideProps = async ({
	query,
}: any) => {
	console.log(query);
	const { id } = query;
	return { props: { id } };
};
