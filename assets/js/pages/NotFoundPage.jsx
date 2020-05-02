import React from 'react'
import {Link} from 'react-router-dom'
const NotFoundPage = () => {
    return (<>
            <div className="container">
                <h1 className="text-center">
                    404
                </h1>
                <p className="text-center mt-5">
                    Ooops!!! The page you are looking for is not found
                </p>
                <button className='align-items-center'>
                    <Link to={'/'}>
                        Back To Home
                    </Link>
                </button>
            </div>
        </>
    )
}

export default NotFoundPage

