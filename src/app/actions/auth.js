
import axios from 'axios'

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        localStorage.removeItem('expireDate')
        localStorage.removeItem('is_launched_account')
        dispatch({ type : 'APP_LOGOUT'}) 
    }
}

export const parseJwt = (_token) => {
    let _payload = _token.split('.')[1]
    let payload = Buffer.from(_payload, 'base64')
    return JSON.parse(payload.toString()) 
}

export const checkAuthTimeout = expireTime => {
    return dispatch => {
      setTimeout(() => {
        dispatch(logout()) 
      }, expireTime * 1000)
    }
}


export const checkAuthState = () => {
    return dispatch => {
      const _token = localStorage.getItem('token')
      const _refresh = localStorage.getItem('refresh')
      if (!_token) {
        dispatch(logout())
      } else {
        const expirationDate = new Date(localStorage.getItem('expireDate'))
        if (expirationDate < new Date()) {
        //   dispatch(logout())
            let _refresh_payload = parseJwt(_refresh)
            if (_refresh_payload.exp > new Date()){
                dispatch(getTokenAuth(_refresh))
            }
        } else {
            dispatch({ type : 'AUTH_SUCCESS',
                payload: { 'token' : _token, 'refresh': _refresh}
            })
          dispatch(
            checkAuthTimeout(
              (expirationDate.getTime() - new Date().getTime()) / 1000
            )
          );
        }
      }
    };
  }

export const getTokenAuth = refresh => {
    return dispatch => {
        let data = ''

        let url=
            "https://stg.snb.link/api/v1/login/refresh"
        
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + refresh 
            }
        }
             
    axios
        .post(url, data, axiosConfig)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('refresh', res.data.refresh)
            dispatch({ type : 'AUTH_SUCCESS', 
                payload: { 'token' : res.data.token, 'refresh': res.data.refresh} 
            })
        })
        .catch(err => {
            console.log(err)
        });        
    }
}  

export const auth = (_username, _password) => {
    return dispatch => {
        dispatch({ type : 'AUTH_REQUEST'})
        let auth_data = JSON.stringify(
            {
                username: _username,
                password: _password
            }
        )

        let url=
            "https://stg.snb.link/api/v1/login"

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }  
        
    axios
      .post(url, auth_data, axiosConfig)
      .then(res => {
            let _token_payload = parseJwt(res.data.token)
            const expireDate = new Date(
                ( _token_payload.iat * 1000 ) + ( _token_payload.exp * 1000 )
            )
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('refresh', res.data.refresh)
            localStorage.setItem('expireDate', expireDate)
            localStorage.setItem('is_launched_account', 'true')
            dispatch({ type : 'AUTH_SUCCESS', 
                payload: { 'token' : res.data.token, 'refresh': res.data.refresh} 
            })
            dispatch({ type : 'LAUNCH_ACCOUNT', payload: { 'token' : res.data.token } 
            // payload: { 'text': language.tokens['YOU_HAVE_SUCCESSFULLY_LOGGED_IN_TO_YOUR_ACCOUNT'], show : true, type: 'success' }
        })
            // dispatch(checkAuthTimeout(_token_payload.exp))
      })
        .catch(err => {
            console.log(err)
            // dispatch({ type : 'AUTH_FAIL', 
            //     payload: { 'text': err , show : true, type: 'error' } 
            // })
        });
    }
} 