import http from "../http-common";

class LockerDataService {

    token = localStorage.getItem('token');

    getAll() {
        return http.get("/lockers/all");
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

// eslint-disable-next-line import/no-anonymous-default-export
export default new LockerDataService();
