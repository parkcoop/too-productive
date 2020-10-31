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
    console.log(username, password)

    return axios.post('http://10.0.0.177:5000/login', {
        username,
        password
    } )
    .then(res => {
        // PushNotification.localNotificationSchedule({
        //     //... You can use all the options from localNotifications
        //     id: uuidv4,
        //     message: "Come back to me", // (required)
        //     date: new Date(Date.now() + 30 * 1000), // in 60 secs
        //     allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        // });
        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: "lololol", // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
            title: "Welcome to Native Notes", // (optional)
            message: "This was probably unnecessary", // (required)
          });
        
        return Promise.resolve(res.data)})
    .catch(err => {
        console.log(err)
        showMessage({type:'error', color:'white', backgroundColor: 'red', message:'Error logging in', description: err.response?.data?.msg})})
}

const saveReminder = ({ description, reminderDate, notificationId}) => {
    console.log("NEW REMINDER", description, reminderDate, notificationId)
    return axios.post('http://10.0.0.177:5000/reminder', {
        description,
        reminderDate,
        notificationId
    })
    .then(res => Promise.resolve(res.data))
    // .catch(err => showMessage({type:'error', color:'white', backgroundColor: 'red', message:'Error saving notification', description: err.response?.data?.msg}))
}

export {
    signUp,
    login,
    saveReminder
}