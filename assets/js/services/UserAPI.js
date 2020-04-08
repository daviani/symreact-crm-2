import axios from "axios";

function register (userState) {
    return axios.post("http://127.0.0.1:8000/api/users", userState);
}

export default {
    register
};