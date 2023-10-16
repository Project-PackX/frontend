import http from "../http-common";

class LockerDataService {
    getAll() {
        return http.get("/lockers/all");
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LockerDataService();