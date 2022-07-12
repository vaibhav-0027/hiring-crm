import axios from 'axios';
import { clearUserInfo, getUserAccessToken } from './localStorageHandler';

const defaultHeaders = {
	'Content-Type': 'application/json',
};

const LOCAL_SERVER_URL = process.env.REACT_APP_LOCAL_SERVER_URL;

let headers = { ...defaultHeaders };
const dash_api = axios.create({
	baseURL: LOCAL_SERVER_URL,
	headers
});

dash_api.interceptors.request.use(
	async (config) => {
		const token = await getUserAccessToken();

		if (token) {
			if (config.headers !== undefined) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

dash_api.interceptors.response.use(
	response => {
		return response;
	},
	async (error) => {
		if (error.response?.status === 401 && await getUserAccessToken()) {
			clearUserInfo();
		}
		return error;
	}
);

export default dash_api;