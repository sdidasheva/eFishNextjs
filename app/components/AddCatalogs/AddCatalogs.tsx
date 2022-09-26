import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actionCatalogSchema } from "../../validation/actionCatalogSchema";
import { ICreateCatalog } from "../../constants/interface";
import { UsersService } from "../../services/UsersService";
import { CatalogService } from "../../services/CatalogsService";
import { useRouter } from "next/router";
import Modal from "../Modal/Modal";
import Layout from "../Layout/Layout";
import Link from "next/link";
// icons
import ArrowBlue from "../../icons/ArrowRole";
import PlusCircleBlue from "../../icons/PlusCircleBlue";
import PlusCircle from "../../icons/PlusCircle";

const AddCatalogs = () => {
	const [roles, setRoles] = useState([]);
	const [catalogRoles, setCatalogRoles] = useState<any>([]);
	const [isModalOpened, setIsModalOpened] = useState(false);
	const [chosenRole, setChosenRole] = useState<Boolean>(false);
	const limitsLabel = [
		"limits_top",
		"limits_left",
		"users",
		"data_register",
		"trade",
		"reporting",
	];
	const router = useRouter();

	//useForm
	const {
		register,
		//formState: { errors },
		handleSubmit,
	} = useForm<ICreateCatalog>({
		mode: "onBlur",
		//resolver: yupResolver(actionCatalogSchema),
	});

	// submit/add data
	const onSubmit = (data: ICreateCatalog) => {
		const addCatalogData = {
			name: data.name,
			modules: data.modules,
			//@ts-ignore
			columns: [data.columns1, data.columns2],
			roles: data.roles,
		};
		CatalogService.createCatalog(addCatalogData);
		// router.push("/catalog");
		console.log(addCatalogData);
	};

	// get roles
	useEffect(() => {
		UsersService.getRoles().then((res) => setRoles(res?.data));
	}, []);

	// add roles
	// const handleClickRole = (roleId: number, roleDescription: string) => {
	// 	setCatalogRoles([...catalogRoles, roleId]);
	// };
	// console.log(catalogRoles);

	// modal: style chosen roles
	const handleClickRole = (roleId: number) => {
		setChosenRole((prevState) => ({
			...chosenRole,
			[roleId]: !prevState[roleId],
		}));
	};

	// console.log(chosenRole);

	// push choosen roles
	const handleClickCatalogRoles = () => {
		if (Object.values(chosenRole)) {
			const keys = Object.keys(chosenRole);
			setCatalogRoles(keys.filter((key) => chosenRole[key]));
		}
		setIsModalOpened(false);
	};

	// remove chosen roles
	const handleRemoveRole = (index: number) => {
		const list = [...catalogRoles];
		list.splice(index, 1);
		setCatalogRoles(list);
	};

	catalogRoles.map((role) => console.log(role));
	return (
		<Layout>
			<div className="title__container">
				<Link href={`/catalog`}>
					<a>
						<ArrowBlue />
					</a>
				</Link>
				<h3 className="title">Создание справочника</h3>
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
						/>
						{/* <p className="form__input-error">{errors?.name?.message}</p> */}
					</div>
				</div>
				{/* Поле столбцы */}
				<div className="form__column">
					<label className="label col-3">Столбец 1</label>
					<div className="form__input col-5">
						<div className="d-flex w-100">
							<input
								name="columns1"
								type="text"
								className="input"
								//@ts-ignore
								{...register(`columns1`)}
								placeholder="Столбец 1"
							/>
							{/* <p className="form-inputs-content-error">{errors?.name?.message}</p> */}
						</div>
					</div>
				</div>
				<div className="form__column">
					<label className="label col-3">Столбец 2</label>
					<div className="form__input col-5">
						<div className="d-flex w-100">
							<input
								name="columns2"
								type="text"
								className="input"
								//@ts-ignore
								{...register(`columns2`)}
								placeholder="Столбец 2"
							/>
							{/* <p className="form-inputs-content-error">{errors?.name?.message}</p> */}
						</div>
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
										name="modules"
										className="checkbox__input"
										type="checkbox"
										//@ts-ignore
										{...register(`modules[${label}]`)}
										// value={label}
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
								catalogRoles.map((role, index) => (
									<button
										className="form__role-button"
										//@ts-ignore
										{...register(`roles[${role}]`)}
									>
										{role}
										<i onClick={() => handleRemoveRole(index)}>
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
												chosenRole[`${role.id}`]
													? "roles__list-role-chosen"
													: ""
											}`}
											onClick={() => handleClickRole(role.id)}
										>
											{role.description}
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

export default AddCatalogs;
