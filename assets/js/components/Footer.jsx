import React    from 'react'
import { Icon } from 'semantic-ui-react'

const Footer = () => {
    return (
        <footer className="footer bg-dark">
            <div className="container">
                <div className="row f-white">
                    <div className="col-4 mt-5">
                        <p>
                            <strong>&copy; 2020 Fillatre Daviani.</strong>
                        </p>
                    </div>

                    <div className="col-4 mt-5">
                        <a className='f-white'
                           href='https://github.com/daviani'>
                            <Icon size='large'
                                  name='github'
                                  color='grey'/>
                            <strong>GitHub</strong>
                        </a>
                        <a className='f-white ml-5'
                           href='https://www.linkedin.com/in/daviani-fillatre/'>
                            <Icon size='large'
                                  name='linkedin'
                                  color='grey'/>
                            <strong>LinkedIn</strong>
                        </a>
                    </div>
                    <div className="col-4 mt-5">
                        <p>
                            <strong>
                                Made with <Icon name='heart' color='grey'/> with symfony, apiplateform and react
                            </strong>
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer
