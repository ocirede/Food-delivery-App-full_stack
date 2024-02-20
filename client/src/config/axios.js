import axios from "axios";

const axiosAuth = axios.create({
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default axiosAuth;