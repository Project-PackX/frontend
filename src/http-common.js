import axios from "axios";

export default axios.create({
    baseURL: "http://packx-sandbox.overlab.hu:8000/api",
    headers: {
        "Content-type": "application/json"
    }
})