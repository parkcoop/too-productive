import axios from 'axios'

const login = () => {
    return axios.post('http://10.0.0.177:5000/login', {
        username:'parker',
        password:'omg'
    } )
    .then(res => Promise.resolve(res.data))
}

export {
    login
}