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
}

export default new UserDataService();