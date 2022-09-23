import * as yup from "yup";
export const actionCatalogSchema = yup.object().shape({
	name: yup.string().required("Поле обязательно"),
	columns: yup.string().required("Поле обязательно"),
});
