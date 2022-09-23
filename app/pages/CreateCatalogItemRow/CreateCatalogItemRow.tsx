import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ICatalogItem } from "../../constants/interface";
import { CatalogService } from "../../services/CatalogsService";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
// icon
import ArrowBlue from "../../icons/ArrowRole";
import PlusCircle from "../../icons/PlusCircle";

const CreateCatalogItemRow = ({ id, catalogRow }) => {
	const router = useRouter();
	//useForm
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<ICatalogItem>({
		mode: "onBlur",
	});

	// submit/add data
	const onSubmit = (data: ICatalogItem) => {
		console.log(data);
		const addCatalogRow = {
			values: [{ columnId: data.value }],
		};
		CatalogService.createCatalogRow(id, addCatalogRow); //!How to send data
		// router.push("/catalog");
	};
	return (
		<Layout>
			<div className="title__container">
				<Link href={`/catalog/${id}/entry/list`}>
					<a>
						<ArrowBlue />
					</a>
				</Link>
				<h3 className="title">Добавление данных</h3>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="catalogs-row__form form"
			>
				{catalogRow &&
					catalogRow.map((label: ICatalogItem) => (
						<div className="catalogs-row__form-wrapper">
							<div className="form-labels col-3">
								<label className="label">{label?.column?.name}</label>
							</div>
							<div className="form__inputs col-5">
								<input
									type="text"
									className="input"
									//@ts-ignore
									{...register(`value.${label?.column?.id}`, {
										required: "Поле обязательно",
									})}
								/>
								<p className="catalogs-row__error">
									{errors.value?.[label?.column?.id]?.message}
								</p>
							</div>
						</div>
					))}

				<div className="d-flex flex-row">
					<div className="col-3"></div>
					<button type="submit" className="catalogs-row__button button">
						Добавить <PlusCircle />
					</button>
				</div>
			</form>
		</Layout>
	);
};

export default CreateCatalogItemRow;
