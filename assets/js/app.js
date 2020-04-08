import React, {useState} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch, withRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import InvoicePage from "./pages/InvoicePage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import CustomerPage from "./pages/CustomerPage";
import AuthAPI from "./services/AuthAPI";
import AuthContext from "./context/AuthContext";
import {ToastContainer,Zoom} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

require("../css/app.css");

AuthAPI.setup();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );
    const NavBarWithRouter = withRouter(NavBar);

    // Bien si l'on s'en sert plusieurs fois
    //    const contextValue = {
    //        isAuthenticated,
    //        setIsAuthenticated
    //    };

    //TODO : faire une page d'erreur
    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavBarWithRouter/>

                <main className="container pt-5">
                    <Switch>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path="/invoices/:id" component={InvoicePage}/>
                        <PrivateRoute path="/invoices" component={InvoicesPage}/>
                        <PrivateRoute path="/customers/:id" component={CustomerPage}/>
                        <PrivateRoute path="/customers" component={CustomersPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer
                transition={Zoom}
                position="bottom-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        </AuthContext.Provider>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);

// <Route path="/customerspagination" component={CustomersPageWithPagination}/>
//        <!--  <Footer/> -->