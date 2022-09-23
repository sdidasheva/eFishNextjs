import React, { useEffect, useState } from "react";
import { UsersService } from "../../services/UsersService";
import { IPagination } from "../../constants/interface";
import UsersTable from "../../components/Table/UsersTable";
import Select from "react-select";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";

// icons
import Search from "../../icons/Search";
import PlusCircle from "../../icons/PlusCircle";
import ArrowPagination from "../../icons/ArrowPagination";
import ArrowLeft from "../../icons/ArrowLeft";
import ArrowRight from "../../icons/ArrowRight";

const UsersListTable = () => {
	const [tableInfo, setTableInfo] = useState([]);
	const [roles, setRoles] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const [paginationInfo, setPaginationInfo] = useState<IPagination>({
		total: 0,
		per_page: 4,
		page: 1,
		from: 1,
		to: 4,
	});
	const [showPerPage, setShowPerPage] = useState(false);
	const theader: any = [
		"ID",
		"ФИО",
		"Мониторинг действий",
		"Дата регистрации",
		"Роль",
		"Статус",
		"действия",
	];

	// get data
	useEffect(() => {
		UsersService.getUsers().then((res) => {
			setTableInfo(res?.data?.data);
			setPaginationInfo({
				total: res.data.total,
				per_page: res.data.per_page,
				page: res.data.current_page,
				from: res.data.from,
				to: res.data.to,
			});
		});
		UsersService.getRoles().then((res) => setRoles(res?.data));
	}, []);

	// get options for select
	const options = roles.map((role) => {
		return { value: role.id, label: role.description };
	});

	// react-select style
	const customStyles = {
		option: (styles: any, { isFocused, isSelected }) => {
			return {
				...styles,
				backgroundColor: isFocused || isSelected ? "#52A5FC" : null,
				color: isFocused || isSelected ? "#FFF" : "#0A091D",
			};
		},
	};

	// pagination

	const nextPage = () => {
		UsersService.getUsers(
			paginationInfo.per_page,
			paginationInfo.page + 1
		).then((res) => {
			setTableInfo(res?.data?.data);
			setPaginationInfo((state) => ({
				...state,
				page: paginationInfo.page + 1,
				from: res?.data?.from,
				to: res?.data?.to,
			}));
		});
	};

	const prevPage = () => {
		UsersService.getUsers(
			paginationInfo.per_page,
			paginationInfo.page - 1
		).then((res) => {
			setTableInfo(res?.data?.data);
			setPaginationInfo((state) => ({
				...state,
				page: paginationInfo.page - 1,
				from: res?.data?.from,
				to: res?.data?.to,
			}));
		});
	};

	const handlePerPageChange = (perPageNumber: number) => {
		setPaginationInfo((state) => ({
			...state,
			per_page: perPageNumber,
		}));
		UsersService.getUsers(perPageNumber, 1).then((res) => {
			setTableInfo(res?.data?.data);
			setPaginationInfo((state) => ({
				...state,
				from: res?.data?.from,
				to: res?.data?.to,
			}));
		});
	};

	return (
		<Layout>
			<h3 className="title">Управление пользователями</h3>
			<div className="users-table__inputs">
				<div className="users-table__inputs-find">
					<div className="users-table__inputs-find-search">
						<input type="text" placeholder="Поиск пользователя" />
						<Search />
					</div>
					<Select
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						options={options}
						placeholder="Роль"
						classNamePrefix="custom-select"
						styles={customStyles}
					/>
				</div>
				<Link href={`/admin/add`}>
					<button className="users-table__inputs-button button">
						Создать нового пользователя <PlusCircle />
					</button>
				</Link>
			</div>
			<UsersTable data={tableInfo} theader={theader} />
			<div className="users-table__pagination">
				<p>Общее количество дел: {paginationInfo?.total}</p>
				<div
					className="users-table__pagination-per-page"
					onClick={() => setShowPerPage(!showPerPage)}
				>
					<p>Строк на странице: {paginationInfo?.per_page}</p>
					<ArrowPagination />
					{showPerPage && (
						<ul className="users-table__pagination-per-page-dropdown">
							<li onClick={() => handlePerPageChange(4)}>
								Строк на странице 4
							</li>
							<li onClick={() => handlePerPageChange(8)}>
								Строк на странице 8
							</li>
							<li onClick={() => handlePerPageChange(12)}>
								Строк на странице 12
							</li>
						</ul>
					)}
				</div>
				<div className="users-table__pagination-navigation">
					<p>
						{paginationInfo.from}-{paginationInfo.to} из {paginationInfo?.total}
					</p>
					<div className="users-table__pagination-navigation-arrows">
						<button onClick={prevPage} disabled={paginationInfo.page == 1}>
							<ArrowLeft />
						</button>
						<button
							onClick={nextPage}
							disabled={tableInfo.length < paginationInfo?.per_page}
						>
							<ArrowRight />
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default UsersListTable;
