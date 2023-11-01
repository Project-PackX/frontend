import http from "../http-common";

class PackageDataService {
    getAll(token) {
        return http.get("/packages/all", {
            headers: {
                Authorization: `${token}`
            }
        });
    }
    get(id) {
        return http.get(`/packages/get/${id}`);
    }
    new(data, token) {
        return http.post("/packages/new", data, {
            headers: {
                Authorization: `${token}`
            }
        });
    }
    getCourierPackages(id, token) {
        return http.get(`/packages/courierpackages/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }
    statusUpdate() {
        return http.post(`/packages/statusup`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PackageDataService();