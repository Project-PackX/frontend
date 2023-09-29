import http from "../http-common";

class PackageDataService {
    getAll() {
        return http.get("/");
    }

    get(id) {
        return http.get(`/${id}`);
    }
}

export default new PackageDataService();