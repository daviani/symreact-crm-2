import axios from "axios";

function findAll () {
    return axios
        .get("http://127.0.0.1:8000/api/customers")
        .then(response => response.data["hydra:member"]);
}

function find (id) {
    return axios
        .get("http://127.0.0.1:8000/api/customers/" + id)
        .then(response => response.data);
}

function create (customerState) {
    // !! Pas de "/" à la fais de l'url de la requête
    return axios
        .post("http://127.0.0.1:8000/api/customers", customerState
        );
}


function update (id, customerState) {
    return axios
        .put("http://127.0.0.1:8000/api/customers/" + id, customerState
        );
}


function deleteCustomer (id) {
    return axios
        .delete("http://127.0.0.1:8000/api/customers/" + id);
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteCustomer
};