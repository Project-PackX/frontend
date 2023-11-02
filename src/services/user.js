import http from "../http-common";

class UserDataService {
    register(data) {
        return http.post("/users/register", data);
    }

    login(data) {
        return http.post("/users/login", data);
    }

    history(id, token) {
        return http.get(`/users/${id}/packages`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    get(id, token) {
        return http.get(`/users/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    sendPasswordResetCode(email) {
        return http.get("/api/users/password-reset-code", {
            headers: {
                email: email
            }
        });
    }

    checkPasswordResetCode(code) {
        return http.post("/api/users/check-code", null, {
            headers: {
                code: code
            }
        });
    }

    resetPassword(email) {
        return http.post("/api/users/password-reset", null, {
            headers: {
                email: email
            }
        });
    }

    updateUser(id, token, userData) {
        return http.put(`/api/users/${id}`, userData, {
            headers: {
                Authorization: `${token}`
            }
        });
    }
}

export default new UserDataService();