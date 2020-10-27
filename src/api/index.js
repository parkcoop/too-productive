import axios from 'axios'
import { showMessage } from 'react-native-flash-message'

const signUp = ({ username, password, fullName }) => {
    console.log(username, password, fullName)
    return axios.post('http://127.0.0.1:5000/signup', {
        username,
        password,
        fullName
    } )
    .then(res => Promise.resolve(res.data))
    .catch(err => showMessage({type:'error', color:'white', backgroundColor: 'red', message:'Error logging in', description: err.response.data.msg}))
}

const login = ({ username, password }) => {
    console.log(username, password)

    return axios.post('http://127.0.0.1:5000/login', {
        username,
        password
    } )
    .then(res => Promise.resolve(res.data))
    .catch(err => showMessage({type:'error', color:'white', backgroundColor: 'red', message:'Error logging in', description: err.response.data.msg}))
}

export {
    signUp,
    login
}