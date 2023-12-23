import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserProvider.jsx";
import { Navbar } from "./common/navbar/Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Navbar />
								<App />
							</>
						}
					/>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	</React.StrictMode>
);
