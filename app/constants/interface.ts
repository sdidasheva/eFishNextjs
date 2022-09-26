export interface ILoginData {
	email: string;
	password: string;
}

export interface IPagination {
	total: number;
	per_page: number;
	page: number;
	from: number;
	to: number;
}

export interface IUserInfo {
	description: string,
	first_name: string;
	last_name: string;
	middle_name: string;
	email: string;
	iin_bin: number;
	password: string;
	repeat_password: string;
	role_id: string;
}

export interface ICatalogsList {
	id: number,
	name: string,
	created_at: Date,
	status: string
}


export interface ICreateCatalog {
	id: number,
	name: string,
	columns: any,
	column: any,
	columnItem: any,
	limits:any,
	roles:string
	modules: any,
}

export interface ICatalogItem {
	id: number,
  value: string,
	label: any,
	column: any,
	columns: any,
	name: string
	columnId: number
	column_id: any,
	values: any
	data:any
}

export interface ICatalogAction{
	modules: any;
	id: number,
	name: string,
	description: string,
	label: string,
	limits: any
}