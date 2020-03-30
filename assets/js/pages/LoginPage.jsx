import React, {useState, useContext} from "react";
import { NavLink } from 'react-router-dom';
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../context/AuthContext";

const LoginPage = ({history }) => {
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
            setIsAuthenticated(true);
            //On replace l'url actuel par "/customers"
            history.replace("/customers");
            console.log("connection initial --OK")
        } catch (e) {
            setError("Votre adresse éléctronique n'est pas enregistré ou votre mot de passe est incorrect");
        }
    };

    return (
        <>
            <div className="container jumbotron">
                <h1 className="display-3">Connexion</h1>
                <form className="ml-5"
                      onSubmit={handleSubmit}>
                    <div className="form-group col-6">
                        <label htmlFor="username">Adresse électronique</label>
                        <input value={credentials.username}
                               onChange={handleChange}
                               type="email"
                               className={"form-control" + (error && " is-invalid")}
                               id="username"
                               aria-describedby="emailHelp"
                               placeholder="Entrez votre adresse électronique"
                               name="username"
                        />
                        {error && <p className="invalid-feedback">
                            {error}
                        </p>}
                        <small id="emailHelp" className="form-text text-muted">
                            Nous ne partagerons jamais votre courrier électronique avec qui que ce soit d'autre part.
                        </small>
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="password">Mot de passe</label>
                        <input value={credentials.password}
                               onChange={handleChange}
                               type="password"
                               className="form-control"
                               id="password1"
                               placeholder="Mot de passe"
                               name="password"
                        />
                    </div>
                        <button type="submit" className="btn btn-primary">
                            Soumettre
                        </button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;

