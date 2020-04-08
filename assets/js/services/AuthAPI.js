import axios from "axios" ;
import jwtDecode from "jwt-decode";
import {LOGIN_API} from "../config";

/**
 * Déconnexion (suppression du token JWT)
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Positionne le token JWT sur axios
 * @param {string}token
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Requête HTTP d'authentification et stockage du token sur le localStorage et Axios
 * @param {object} credentials
 * @returns {Promise<AxiosResponse<any>>}
 */
function authenticate(credentials) {
    return axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            //stock le token dans le local storage
            window.localStorage.setItem("authToken", token);
            // Header par défaut sur l'ensembles des futur requête HTTP
            setAxiosToken(token);
        });
}

/**
 * Mise en place du Token lors du chargement de l'application
 */
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

/**
 * Permet de savoir si l'on est authentifier
 * @returns {boolean}
 */

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