import http from "../http-common";

class EmissionsDataService {
  getEmissions() {
    return http.get("/emissions");
  }
}

export default new EmissionsDataService();