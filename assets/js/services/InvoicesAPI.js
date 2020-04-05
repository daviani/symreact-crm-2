import axios from "axios";

function findAll () {
    return axios
        .get("http://localhost:8000/api/invoices")
        .then(response => response.data["hydra:member"]);
}

function find (id) {
    return axios
        .get("http://localhost:8000/api/invoices/" + id)
        .then(response => response.data);
}

function deleteInvoices (id) {
    axios.delete("http://localhost:8000/api/invoices/" + id);
}

function update (invoiceState, id) {
    return axios
        .put("http://localhost:8000/api/invoices/" + id,
            {
                ...invoiceState, customer: `/api/customers/${invoiceState.customer}`
            });
}

function create (invoiceState) {
    return axios
        .post("http://localhost:8000/api/invoices",
            {
                ...invoiceState, customer: `/api/customers/${invoiceState.customer}`
            });
}

export default {
    findAll,
    find,
    delete: deleteInvoices,
    update,
    create
};