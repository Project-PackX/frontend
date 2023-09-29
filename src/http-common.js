import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4444/api/packages",
    headers: {
        "Content-type": "application/json"
    }
})