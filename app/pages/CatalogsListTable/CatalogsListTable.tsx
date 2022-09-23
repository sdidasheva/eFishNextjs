import React, { useState, useEffect } from "react";
import { IPagination } from "../../constants/interface";
import { CatalogService } from "../../services/CatalogsService";
import Layout from "../../components/Layout/Layout";
import Select from "react-select";
import Link from "next/link";
import CatalogTable from "../../components/Table/CatalogTable";
// icons
import Search from "../../icons/Search";
import PlusCircle from "../../icons/PlusCircle";
import ArrowPagination from "../../icons/ArrowPagination";
import ArrowLeft from "../../icons/ArrowLeft";
import ArrowRight from "../../icons/ArrowRight";

const CatalogsListTable = () => {
	const [selectedOption, setSelectedOption] = useState(null);
	const [catalogInfo, setCatalogInfo] = useState([]);
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
		"Наименование",
		"Дата создания",
		"Статус",
		"Действия",
	];

	// get data
	useEffect(() => {
		CatalogService.getCatalogs().then((res) => {
			setCatalogInfo(res?.data?.data);
			// console.log(res?.data);
			setPaginationInfo({
				total: res.data.total,
				per_page: res.data.per_page,
				page: res.data.current_page,
				from: res.data.from,
				to: res.data.to,
			});
		});
	}, []);

	// options
	const options = [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
	];

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

	//pagination
	// next page
	const nextPage = () => {
		CatalogService.getCatalogs(
			paginationInfo.per_page,
			paginationInfo.page + 1
		).then((res) => {
			setCatalogInfo(res?.data?.data);
			setPaginationInfo((state) => ({
				...state,
				page: paginationInfo.page + 1,
				from: res?.data?.from,
				to: res?.data?.to,
			}));
		});
	};

	// previous page
	const prevPage = () => {
		CatalogService.getCatalogs(
			paginationInfo.per_page,
			paginationInfo.page - 1
		).then((res) => {
			setCatalogInfo(res?.data?.data);
			setPaginationInfo((state) => ({
				...state,
				page: paginationInfo.page - 1,
				from: res?.data?.from,
				to: res?.data?.to,
			}));
		});
	};

	// change per page
	const handlePerPageChange = (perPageNumber: number) => {
		setPaginationInfo((state) => ({
			...state,
			per_page: perPageNumber,
		}));
		CatalogService.getCatalogs(perPageNumber, 1).then((res) => {
			setCatalogInfo(res?.data?.data);
			setPaginationInfo((state) => ({
				...state,
				from: res?.data?.from,
				to: res?.data?.to,
			}));
		});
	};

	return (
		<Layout>
			<h3 className="title">Управление справочниками</h3>
			<div className="catalogs__inputs">
				<div className="catalogs__inputs-find">
					<div className="catalogs__inputs-find-search">
						<input type="text" placeholder="Поиск по таблице" />
						<Search />
					</div>
					<Select
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						options={options}
						placeholder="Все"
						classNamePrefix="custom-select"
						styles={customStyles}
					/>
				</div>
				<Link href={`/catalog/add`}>
					<button className="catalogs__inputs-button button">
						Создать справочник <PlusCircle />
					</button>
				</Link>
			</div>
			<CatalogTable catalogInfo={catalogInfo} theader={theader} />
			<div className="catalogs__pagination">
				<p>Общее количество дел: {paginationInfo?.total}</p>
				<div
					className="catalogs__pagination-per-page"
					onClick={() => setShowPerPage(!showPerPage)}
				>
					<p>Строк на странице: {paginationInfo?.per_page}</p>
					<ArrowPagination />
					{showPerPage && (
						<ul className="catalogs__pagination-per-page-dropdown">
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
				<div className="catalogs__pagination-navigation">
					<p>
						{paginationInfo.from}-{paginationInfo.to} из {paginationInfo?.total}
					</p>
					<div className="catalogs__pagination-navigation-arrows">
						<button onClick={prevPage} disabled={paginationInfo.page == 1}>
							<ArrowLeft />
						</button>
						<button
							onClick={nextPage}
							disabled={catalogInfo.length < paginationInfo?.per_page}
						>
							<ArrowRight />
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CatalogsListTable;
