import React from "react";

const Layout = ({ children }) => {
	return (
		<section className="section">
			<div className="section__wrapper">{children}</div>
		</section>
	);
};

export default Layout;
