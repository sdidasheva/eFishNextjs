import http from "../utils/http";
import { LocalStorageHandler } from "../utils/localStorageHandler";

const getCatalogs = (perPage = 4, page = null) => {
	return http.get(`catalog/list?per_page=${perPage}&page=${page}`, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

const getCatalog = (catalogId: number) => {
	return http.get(`catalog/${catalogId}/entry/list`, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

const createCatalogRow = (id: number, data: any) => {
	return http.post(`catalog/${id}/entry/create`, data, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

const showCatalog = (id: number) => {
	return http.get(`catalog/${id}`, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

const createCatalog = (data: any) => {
	return http.post(`catalog/create`, data, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

const editCatalog = (id: number, data: any) => {
	return http.post(`catalog/{id}`, data, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

export const CatalogService = {
	getCatalogs,
	getCatalog,
	createCatalogRow,
	showCatalog,
	createCatalog,
	editCatalog,
};
