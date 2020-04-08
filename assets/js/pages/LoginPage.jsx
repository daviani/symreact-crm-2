import React, {useState, useContext} from "react";
import {NavLink} from 'react-router-dom';
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../context/AuthContext";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";

const LoginPage = ({history}) => {
    const {setIsAuthenticated} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState('');

    //Gestion des champs du formulaires
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value});
    };

    const handleSubmit = async event => {
        //Empêche de recharger la page
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            //Pas d'erreur
            setError("");
            //On passe le state à true
            toast.success('Vous êtes bien connecté');
            setIsAuthenticated(true);
            //On replace l'url actuel par "/customers"
            history.replace("/customers");
        } catch (e) {
            setError("Une erreur est survenue :/ ");
            toast.error("Une erreur est survenue");
        }
    };

    return (
        <>
            <div className="container jumbotron">
                <h1 className="display-3">Connexion</h1>
                <form className="ml-5" onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        label="Adresse électronique"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Entrez votre adresse électronique"
                        type="email"
                        error={error}
                    />
                    <small id="emailHelp" className="form-text text-muted ml-3 p-custom-1">
                        Nous ne partagerons jamais votre courrier électronique avec qui que ce soit d'autre part.
                    </small>
                    <Field
                        name="password"
                        label="Mot de passe"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Entrez votre mot de passe"
                        type="password"
                        error=""
                    />
                    <button type="submit" className="btn btn-primary border-delete mt-3">
                        Soumettre
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
