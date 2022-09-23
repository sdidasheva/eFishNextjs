import React, { useState } from "react";
import { UsersService } from "../../services/UsersService";
import Link from "next/link";
import Modal from "../Modal/Modal";
import Moment from "react-moment";
// icons
import BarChart from "../../icons/BarChart";
import EyeTable from "../../icons/EyeTable";
import Edit from "../../icons/Edit";
import Delete from "../../icons/Delete";
const UsersTable = ({ data, theader }: any) => {
	const [isModalOpened, setIsModalOpened] = useState(false);
	const [id, setId] = useState();

	// change status
	data.map((row: any) => {
		switch (row.role.status) {
			case "active":
				row.role.status = "Активный";
				break;
			case "inactive":
				row.role.status = "Неактивный";
				break;
			case "blocked":
				row.role.status = "Заблокирована";
				break;
		}
	});

	// post delete
	const handleDelete = (id: number) => {
		UsersService.deleteUser(id).then((res) => setIsModalOpened(false));
	};

	// click delete
	const handleClick = (row: any) => {
		setId(row.id);
		setIsModalOpened(true);
	};

	return (
		<>
			<table className="table">
				<thead>
					<tr>{theader && theader.map((head: any) => <th>{head}</th>)}</tr>
				</thead>
				<tbody>
					{data &&
						data.map((row: any) => (
							<tr>
								<td>{row.id}</td>
								<td>
									{row.first_name} {row.last_name} {row.middle_name}
								</td>
								<td className="users-table__table-barchart">
									<BarChart />
								</td>
								<td>
									<Moment format="DD.MM.YYYY">{row.created_at}</Moment>
								</td>
								<td>{row.role.description}</td>
								<td
									className={
										row.role.status === "Активный"
											? "users-table__table-active"
											: row.role.status === "Неактивный"
											? "users-table__table-inactive"
											: "users-table__table-blocked"
									}
								>
									{row.role.status}
								</td>
								<td>
									<Link href={`/admin/${row.id}`}>
										<a className="users-table__table-action-tooltip">
											<p className="users-table__table-action-tooltip-text">
												Посмотреть
											</p>
											<EyeTable />
										</a>
									</Link>
									&nbsp;&nbsp;
									<Link href={`/admin/edit/${row.id}`}>
										<a className="users-table__table-action-tooltip">
											<p className="users-table__table-action-tooltip-text">
												Изменить
											</p>
											<Edit />
										</a>
									</Link>
									&nbsp;&nbsp;
									<a
										className="users-table__table-action-tooltip"
										onClick={() => {
											handleClick(row);
										}}
									>
										<p className="users-table__table-action-tooltip-text">
											Удалить
										</p>
										<Delete />
									</a>
									<Modal
										isOpened={isModalOpened}
										onClose={() => setIsModalOpened(false)}
									>
										<div className="delete__modal">
											<h6 className="delete__modal-content">
												Вы уверены что хотите удалить пользователя?
											</h6>
											<div className="delete__modal-buttons">
												<button
													onClick={() => handleDelete(id)}
													className="delete__modal-buttons-delete"
												>
													Удалить
												</button>
												<button
													className="delete__modal-buttons-cancel"
													onClick={() => setIsModalOpened(false)}
												>
													Отмена
												</button>
											</div>
										</div>
									</Modal>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</>
	);
};

export default UsersTable;
