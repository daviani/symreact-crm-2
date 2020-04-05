import axios from "axios";

function findAll () {
    return axios.get("http://127.0.0.1:8000/api/customers")
        .then(response => response.data["hydra:member"]);
}

function create (customerState) {
    // !! Pas de "/" à la fais de l'url de la requête
    axios.post(
        "http://127.0.0.1:8000/api/customers", customerState
    );
}


function update (id, customerState) {
    axios.put(
        "http://127.0.0.1:8000/api/customers/" + id, customerState
    );
}


function deleteCustomer (id) {
    axios.delete("http://127.0.0.1:8000/api/customers/" + id)
}

export default {
    findAll,
    create,
    update,
    delete: deleteCustomer
};