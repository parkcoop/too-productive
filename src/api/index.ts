import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
var PushNotification = require("react-native-push-notification");

// Is this correct convention?
type SignUp = {
    username: string,
    password: string,
    fullName: string
}
type Login = {
    username: string,
    password: string,
}
type User = {
    _id: string,
    username: string,
    avatar: string
}

type AuthPayload = {
    user: User,
    token: string
}
const signUp: (arg0: SignUp) => Promise<AuthPayload> = ({ username, password, fullName }) => {
    console.log(username, password, fullName)
    return axios.post('http://192.168.86.218:5000/signup', {
        username,
        password,
        fullName
    } )
    .then(res => Promise.resolve(res.data))
    .catch(err => showMessage({type:'danger', color:'white', backgroundColor: 'red', message:'Error logging in', description: err.response?.data?.msg}))
}


const login: (arg0: Login) => Promise<AuthPayload> = ({ username, password }) => {
    return axios.post('http://192.168.86.218:5000/login', {
        username,
        password
    } )
    .then(res => {
        PushNotification.localNotification({
            channelId: "lololol", // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
            title: "Welcome to Native Notes", // (optional)
            message: "This was probably unnecessary", // (required)
          });
        
        return Promise.resolve(res.data)})
    .catch(err => {
        console.log(err)
        showMessage({type:'danger', color:'white', backgroundColor: 'red', message:'Error logging in', description: err.response?.data?.msg})})
}

type SaveReminder = {
    description: string,
    reminderDate: Date,
    notificationId: number,
    userId: string
}

const saveReminder: (arg0: SaveReminder) => Promise<{}> = ({ description, reminderDate, notificationId, userId}) => {
    return axios.post('http://192.168.86.218:5000/reminder', {
        description,
        reminderDate,
        notificationId,
        userId
    })
    .then(res => Promise.resolve(res.data))
    .catch(err => showMessage({type:'danger', color:'white', backgroundColor: 'red', message:'Error saving notification', description: err.response?.data?.msg}))
}

const getReminders: (arg0: string) => Promise<{data: []}> = (userId: string) => {
    return axios.get('http://192.168.86.218:5000/reminders', {
        params: {
            userId
        }
    })
    .then(res => Promise.resolve(res.data))
    .catch(err => {
        console.log(err.response)
        showMessage({type:'danger', color:'white', backgroundColor: 'red', message:'Error logging in', description: err.response?.data?.msg})})
}

export {
    signUp,
    login,
    saveReminder,
    getReminders
}