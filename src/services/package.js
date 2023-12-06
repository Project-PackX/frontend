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
    statusUpdate(id, token) {
        return http.post(`/packages/statusup/${id}`, null, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    getPackageByLockerCode(code) {
        return http.get(`/packages/code/${code}`);
    }

    cancelPackage(id, token) {
        return http.post(`/packages/cancel/${id}`, null, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    deletePackage(id, token) {
        return http.delete(`/packages/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }
}

export default new PackageDataService();