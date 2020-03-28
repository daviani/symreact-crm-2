import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage"
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";

require("../css/app.css");

const App = () => {
    return (
        <HashRouter>
            <NavBar/>

            <main className="container pt-5">
                <Switch>
                    <Route path="/invoices" component={InvoicesPage} />
                    <Route path="/customerspagination" component={CustomersPageWithPagination} />
                    <Route path="/customers" component={CustomersPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>
            <Footer/>
        </HashRouter>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);