import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { v4 as uuidv4 } from 'uuid';
var PushNotification = require("react-native-push-notification");

const signUp = ({ username, password, fullName }) => {
    console.log(username, password, fullName)
    return axios.post('http://127.0.0.1:5000/signup', {
        username,
        password,
        fullName
    } )
    .then(res => Promise.resolve(res.data))
    .catch(err => showMessage({type:'error', color:'white', backgroundColor: 'red', message:'Error logging in', description: err.response?.data?.msg}))
}

const login = ({ username, password }) => {
    return axios.post('http://10.0.0.177:5000/login', {
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
        showMessage({type:'error', color:'white', backgroundColor: 'red', message:'Error logging in', description: err.response?.data?.msg})})
}

const saveReminder = ({ description, reminderDate, notificationId, userId}) => {
    return axios.post('http://10.0.0.177:5000/reminder', {
        description,
        reminderDate,
        notificationId,
        userId
    })
    .then(res => Promise.resolve(res.data))
    .catch(err => showMessage({type:'error', color:'white', backgroundColor: 'red', message:'Error saving notification', description: err.response?.data?.msg}))
}

const getReminders = (userId) => {
    return axios.get('http://10.0.0.177:5000/reminders', {
        params: {
            userId
        }
    })
    .then(res => Promise.resolve(res.data))
    .catch(err => {
        console.log(err.response)
        showMessage({type:'error', color:'white', backgroundColor: 'red', message:'Error logging in', description: err.response?.data?.msg})})
}

export {
    signUp,
    login,
    saveReminder,
    getReminders
}