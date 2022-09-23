import React, { useState, useEffect } from "react";
import { CatalogService } from "../../services/CatalogsService";
import { ICatalogItem, IPagination } from "../../constants/interface";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import CatalogItemTable from "../../components/Table/CatalogItemTable";
// icons
import ArrowBlue from "../../icons/ArrowRole";
import Search from "../../icons/Search";
import PlusCircle from "../../icons/PlusCircle";
import ArrowPagination from "../../icons/ArrowPagination";
import ArrowLeft from "../../icons/ArrowLeft";
import ArrowRight from "../../icons/ArrowRight";

const CatalogItem = ({ id }) => {
	const [catalogItem, setCatalogItem] = useState<ICatalogItem>();
	const [paginationInfo, setPaginationInfo] = useState<IPagination>({
		total: 0,
		per_page: 4,
		page: 1,
		from: 1,
		to: 4,
	});
	const [showPerPage, setShowPerPage] = useState(false);

	// get data for single catalog
	useEffect(() => {
		CatalogService.getCatalog(id).then((res) => {
			setCatalogItem(res?.data);
			setPaginationInfo({
				total: res.data.total,
				per_page: res.data.per_page,
				page: res.data.current_page,
				from: res.data.from,
				to: res.data.to,
			});
		});
	}, []);

	//pagination
	// next page
	const nextPage = () => {
		CatalogService.getCatalogs(
			paginationInfo.per_page,
			paginationInfo.page + 1
		).then((res) => {
			setCatalogItem(res?.data?.data);
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
			setCatalogItem(res?.data?.data);
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
			setCatalogItem(res?.data?.data);
			setPaginationInfo((state) => ({
				...state,
				from: res?.data?.from,
				to: res?.data?.to,
			}));
		});
	};

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
			<div className="catalogs__inputs">
				<div className="catalogs__inputs-find">
					<div className="catalogs__inputs-find-search">
						<input type="text" placeholder="Поиск справочника" />
						<Search />
					</div>
				</div>
				<Link href={`/catalog/${id}/entry/create`}>
					<button className="catalogs__inputs-button button">
						Добавить <PlusCircle />
					</button>
				</Link>
			</div>
			{catalogItem && <CatalogItemTable catalogItem={catalogItem} />}
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
							disabled={catalogItem?.data?.length <= paginationInfo?.per_page}
						>
							<ArrowRight />
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CatalogItem;
