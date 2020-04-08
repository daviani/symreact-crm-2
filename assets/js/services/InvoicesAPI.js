import axios from "axios";
import {INVOICES_API} from "../config";

function findAll () {
    return axios
        .get(INVOICES_API)
        .then(response => response.data["hydra:member"]);
}

function find (id) {
    return axios
        .get(INVOICES_API + "/" + id)
        .then(response => response.data);
}

function deleteInvoices (id) {
    axios.delete(INVOICES_API + "/" + id);
}

function update (invoiceState, id) {
    return axios
        .put(INVOICES_API + "/" + id,
            {
                ...invoiceState, customer: `/api/customers/${invoiceState.customer}`
            });
}

function create (invoiceState) {
    return axios
        .post(INVOICES_API,
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