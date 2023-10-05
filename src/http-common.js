import axios from "axios";

export default axios.create({
    baseURL: "http://165.22.92.74:8000/api/packages",
    headers: {
        "Content-type": "application/json"
    }
})