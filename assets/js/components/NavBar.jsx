import React from 'react';
import {NavLink} from 'react-router-dom';
import AuthAPI from "../services/AuthAPI";


const NavBar = ({isAuthenticated, onLogout, history}) => {

    const handleLogout = () => {
        //Requête de déconnection
        AuthAPI.logout();
        //On passe le state à false
        onLogout(false);
        //On redirige vers "/"
        history.push("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">
                <img
                    className="main-logo ml-5 mr-5"
                    src="/img/logo.png"
                    alt="logo-main"
                />
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarColor02"
                aria-controls="navbarColor02"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">
                            Clients
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">
                            Factures
                        </NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto mr-3">
                    {!isAuthenticated && <>
                        <li className="nav-item ml-3 mr-3">
                            <NavLink className="nav-link border-primary" to="/register">
                                Inscription
                            </NavLink>
                        </li>
                        <li className="nav-item ml-3 mr-3">
                            <NavLink className="btn btn-primary" to="/login">
                                Connexion
                            </NavLink>
                        </li>
                    </> ||
                    <li className="nav-item">
                        <button onClick={handleLogout} className="btn btn-danger ml-3 mr-3">
                            Déconnexion
                        </button>
                    </li>
                    }

                </ul>
            </div>
        </nav>
    );
}

export default NavBar;



