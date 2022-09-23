import React from "react";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";

const Wrapper = ({ children, isMain = false }) => {
	return (
		<>
			<div className="wrapper container-fluid">
				<Header isMain={isMain} />
				<div className="wrapper__main">
					<Aside />
					<div>{children}</div>
				</div>
			</div>
			<div className="wave"></div>
		</>
	);
};

export default Wrapper;
