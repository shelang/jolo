import { message } from 'antd';

export default function notify(_message, type) {

    // global.store.dispatch({ 'type': 'APP_SET_ALERT', 'payload': { 'show': false, 'text': '', 'type': '' } })
    if(_message !== '' && type){
        switch (type) {
            case 'success':
                message.success(_message)
                break;
            case 'error':
                message.error(_message)
                break;       
            default:
                message.success(_message)
        }
    }
}