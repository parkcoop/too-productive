import axios from 'axios'

const signUp = ({ username, password, fullName }) => {
    console.log(username, password, fullName)
    return axios.post('http://127.0.0.1:5000/signup', {
        username,
        password,
        fullName
    } )
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err))
}

const login = ({ username, password }) => {
    console.log(username, password)

    return axios.post('http://127.0.0.1:5000/login', {
        username,
        password
    } )
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err))
}

export {
    signUp,
    login
}