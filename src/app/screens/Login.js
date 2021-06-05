import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoginPassword from '../components/LoginPassword'
import LoginLayout from '../components/LoginLayout'
import language from '../resources/js/languages_dict'
import * as actions from '../actions'

export const Login = () => {
    const [user_name, set_user_name] = useState('')
    const [password, set_password] = useState('')
    const [button_status, set_button_status] = useState({ status: false, error: null })
    const loading_status = useSelector(state => state.auth.loading)
    const alert = useSelector(state => state.auth.alert)
    const dispatch = useDispatch()

    const validation_form = (username, pass) => {
        dispatch(actions.auth(username, pass))
    }

    const usernameHandler = (e) => {
        set_user_name(e.target.value)
    }

    const passwordHandler = (e) => {      
        set_password(e.target.value)
    }

    const submitHandler = (e) => { 
        e.preventDefault()

        //login validation
        if (user_name.length > 200) {
            set_button_status({ status: false, error: language.tokens['MAX_USER_NAME_CHAR_LIMIT'] })
        }else if(password.length > 72){
            set_button_status({ status: false, error: language.tokens['MAX_PASS_CHAR_LIMIT'] })
        }else if (user_name === '' && password === '') {
            set_button_status({ status: false, error: language.tokens['ENTER_USER_NAME_AND_VERIFICATION_CODE'] })
        }
        // else if (/.*\#/g.test(user_name) === true) {           
        //     set_button_status({ status: false, error: language.tokens['YOU_CAN_ONLY_USE_ALPHABETS_NUMBERS_AND_UNDERLINE'] })
        // }else if (!/[a-z]/.test(password)) {
        //     set_button_status({ status: false, error: language.tokens['LOWERCASE_LETTER_ERROR'] })
        // }else if (!/[A-Z]/.test(password)) {
        //     set_button_status({ status: false, error: language.tokens['CAPITAL_LETTER_ERROR'] })
        // }else if (!/[0-9]/.test(password)) {
        //     set_button_status({ status: false, error: language.tokens['NUMBER_ERROR'] })
        // }else if (!/^[a-zA-Z0-9]+$/.test(password)) {
        //     set_button_status({ status: false, error: language.tokens['PASSWORD_LETTER_ERROR'] })
        // }
        else {
            set_button_status({ status: false, error: null })
            validation_form(user_name, password)
        }
    }

    useEffect(() => {
        if (user_name && password) {
            set_button_status({ status: false, error: null })
        } else if((user_name === '' && password !== '') || (user_name !== '' && password === '')){
            set_button_status({ status: true, error: null })
        } else {
            set_button_status({ status: false, error: null })
        }
    }, [user_name, password]) 

    let inner_box = null
    inner_box = (
            <LoginPassword
               userName={user_name}
               onChangeUsername={usernameHandler}
               passwordValue={password}
               onChangePassword={passwordHandler}
               onSubmitForm={(e) => submitHandler(e)}
               errorMessage={button_status}
               loading={loading_status}
               messageAuth={alert}
            />           
    )

    return (
        <LoginLayout>
            {inner_box}
        </LoginLayout>
    )
}

export default Login;