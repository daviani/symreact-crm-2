import React, {useState} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch, withRouter, Redirect} from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage"
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/AuthAPI";

require("../css/app.css");

AuthAPI.setup();

const PrivateRoute = ({path, isAuthenticated, component}) =>
    isAuthenticated ? (
        <Route path={path} component={component}/>
    ) : (
        <Redirect to="/login"/>
    );

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );

    const NavBarWithRouter = withRouter(NavBar);

//TODO : faire une page d'erreur
    return (
        <HashRouter>
            <NavBarWithRouter isAuthenticated={isAuthenticated}
                              onLogout={setIsAuthenticated}
            />

            <main className="container pt-5">
                <Switch>
                <Route
                    path="/login"
                    render={props => (
                        <LoginPage
                            onLogin={setIsAuthenticated}
                            {...props}
                        />
                    )}/>

                <PrivateRoute
                    path="/invoices"
                    isAuthenticated={isAuthenticated}
                    component={InvoicesPage}
                />

                <PrivateRoute
                    path="/customers"
                    isAuthenticated={isAuthenticated}
                    component={CustomersPage}
                />

                <Route path="/" component={HomePage}/>
                </Switch>
            </main>
            <Footer/>
        </HashRouter>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);

// <Route path="/customerspagination" component={CustomersPageWithPagination}/>