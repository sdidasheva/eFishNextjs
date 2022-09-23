export class LocalStorageHandler {
	public static setUserToken=(token: string)=>{
		localStorage.setItem("authToken", token)
	}
	public static getUserToken=()=>{
		const token = localStorage.getItem("authToken");
		return token ?? null
	}
	public static clearUserToken=()=>{
		localStorage.removeItem("authToken")
	}
}