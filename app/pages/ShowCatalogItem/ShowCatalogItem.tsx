import React from "react";
import { ICatalogAction } from "../../constants/interface";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
// icons
import ArrowBlue from "../../icons/ArrowRole";

const ShowCatalogItem = ({ catalogInfo }) => {
	return (
		<Layout>
			<div className="title__container">
				<Link href={`/catalog`}>
					<a>
						<ArrowBlue />
					</a>
				</Link>
				<h3 className="title">Справочник</h3>
			</div>
			<form className="form">
				<div className="form__column">
					<label className="label col-3">Название</label>
					<div className="form__input col-5">
						<input
							type="text"
							className="input"
							disabled={true}
							value={catalogInfo.name}
						/>
					</div>
				</div>
				<div className="form__column">
					<label className="label col-3">Столбцы в таблице</label>
					<div className="form__input col-5">
						{catalogInfo &&
							catalogInfo?.columns.map((column: ICatalogAction) => (
								<input
									type="text"
									className="input"
									disabled={true}
									value={column.name}
								/>
							))}
					</div>
				</div>
				<div className="form__column">
					<label className="label col-3">Использовать</label>
					<div className="form__limits col-5">
						{catalogInfo &&
							catalogInfo.modules.map((limit: any) => (
								<label className=" checkbox">
									{limit}
									<input
										className="checkbox__input"
										type="checkbox"
										checked={limit ? true : false}
									/>
									<span className="checkbox__checkmark"></span>
								</label>
							))}
					</div>
				</div>
				<div className="form__column">
					<div className="col-3"></div>
					<div className="form__role col-5">
						<label className="label">Роль</label>
						<div className="form__role-collection">
							{catalogInfo &&
								catalogInfo?.roles.map((role: ICatalogAction) => (
									<button className="form__role-button">
										{role.description}
									</button>
								))}
						</div>
					</div>
				</div>
			</form>
		</Layout>
	);
};

export default ShowCatalogItem;
