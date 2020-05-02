import React, { useEffect, useState } from 'react'
import Pagination                     from '../components/Pagination'
import CustomersAPI                   from '../services/CustomersAPI'
import { Link }                       from 'react-router-dom'
import { toast }                      from 'react-toastify'
import TableLoader                    from '../components/loader/TableLoader'
import { Icon }                       from 'semantic-ui-react'

const CustomersPage = () => {
    const [loadingState, setLoadingState]         = useState( true )
    const [customersState, setCustomersState]     = useState( [] )
    const [currentPageState, setCurrentPageState] = useState( 1 )
    const [search, setSearch]                     = useState( '' )
    const itemsPerPage                            = 8

    //Requête HTTP get axios pour récupérer les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomersState( data )
            setLoadingState( false )
        } catch (error) {
            toast.error( 'Votre liste de client n\'as pu être charger' )
        }
    }
    useEffect( () => {
        fetchCustomers()
    }, [] )

    //Requête HTTP delete pour la suppresion des customers
    const handleDelete = async id => {
        //Clone du mon tableaux initial
        const originalCustomers = [...customersState]
        setCustomersState( customersState.filter( customer => customer.id !== id ) )
        try {
            await CustomersAPI.delete( id )
            toast.success( 'Votre client a bien être supprimer' )
        } catch (error) {
            toast.error( 'Impossible de supprimer le client si il a encore des factures' )
            setCustomersState( originalCustomers )
        }
    }

    // Gestion du changement de page
    const handlePageChange = page => setCurrentPageState( page )

    // Gestion de la recherche
    const handleSearch = ( {currentTarget} ) => {
        setSearch( currentTarget.value )
        setCurrentPageState( 1 )
    }

    //filtrage des customers en fonction de la recherche
    const filteredCustomers = customersState.filter(
        c =>
            c.firstName.toLowerCase().includes( search.toLowerCase() ) ||
            c.lastName.toLowerCase().includes( search.toLowerCase() ) ||
            c.email.toLowerCase().includes( search.toLowerCase() ) ||
            (c.company && c.company.toLowerCase().includes( search.toLowerCase() ))
    )

    //pagination des données
    const paginatedCustomers = Pagination.getData(
        filteredCustomers,
        currentPageState,
        itemsPerPage
    )

    return (
        <>
            <div className='mb-4 d-flex justify-content-between align-items-center'>
                <h1> Liste des Clients </h1>
                <Link to='/customers/new' className='btn btn-primary border-delete'>
                    Créer un client
                </Link>
            </div>
            <div className='form-group'>
                <input type='text'
                       className='form-control'
                       placeholder='Rechercher...'
                       onChange={ handleSearch }
                       value={ search }/>
            </div>
            <table className='table table-hover'>
                <thead>
                <tr>
                    <th className='text-center'>
                        Id.
                    </th>
                    <th className='text-center'>
                        Client
                    </th>
                    <th className='text-center'>
                        Email
                    </th>
                    <th className='text-center'>
                        Entreprise
                    </th>
                    <th className='text-center'>
                        Factures
                    </th>
                    <th className='text-center'>
                        Montant total
                    </th>
                    <th/>
                </tr>
                </thead>
                { !loadingState && (
                    <tbody>
                    { paginatedCustomers.map( customer => (
                        <tr key={ customer.id }>
                            <td className='text-center'>
                                { customer.id }
                            </td>
                            <td className='text-center'>
                                <Link to={ '/customers/' + customer.id }>
                                    { customer.firstName } { customer.lastName }
                                </Link>
                            </td>
                            <td className='text-center'>
                                { customer.email }
                            </td>
                            <td className='text-center'>
                                { customer.company }
                            </td>
                            <td className='text-center'>
                  <span className='badge badge-primary'>
                    { customer.invoices.length }
                  </span>
                            </td>
                            <td className='text-center'>
                                { customer.totalAmount.toLocaleString() } €
                            </td>
                            <td>
                                <button onClick={ () => handleDelete( customer.id ) }
                                        disabled={ customer.invoices.length > 0 }
                                        className='btn btn-group-sm'>
                                    <Icon size='large'
                                          name='trash'
                                          color='red'/>
                                </button>
                            </td>
                        </tr>
                    ) ) }
                    </tbody>
                ) }
            </table>

            { loadingState && <TableLoader/> }

            { itemsPerPage < filteredCustomers.length && (
                <Pagination currentPage={ currentPageState }
                            itemsPerPage={ itemsPerPage }
                            length={ filteredCustomers.length }
                            onPageChanged={ handlePageChange }/>
            ) }
        </>
    )
}

export default CustomersPage