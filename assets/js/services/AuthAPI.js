import axios from "axios" ;
import jwtDecode from "jwt-decode";
import CustomersAPI from "../services/CustomersAPI";

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
    console.log("disconnect --logout()")
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function authenticate(credentials) {
    return axios
        .post("http://127.0.0.1:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            //stock le token dans le local storage
            window.localStorage.setItem("authToken", token);
            // Header par défaut sur l'ensembles des futur requête HTTP
            setAxiosToken(token);
        });
}


function setup() {
    //Voir si Token existe
    const token = window.localStorage.getItem("authToken");
    //si le token est valide
    if(token) {
        // const jwtData = jwtDecode(token);
        const {exp: expiration} = jwtDecode(token);
        if(expiration *1000 > new Date().getTime()) {
            setAxiosToken(token);
            console.log("Connecté")
        } else {
            logout();
            console.log("disconnect --session expiré")
        }
    }else {
        logout();
        console.log("disconnect --pas de token")
    }
}


function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration *1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}



export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}