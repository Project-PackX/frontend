import http from "../http-common";

class UserDataService {
    register(data) {
        return http.post("/users/register", data);
    }

    login(data) {
        return http.post("/users/login", data);
    }
}

export default new UserDataService();