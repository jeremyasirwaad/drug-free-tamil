import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState();

	return <UserContext.Provider>{children}</UserContext.Provider>;
}

export default UserContext;
