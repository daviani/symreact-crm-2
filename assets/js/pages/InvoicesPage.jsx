import React, {useEffect, useState} from "react";
import moment from "moment";
import Pagination from "../components/Pagination";
import InvoicesAPI from "../services/InvoicesAPI";
import {Link} from "react-router-dom";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "warning",
    CANCELLED: "danger"
};

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "envoyée",
    CANCELLED: "annulée"
};

const InvoicesPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 9;

    //Récupération des invoices
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll();
            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    // Charger les invoices au chargement du composant
    useEffect(() => {
        fetchInvoices();
    }, []);


    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    //Requête HTTP delete pour la suppresion des customers
    const handleDelete = async id => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await InvoicesAPI.delete(id);
            console.log("La facture a bien été supprimée");
        } catch (error) {
            console.log("Une erreur est survenue");
            setInvoices(originalInvoices);
        }
    };

    // Gestion de la recherche :
    const filteredInvoices = invoices.filter(
        i => i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().startsWith(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );

    //pagination des données
    const paginatedInvoices = Pagination.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    );

    //Formatage de la date avec moment.js
    const formatDate = str => moment(str).format("DD/MM/YYYY");

    return (
        <>
            <div className=" mb-4 d-flex justify-content-between align-items-center">
                <h1>
                    Listes des factures
                </h1>

                <Link to="/invoices/new" className="btn btn-primary border-delete">
                    Créer une facture
                </Link>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher..."
                    onChange={handleSearch}
                    value={search}
                />
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="text-center">Numéro</th>
                    <th className="text-center">Client</th>
                    <th className="text-center">Date d'envoi</th>
                    <th className="text-center">Statut</th>
                    <th className="text-center">Montant</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {paginatedInvoices.map(invoice => (
                    <tr key={invoice.id}>
                        <td className="text-center">
                            {invoice.chrono}
                        </td>
                        <td className="text-center">
                            <a href="#">
                                {invoice.customer.firstName}{" "}
                                {invoice.customer.lastName}
                            </a>
                        </td>
                        <td className="text-center">
                            {formatDate(invoice.sendAt)}
                        </td>
                        <td className="text-center">
                            <button className={"c-width btn btn-sm btn-" + STATUS_CLASSES[invoice.status]}>
                                {STATUS_LABELS[invoice.status]}
                            </button>
                        </td>
                        <td className="text-center">
                            {invoice.amount.toLocaleString("fr-FR")} €
                        </td>
                        <td>
                            <Link to={"/invoices/" +invoice.id} className="btn btn-sm btn-success border-delete mr-3">
                                Editer
                            </Link>
                            <button className="btn btn-sm btn-danger border-delete"
                                    onClick={() => handleDelete(invoice.id)}>
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChanged={handlePageChange}
                length={filteredInvoices.length}
            />
        </>
    );
};
export default InvoicesPage;
