import React       from 'react'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
    return (
        <div className='jumbotron'>
            <h1 className='display-3'>Hello, world!</h1>
            <p className='lead'>
                Bienvenue sur mon application de gestion de facture.
                Pour réaliser cette application, j'ai utilisé:
                <ul className='mt-3'>
                    <li>Symfony 5.0.8</li>
                    <li>API Platform 1.2</li>
                    <li>React 16.8.6</li>
                    <li>JWT Token 2.6</li>
                </ul>
            </p>
            <hr className='my-4'/>
            <p>
                Vous pouvez vous connecter avec ce compte demo :
                <ul className='mt-3'>
                    <li>Adresse électronique : demo@demo.fr</li>
                    <li>Mot de passe : F9qa#Y8~</li>
                </ul>
            </p>
            <p className='lead mt-3'>
                <NavLink className='btn btn-primary' to='/login'>
                    Connexion
                </NavLink>
            </p>
        </div>
    )
}

export default HomePage

