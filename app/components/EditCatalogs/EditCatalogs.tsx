import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actionCatalogSchema } from "../../validation/actionCatalogSchema";
import { ICreateCatalog } from "../../constants/interface";
import { UsersService } from "../../services/UsersService";
import Modal from "../Modal/Modal";
import Layout from "../Layout/Layout";
import Link from "next/link";
// icons
import ArrowBlue from "../../icons/ArrowRole";
import PlusCircleBlue from "../../icons/PlusCircleBlue";
import PlusCircle from "../../icons/PlusCircle";
import MinusCircle from "../../icons/MinusCircle";

const EditCatalogs = ({ title, onSubmit, catalogInfo }) => {
	const [columns, setColumns] = useState([{ column: "" }]);
	const [roles, setRoles] = useState([]);
	const [catalogRoles, setCatalogRoles] = useState([]);
	const [isModalOpened, setIsModalOpened] = useState(false);
	const [chosenRole, setChosenRole] = useState<Boolean>(false);
	const limitsLabel = [
		"Лимиты верхняя строка",
		"Лимиты левая колонка",
		"Пользователи",
		"Реестр данных",
		"Электронный промысловый журнал",
		"Отчеты",
	];
	//useForm
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<ICreateCatalog>({
		mode: "onBlur",
		resolver: yupResolver(actionCatalogSchema),
	});

	// get roles
	useEffect(() => {
		UsersService.getRoles().then((res) => setRoles(res?.data));
	}, []);

	// handleChangeInput
	const handleColumnsChange = (e: any, index: number) => {
		// let newColumns = [...columns];
		// newColumns[index][e.target.name] = e.targer.value;
		// setColumns(newColumns);
		const { name, value } = e.target;
		const list = [...columns];
		list[index][name] = value;
		setColumns(list);
	};

	// add button
	const handleColumnAdd = () => {
		setColumns([...columns, { column: "" }]);
	};

	// remove button
	const handleColumnRemove = (index: number) => {
		const list = [...columns];
		list.splice(index, 1);
		setColumns(list);
	};
	console.log(columns);

	// modal: style chosen roles
	const handleClickRole = (roleDescription: string) => {
		setChosenRole((prevState) => ({
			...chosenRole,
			[roleDescription]: !prevState[roleDescription],
		}));
	};

	// push choosen roles
	const handleClickCatalogRoles = () => {
		if (Object.values(chosenRole)) {
			const keys = Object.keys(chosenRole);
			setCatalogRoles(keys.filter((key) => chosenRole[key]));
		}
		setIsModalOpened(false);
	};

	// remove chosen roles
	const handleRemoveRole = (roleDescription: string) => {
		// setChosenRole({ ...chosenRole, [roleDescription]: false });
		// if (Object.values(chosenRole)) {
		// 	const keys = Object.keys(chosenRole);
		// 	setCatalogRoles(keys.filter((key) => chosenRole[key]));
		// }
	};
	// console.log(catalogInfo);

	return (
		<Layout>
			<div className="title__container">
				<Link href={`/catalog`}>
					<a>
						<ArrowBlue />
					</a>
				</Link>
				<h3 className="title">{title}</h3>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="form">
				{/* Поле название */}
				<div className="form__column">
					<label className="label col-3">Название</label>
					<div className="form__input col-5">
						<input
							type="text"
							className="input"
							{...register("name")}
							placeholder="Название"
							defaultValue={catalogInfo.name}
						/>
						{/* <p className="form__input-error">{errors?.name?.message}</p> */}
					</div>
				</div>
				{/* Поле столбцы */}
				<div className="form__column">
					<label className="label col-3">Столбцы в таблице</label>
					<div className="form__input col-5">
						{columns &&
							columns?.map((column: ICreateCatalog, index) => (
								<div className="d-flex w-100" key={index}>
									<input
										name="column"
										type="text"
										className="input"
										value={column.column}
										onChange={(e) => handleColumnsChange(e, index)}
										{...register("columns")}
										placeholder="Доп.поле"
									/>
									{columns.length - 1 === index && (
										<a className="action__tooltip">
											<p className="action__tooltip-text">Добавить поле</p>
											<i
												className="form__input-icon"
												onClick={() => handleColumnAdd()}
											>
												<PlusCircleBlue />
											</i>
										</a>
									)}
									{columns.length !== 1 && (
										<a className="action__tooltip">
											<p className="action__tooltip-text">Удалить поле</p>
											<i
												className="form__input-icon form__input-icon-remove"
												onClick={() => handleColumnRemove(index)}
											>
												<MinusCircle />
											</i>
										</a>
									)}
									{/* <p className="form-inputs-content-error">{errors?.name?.message}</p> */}
								</div>
							))}
					</div>
				</div>
				{/* Поле лимиты - модули */}
				<div className="form__column">
					<label className="label col-3">Использовать</label>
					<div className="form__limits col-5">
						{limitsLabel &&
							limitsLabel.map((label) => (
								<label className=" checkbox">
									{label}
									<input
										className="checkbox__input"
										type="checkbox"
										{...register(`modules`)}
									/>
									<span className="checkbox__checkmark"></span>
								</label>
							))}
					</div>
				</div>
				{/* Поле роли */}
				<div className="form__column">
					<div className="col-3"></div>
					<div className="form__role col-5">
						<label className="label" onClick={() => setIsModalOpened(true)}>
							Роль <PlusCircleBlue />
						</label>
						<div className="form__role-collection">
							{catalogRoles &&
								catalogRoles.map((role) => (
									<button className="form__role-button " {...register(`roles`)}>
										{role}
										<i onClick={() => handleRemoveRole(role.description)}>
											<PlusCircle />
										</i>
									</button>
								))}
						</div>
					</div>
					{/* Модальное окно */}
					<Modal
						isOpened={isModalOpened}
						onClose={() => setIsModalOpened(false)}
					>
						<div className="roles">
							<h6 className="roles__title">Выбрать роль</h6>
							<div className="roles__list">
								{roles &&
									roles.map((role) => (
										<button
											className={`roles__list-role button ${
												chosenRole[`${role.description}`]
													? "roles__list-role-chosen"
													: ""
											}`}
											onClick={() => handleClickRole(role.description)}
										>
											{catalogInfo
												? catalogInfo?.roles.map(
														(roles: any) => roles.description
												  )
												: role.description}
										</button>
									))}
							</div>
							<div className="roles__buttons">
								<button
									className="button roles__buttons-save"
									onClick={handleClickCatalogRoles}
								>
									Сохранить
								</button>
								<button
									className="button roles__buttons-close"
									onClick={() => setIsModalOpened(false)}
								>
									Закрыть
								</button>
							</div>
						</div>
					</Modal>
				</div>
				{/* Кнопка сохранить */}
				<div className="form__column">
					<div className="col-3"></div>
					<button type="submit" className="button action__button">
						Сохранить
					</button>
				</div>
			</form>
		</Layout>
	);
};

export default EditCatalogs;
