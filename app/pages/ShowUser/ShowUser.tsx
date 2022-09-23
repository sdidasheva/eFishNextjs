import React from "react";
import Link from "next/link";
import ArrowBlue from "../../icons/ArrowRole";

const ShowUser = ({ userInfo }) => {
	return (
		<>
			<div className="title__container">
				<Link href={`/admin`}>
					<a>
						<ArrowBlue />
					</a>
				</Link>

				<h3 className="title">Просмотреть пользователя</h3>
			</div>
			<div className="form">
				<div className="form__column">
					<label className="label col-3">Роль</label>
					<input
						type="text"
						className="input col-5"
						disabled={true}
						value={userInfo.role.description}
					/>
				</div>
				<div className="form__column">
					<label className="label col-3">Имя</label>
					<input
						type="text"
						className="input col-5"
						disabled={true}
						value={userInfo.first_name}
					/>
				</div>
				<div className="form__column">
					<label className="label col-3">Фамилия</label>
					<input
						type="text"
						className="input col-5"
						disabled={true}
						value={userInfo.last_name}
					/>
				</div>
				<div className="form__column">
					<label className="label col-3">Отчество</label>
					<input
						type="text"
						className="input col-5"
						disabled={true}
						value={userInfo.middle_name}
					/>
				</div>
				<div className="form__column">
					<label className="label col-3">
						Название департамента/
						<br />
						управления/отдела
					</label>
					<input type="text" className="input col-5" disabled={true} value="" />
				</div>
				<div className="form__column">
					<label className="label col-3">ИИН</label>
					<input
						type="text"
						className="input col-5"
						disabled={true}
						value={userInfo.iin_bin}
					/>
				</div>
				<div className="form__column">
					<label className="label col-3">Электронная почта(Логин)</label>
					<input
						type="text"
						className="input col-5"
						disabled={true}
						value={userInfo.email}
					/>
				</div>
			</div>
		</>
	);
};

export default ShowUser;
