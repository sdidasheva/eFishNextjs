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
	const [catalogInfo, setCatalogInfo] = useState<ICatalogAction>();
	const router = useRouter();

	// get catalog
	useEffect(() => {
		CatalogService.showCatalog(id).then((res) => setCatalogInfo(res?.data));
	}, []);

	// submit edited data
	const onSubmit = (data: ICreateCatalog) => {
		const addCatalogData = {
			name: data.name,
			modules: [data.limits],
			columns: [data.name],
		};
		CatalogService.editCatalog(id, addCatalogData);
		// router.push("/catalog");
	};

	return (
		<Wrapper>
			<EditCatalogs
				title="Редактировать справочник"
				onSubmit={onSubmit}
				catalogInfo={catalogInfo}
			/>
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
