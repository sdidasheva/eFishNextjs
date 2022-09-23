import http from "../utils/http";
import { LocalStorageHandler } from "../utils/localStorageHandler";

const getUsers = (perPage = 4, page = null) => {
	return http.get(`user/list?per_page=${perPage}&page=${page}`, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

const getRoles = () => {
	return http.get(`user/role/list`, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

const getUser = (id: number) => {
	return http.get(`user/${id}`, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

const createUser = (data: any) => {
	return http.post(`user/create`, data, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

const editUser = (id: number, data: any) => {
	return http.post(`user/${id}`, data, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

const deleteUser = (id: number) => {
	return http.post(`user/${id}/deactivate`, {
		headers: {
			Authorization: `Bearer ${LocalStorageHandler.getUserToken()}`,
		},
	});
};

export const UsersService = {
	getUsers,
	getRoles,
	getUser,
	createUser,
	editUser,
	deleteUser,
};
