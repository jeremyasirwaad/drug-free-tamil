import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			// added for AWS-SDK with vite
			"./runtimeConfig": "./runtimeConfig.browser"
		}
	}
});
