import React from "react";
import "./Navbar.css";

export const Navbar = () => {
	return (
		<div className="navbar">
			<img
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc8dcGN8YrvhGHcrsyD0jg7xsGLVweUW7YeSwu-rOy-Q&s"
				alt=""
			/>
			<span>
				<span style={{ fontWeight: "600" }}>Government of TamilNadu</span>
				<br />
				Directorate of Technical Education
			</span>
		</div>
	);
};
