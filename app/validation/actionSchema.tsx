import * as yup from "yup";
export const actionSchema = yup.object().shape({
	role_id: yup.string().required("Поле обязательно"),
	email: yup
		.string()
		.required("Поле обязательно")
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, "Email не корректен"),
	password: yup
		.string()
		.required("Поле обязательно")
		.min(8, "Минимум 8 символов"),
	repeat_password: yup
		.string()
		.required("Поле обязательно")
		.oneOf([yup.ref("password"), null], "Пароль должен совпадать"),
	first_name: yup.string().required("Поле обязательно"),
	last_name: yup.string().required("Поле обязательно"),
	iin_bin: yup
		.string()
		.required("Поле обязательно")
		.length(12, "Обязательно 12 цифр"),
});
