import React from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpened, children, onClose }: any) {
	if (!isOpened) {
		return null;
	}

	return createPortal(
		<>
			<div className="overlay" onClick={onClose} />
			<div className="c-modal">
				<div className="c-modal__content ">{children}</div>
			</div>
		</>,
		document.getElementById("portal")
	);
}
