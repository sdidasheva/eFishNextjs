import http from "../utils/http";
import { LocalStorageHandler } from "../utils/localStorageHandler";

const getAccessToken = (data) => {
	return http.post(`login`, data)
};

const getCurrentUser = () => {
	return http.get(`user`, {headers: {
		"Authorization": `Bearer ${LocalStorageHandler.getUserToken()}`
	}})
}

export const AuthService = {
	getAccessToken,
	getCurrentUser
}