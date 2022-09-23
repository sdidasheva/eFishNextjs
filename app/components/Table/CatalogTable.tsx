import React from "react";
import { ICatalogsList } from "../../constants/interface";
import Moment from "react-moment";
import Link from "next/link";

// icons
import EyeTable from "../../icons/EyeTable";
import Edit from "../../icons/Edit";
import Clipboard from "../../icons/Clipboard";

const CatalogTable = ({ catalogInfo, theader }: any) => {
	// change status
	catalogInfo?.map((row: any) => {
		switch (row.status) {
			case "active":
				row.status = "Активный";
				break;
			case "inactive":
				row.status = "Неактивный";
				break;
			case "blocked":
				row.status = "Заблокирована";
				break;
		}
	});
	return (
		<>
			<table className="table">
				<thead>
					<tr>{theader && theader.map((head: any) => <th>{head}</th>)}</tr>
				</thead>
				<tbody>
					{catalogInfo &&
						catalogInfo.map((row: ICatalogsList) => (
							<tr>
								<td>{row.id}</td>
								<td>{row.name}</td>
								<td>
									<Moment format="DD.MM.YYYY">{row.created_at}</Moment>
								</td>
								<td>{row.status}</td>
								<td className="catalogs__actions">
									<Link href={`/catalog/${row.id}/entry/list`}>
										<a className="catalogs__tooltip">
											<p className="catalogs__tooltip-text">Справочник</p>
											<Clipboard />
										</a>
									</Link>
									<Link href={`/catalog/${row.id}`}>
										<a className="catalogs__tooltip">
											<p className="catalogs__tooltip-text">Посмотреть</p>
											<EyeTable />
										</a>
									</Link>
									<Link href={`/catalog/edit/${row.id}`}>
										<a className="catalogs__tooltip">
											<p className="catalogs__tooltip-text">Редактировать</p>
											<Edit />
										</a>
									</Link>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</>
	);
};

export default CatalogTable;
