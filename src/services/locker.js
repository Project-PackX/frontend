import http from "../http-common";

class LockerDataService {

    token = localStorage.getItem('token');

    getAll() {
        return http.get("/lockers/all");
    }

    addLocker(data, token) {
        return http.post("/lockers/new", data, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    getPackages(id, token) {
        return http.get(`/lockers/packages/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    getFullness(id, token) {
        return http.get(`/lockers/fullness/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }
}

export default new LockerDataService();
