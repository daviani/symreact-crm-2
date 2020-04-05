import React, {useState} from "react";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import UserAPI from "../services/UserAPI";

const RegisterPage = ({history}) => {

    const [userState, setUserState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errorsState, setErrorsState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });


    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUserState({...userState, [name]: value});
    };

    //Envoie du formulaire et gestion des erreurs
    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};

        if (userState.password !== userState.passwordConfirm) {
            apiErrors.passwordConfirm = "Vos mot de passe sont différents…";
            setErrorsState(apiErrors);
            return;
        }

        try {
            await UserAPI.register(userState);
            setErrorsState({});
            console.log("create user : 201");
            history.replace("/login");
            // TODO : faire un componant de gestion d'erreur
        } catch (error) {
            const {violations} = error.response.data;
            if (violations) {

                violations.forEach(violation =>
                    apiErrors[violation.propertyPath] = violation.message
                );
                setErrorsState(apiErrors);
                console.log("Des erreurs dans votre formulaire !");
            }
        }
    };
    return (
        <>
            <div className="container jumbotron">
                <h1>Inscription</h1>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <Field
                        name="firstName"
                        label="Prénom"
                        placeholder="Votre prénom"
                        value={userState.firstName}
                        onChange={handleChange}
                        error={errorsState.firstName}
                    />
                    <Field
                        name="lastName"
                        label="Nom de famille"
                        placeholder="Votre nom de famille"
                        value={userState.lastName}
                        onChange={handleChange}
                        error={errorsState.lastName}
                    />
                    <Field
                        name="email"
                        label="Adresse électronique"
                        placeholder="Entrez votre adresse électronique"
                        type="email"
                        value={userState.email}
                        onChange={handleChange}
                        error={errorsState.email}
                    />
                    <Field
                        name="password"
                        label="Mot de passe"
                        placeholder="Entrez mot de passe"
                        type="password"
                        value={userState.password}
                        onChange={handleChange}
                        error={errorsState.password}
                    />
                    <Field
                        name="passwordConfirm"
                        label="Mot de passe"
                        placeholder="Confirmez votre mot de passe"
                        type="password"
                        value={userState.passwordConfirm}
                        onChange={handleChange}
                        error={errorsState.passwordConfirm}
                    />
                    <div className="form-group d-flex justify-content-between align-items-center">
                        <button type="submit" className="btn btn-primary border-delete mt-3">
                            Enregistrer
                        </button>
                        <Link to="/login" className="btn btn-link mt-3">
                            Connection
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};
export default RegisterPage;



