import * as yup from "yup";
export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.required("Поле обязательно")
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, "Email не корректен"),
	password: yup
		.string()
		.required("Поле обязательно")
		.min(8, "Минимум 8 символов"),
});
