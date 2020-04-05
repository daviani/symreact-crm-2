import React, {useState, useEffect} from "react";
import Field from "./../components/forms/Field";
import {Link} from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import axios from "axios";


const CustomerPage = ({match, history}) => {
    const {id = "new"} = match.params;

    const [customerState, setCustomerState] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });
    const [errorsState, setErrorsState] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });
    const [editingState, setEditingState] = useState(false);

    // Récupération du customer en fonction de l'identifiant
    // TODO régler au niveaux de la refactorisation de cette fonction (si export dans CustomersAPI, on ne récupère plus le customer)
    const fetchCustomer = async id => {
        try {
            const data = await axios
                .get("http://127.0.0.1:8000/api/customers/" + id)
                .then(response =>response.data);

            const {firstName, lastName, email, company} = data;
            setCustomerState({firstName, lastName, email, company});
        } catch (error) {
           console.log(error.response)
        }
    };

    // Chargement du customer si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if (id !== "new") {
            setEditingState(true);
            fetchCustomer(id);
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomerState({...customerState, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrorsState({});

            if (editingState) {
                await CustomersAPI.update(id, customerState);
                console.log("Le client a bien été modifié");
                history.replace("/customers");
            } else {
                await CustomersAPI.create(customerState);
                console.log("Le client a bien été créé");
                history.replace("/customers");
            }
        } catch ({response}) {
            const {violations} = response.data;

            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrorsState(apiErrors);
                console.log("Des erreurs dans votre formulaire !");
            }
        }
    };

    return (
        <>
            <div className="container jumbotron">
                {(!editingState && <h1>Création d'un client</h1>) ||
                (<h1>Modification d'une fiche client</h1>)}

                <form className="mt-4" onSubmit={handleSubmit}>
                    <Field
                        name="firstName"
                        label="Prénom"
                        placeholder="Prénom du client"
                        value={customerState.firstName}
                        onChange={handleChange}
                        error={errorsState.firstName}
                    />
                    <Field
                        name="lastName"
                        label="Nom de famille"
                        placeholder="Nom de famille du client"
                        value={customerState.lastName}
                        onChange={handleChange}
                        error={errorsState.lastName}
                    />
                    <Field
                        name="email"
                        label="Adresse électronique"
                        placeholder="Entrez l'adresse électronique du client"
                        type="email"
                        value={customerState.email}
                        onChange={handleChange}
                        error={errorsState.email}
                    />
                    <Field
                        name="company"
                        label="Entreprise"
                        placeholder="Entrez l'entreprise du client"
                        value={customerState.company}
                        onChange={handleChange}
                        error={errorsState.company}
                    />
                    <div className="form-group d-flex justify-content-between align-items-center">
                        <button type="submit" className="btn btn-primary border-delete mt-3">
                            Enregistrer
                        </button>
                        <Link to="/customers" className="btn btn-link mt-3">
                            Retour aux Clients
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};
export default CustomerPage;


/*import React, {useState, useEffect} from "react";
 import {Link} from "react-router-dom";
 import Field from "../components/forms/Field";
 import axios from "axios";
 import CustomersAPI from "../services/CustomersAPI";


 const CustomerPage = props => {
 const {id = "new"} = props.match.params;

 const [customerState, setCustomerState] = useState({
 lastName: "",
 firstName: "",
 email: "",
 company: ""
 });
 const [errorsState, setErrorsState] = useState({
 lastName: "",
 firstName: "",
 email: "",
 company: ""
 });
 const [editingState, setEditingState] = useState(false);

 // Récupération du customerState en fonction de l'identifiant
 const fetchCustomer = async id => {
 try {
 const data = await CustomersAPI.find(id);
 const {firstName, lastName, email, company} = data;
 setCustomerState({firstName, lastName, email, company});
 } catch (e) {
 console.error(e.response);
 }
 };


 // Chargement du customerState si besoin au chargement du composant ou au changement de l'identifiant
 useEffect(() => {
 if (id !== "new") {
 //On passe l'état du state setEditingState à true si on modifie un client
 setEditingState(true);
 fetchCustomer(id);
 }
 }, [id]);

 // Gestion des changements des inputs dans le formulaire
 const handleChange = ({currentTarget}) => {
 const {name, value} = currentTarget;
 setCustomerState({...customerState, [name]: value});
 };

 // Gestion de la soumission du formulaire
 const handleSubmit = async event => {
 event.preventDefault();
 try {
 setErrorsState({});
 if (editingState) {
 const response = await axios.put(
 "http://127.0.0.1:8000/api/customers/" + id, customerState
 );
 history.replace("/customers");
 console.log("Modification customer OK");
 } else {
 // !! Pas de "/" à la fais de l'url de la requête
 const response = await axios.post(
 "http://127.0.0.1:8000/api/customers", customerState
 );
 history.replace("/customers");
 console.log("ajout customers OK ");
 }
 } catch (e) {
 console.log("ajout customers KO " + e.response);
 if (e.response.data.violations) {
 const apiErrors = {};
 //On boucle sur les différentes erreurs du formulaire !
 e.response.data.violations.forEach(violation => {
 apiErrors[violation.propertyPath] = violation.message;
 });
 setErrorsState(apiErrors);
 }
 }
 };
 return (
 <>
 <div className="container jumbotron">
 {(!editingState && <h1>Création d'un client</h1>) ||
 (<h1>Modification d'une fiche client</h1>)}

 <form className="mt-4" onSubmit={handleSubmit}>
 <Field
 name="lastName"
 label="Nom de famille"
 placeholder="Nom de famille du client"
 value={customerState.lastName}
 onChange={handleChange}
 error={errorsState.lastName}
 />
 <Field
 name="firstName"
 label="Prénom"
 placeholder="Prénom du client"
 value={customerState.firstName}
 onChange={handleChange}
 error={errorsState.firstName}
 />
 <Field
 name="email"
 label="Adresse électronique"
 placeholder="Entrez l'adresse électronique du client"
 type="email"
 value={customerState.email}
 onChange={handleChange}
 error={errorsState.email}
 />
 <Field
 name="company"
 label="Entreprise"
 placeholder="Entrez l'entreprise du client"
 value={customerState.company}
 onChange={handleChange}
 error={errorsState.company}
 />
 <div className="form-group d-flex justify-content-between align-items-center">
 <button type="submit" className="btn btn-primary border-delete mt-3">
 Enregistrer
 </button>
 <Link to="/customers" className="btn btn-link mt-3">
 Retour aux Clients
 </Link>
 </div>
 </form>
 </div>
 </>
 );
 };
 export default CustomerPage;


 */
