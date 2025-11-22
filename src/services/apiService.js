import authService from "./authService";
import store from "../store";
import { showToast } from "../slices/toastSlice";

const API_URL = import.meta.env.VITE_API_URL;

const makeApiRequest = async (url, options = {}) => {
    options.headers = options.headers || {};
    // Include credentials for cross-origin requests
    options.credentials = "include";
    options.headers["Content-Type"] = "application/json";

    let accessToken = authService.getAccessToken();
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    try {
        let response = await fetch(`${API_URL}/${url}`, options);

        if (
            accessToken &&
            (response.status === 401 || response.status === 403)
        ) {
            // Attempt to refresh the access token and re-request
            try {
                accessToken = await authService.refreshAccessToken();
                if (accessToken) {
                    options.headers["Authorization"] = `Bearer ${accessToken}`;
                    response = await fetch(`${API_URL}/${url}`, options);
                } else {
                    throw new Error("Unauthorized");
                }
            } catch (error) {
                await authService.logout();
                throw new Error("Unauthorized");
            }
        }

        if (response.status >= 400) {
            let message = `Request failed with status ${response.status}`;

            try {
                const data = await response.json();
                message = data.error || JSON.stringify(data);
            } catch {
                const text = await response.text();
                message = text || message;
            }

            throw new Error(message);
        }

        return await response.json();
    } catch (error) {
        store.dispatch(showToast(error.message));
        throw error;
    }
};

export default makeApiRequest;
