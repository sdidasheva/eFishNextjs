import React, { useState } from "react";
import { ICatalogItem } from "../../constants/interface";

const CatalogItemTable = ({ catalogItem }) => {
	const [header, setHeader] = useState(catalogItem?.data[0]?.values);

	// get info for each row
	let rows = catalogItem?.data.map((values: any) => values);
	let row = rows.map((a: any) => a);

	return (
		<table className="table">
			<thead>
				<tr>
					<th>ID</th>
					{header &&
						header.map((head: ICatalogItem) => <th>{head?.column.name}</th>)}
				</tr>
			</thead>
			<tbody>
				{row?.map((body: ICatalogItem) => (
					<tr>
						<td>{body.id}</td>
						{body?.values?.map((value: any) => (
							<td>{value.value}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default CatalogItemTable;
