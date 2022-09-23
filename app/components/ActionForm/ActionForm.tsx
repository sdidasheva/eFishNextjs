import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IUserInfo } from "../../constants/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { actionSchema } from "../../validation/actionSchema";
import { UsersService } from "../../services/UsersService";
import Select from "react-select";
import Link from "next/link";
// icon
import ArrowBlue from "../../icons/ArrowRole";
import Eye from "../../icons/Eye";

const ActionForm = ({ userInfo, onSubmit, title }) => {
	const [selectedOption, setSelectedOption] = useState(
		userInfo ? userInfo.role_id : null
	);
	const [roles, setRoles] = useState([]);
	const [passwordShown, setPasswordShown] = useState(false);
	const [repeatPasswordShown, setrepeatPasswordShown] = useState(false);
	// useForm
	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<IUserInfo>({
		mode: "onBlur",
		resolver: yupResolver(actionSchema),
	});

	// toggle password
	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};
	const toggleRepeatPassword = () => {
		setrepeatPasswordShown(!repeatPasswordShown);
	};

	// get roles for react-select
	useEffect(() => {
		UsersService.getRoles().then((res) => setRoles(res?.data));
	}, []);

	// get options for react-select
	const options = roles.map((role) => {
		return { value: role.id, label: role.description };
	});

	// react-select style
	const customStyles = {
		option: (styles: any, { isFocused, isSelected }) => {
			return {
				...styles,
				backgroundColor: isFocused || isSelected ? "#52A5FC" : null,
				color: isFocused || isSelected ? "#FFF" : "#0A091D",
			};
		},
	};
	return (
		<>
			<div className="title__container">
				<Link href={`/admin`}>
					<a>
						<ArrowBlue />
					</a>
				</Link>
				<h3 className="title">{title}</h3>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<div className="form__column">
					<label className="label  col-3">Роль</label>
					<div className="add__info-row-select  col-5">
						<>
							<Controller
								control={control}
								name="role_id"
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<>
										<Select
											defaultValue={
												userInfo
													? options.filter((item) =>
															selectedOption
																? selectedOption === item.value
																: value === item.value
													  )
													: selectedOption
											}
											onChange={
												userInfo
													? (item) => {
															setSelectedOption(onChange(item.value));
													  }
													: (item) => {
															onChange(item.value);
													  }
											}
											ref={ref}
											getOptionValue={(option) => {
												return `${option["value"]}`;
											}}
											getOptionLabel={(label) => {
												return `${label["label"]}`;
											}}
											options={options}
											placeholder="Роль"
											classNamePrefix="select"
											styles={customStyles}
											name="role_id"
											value={options.filter((item) =>
												selectedOption
													? selectedOption === item.value
													: value === item.value
											)}
										/>
									</>
								)}
							/>
						</>
					</div>
					<p className="error">{errors?.role_id?.message}</p>
				</div>
				<div className="form__column">
					<label className="label col-3">Имя</label>
					<input
						type="text"
						className="add__info-row-content input col-5"
						{...register("first_name")}
						placeholder="Имя"
						defaultValue={userInfo ? userInfo.first_name : null}
					/>
					<p className="error">{errors?.first_name?.message}</p>
				</div>
				<div className="form__column">
					<label className="label  col-3">Фамилия</label>
					<input
						type="text"
						className="add__info-row-content input col-5"
						{...register("last_name")}
						placeholder="Фамилия"
						defaultValue={userInfo ? userInfo.last_name : null}
					/>
					<p className="error">{errors?.last_name?.message}</p>
				</div>
				<div className="form__column">
					<label className="label  col-3">Отчество</label>
					<input
						type="text"
						className="add__info-row-content input col-5"
						{...register("middle_name")}
						placeholder="Отчество"
						defaultValue={userInfo ? userInfo.middle_name : null}
					/>
				</div>
				<div className="form__column">
					<label className="label col-3">
						Название департамента/
						<br />
						управления/отдела
					</label>
					{/* <input type="text" className="add__info-row-content" /> */}
				</div>
				<div className="form__column">
					<label className="label col-3">ИИН</label>
					<input
						type="text"
						className="add__info-row-content input col-5"
						{...register("iin_bin")}
						placeholder="ИИН"
						defaultValue={userInfo ? userInfo.iin_bin : null}
					/>
					<p className="error">{errors?.iin_bin?.message}</p>
				</div>
				<div className="form__column">
					<label className="label col-3">Электронная почта(Логин)</label>
					<input
						type="text"
						className="add__info-row-content input col-5"
						{...register("email")}
						placeholder="Электронная почта"
						defaultValue={userInfo ? userInfo.email : null}
					/>
					<p className="error">{errors?.email?.message}</p>
				</div>
				<div className="form__column">
					<label className="label col-3">Пароль</label>
					<div className="add__info-row-content input col-5">
						<input
							type={passwordShown ? "text" : "password"}
							className="add__info-row-content-input"
							{...register("password")}
							placeholder="Пароль"
						/>
						<i
							onClick={togglePassword}
							className={`${
								passwordShown
									? "add__info-row-content-show"
									: "add__info-row-content-hide"
							} `}
						>
							<Eye />
						</i>
					</div>
					<p className="error">{errors?.password?.message}</p>
				</div>
				<div className="form__column">
					<label className="label col-3">Повтор пароля</label>
					<div className="add__info-row-content input col-5">
						<input
							type={repeatPasswordShown ? "text" : "password"}
							className="add__info-row-content-input"
							{...register("repeat_password")}
							placeholder="Повтор пароля"
						/>
						<i
							onClick={toggleRepeatPassword}
							className={`${
								repeatPasswordShown
									? "add__info-row-content-show"
									: "add__info-row-content-hide"
							} `}
						>
							<Eye />
						</i>
					</div>
					<p className="error">{errors?.repeat_password?.message}</p>
				</div>
				<div className="form__column">
					<div className="col-3"></div>
					<button type="submit" className="add__info-button button">
						Регистрация
					</button>
				</div>
			</form>
		</>
	);
};

export default ActionForm;
