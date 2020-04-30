import axios        from 'axios'
import { USER_API } from '../config'

function register( userState ) {
    return axios.post( USER_API, userState )
}

export default {
    register
}