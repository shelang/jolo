
import axios from 'axios'

export const createLink = (_title, _url, _status, _mode, _exp, _des, _hash, _param, token) => {
    return dispatch => {     
        dispatch({ type : 'CREATE_LINK_REQUEST'})
        let _expire_at = new Date(_exp)
        let _milisecond = _expire_at.getTime()
        _param = !_param || _param === undefined ? 0 : 1
        _hash = _hash === '' ? null : _hash
        
        let data = JSON.stringify(
            {
                title: _title,
                url: _url,
                status: _status,
                redirectCode: _mode,
                expireAt: _milisecond,
                description: _des,
                hash: _hash, 
                forwardParameter: _param
            }
        )

        let url=
            "https://stg.snb.link/api/v1/links"
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            }
        } 
     axios
       .post(url, data, axiosConfig)
       .then(res => {
           console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!", res)
            dispatch({ type : 'CREATE_LINK_SUCCESS'
            // , 
            //      payload: { } 
            })
        })
        .catch(err => {
            console.log(err)
            // dispatch({ type : 'CREATE_LINK_FAIL', 
            //     payload: {  } 
            // })
        });   

    }
}