import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.PACKX_BACKEND_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
