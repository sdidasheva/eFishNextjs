import React, { useState } from "react";
import Link from "next/link";
import Users from "../../icons/Users";
import Arrow from "../../icons/Arrow";
import FileInput from "../../icons/FileInput";
import FileCheck from "../../icons/FileCheck";
import Clipboard from "../../icons/Clipboard";
import Contact from "../../icons/Contact";
import Menu from "../../icons/Menu";
import Home from "../../icons/Home";

const Aside = () => {
	const [show, setShow] = useState(false);
	const [showMobile, setShowMobile] = useState(false);

	return (
		<aside className="controller">
			<div
				className="controller__dropdown-mobile"
				onClick={() => setShowMobile(!showMobile)}
			>
				<Menu />
			</div>
			<div
				className={`controller__dropdown ${
					showMobile ? "controller__dropdown-modal" : ""
				}`}
			>
				<div className="controller__dropdown-header">
					<Home /> Главная
				</div>
				<ul className="controller__dropdown-content">
					<li>
						<button
							className={`controller__dropdown-content-button ${
								show ? "controller__dropdown-content-button-active" : ""
							}`}
							onClick={() => setShow(!show)}
						>
							<p>
								<small>
									<Users />
								</small>

								<span>Управление пользователями</span>

								<i>
									<Arrow />
								</i>
							</p>
						</button>

						{show && (
							<ul
								className={`controller__dropdown-content-items ${
									show ? "controller__dropdown-content-items-active" : ""
								}`}
							>
								<Link href={"/admin"}>
									<a>
										<li className="controller__dropdown-content-items-li">
											<i>
												<FileInput />
											</i>
											Все пользователи
										</li>
									</a>
								</Link>
								<li className="controller__dropdown-content-items-li">
									<i>
										<FileInput />
									</i>
									Заявки на регистрацию
								</li>
								<li className="controller__dropdown-content-items-li">
									<i>
										<FileCheck />
									</i>
									Заявки на восстановление
								</li>
							</ul>
						)}
					</li>
					<Link href={"/catalog"}>
						<li className="controller__dropdown-content-items-li">
							<i>
								<Clipboard />
							</i>{" "}
							Управление справочниками
						</li>
					</Link>
					<li className="controller__dropdown-content-items-li controller__dropdown-content-items-last">
						<i>
							<Contact />{" "}
						</i>
						Управление ролями
					</li>
				</ul>
			</div>
		</aside>
	);
};

export default Aside;
