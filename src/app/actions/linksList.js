import axios from 'axios'

export const removeItemStart = (id, token) => {
    return dispatch => {
       
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'                
            }
        }
    axios
      .delete(
        `https://stg.snb.link/api/v1/links/${id}`, axiosConfig
      )
      .then(res => {
            dispatch({ type : 'REMOVE_ITEM_SUCCESS' , payload: { linkId: id } }) 
      })
      .catch(err => {
        console.log(err)
      });
    }
}

export const linksList = config => {
    return dispatch => {
        dispatch({ type : 'LINKS_LIST_REQUEST'})
        let params = config.params
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + params.token,
                'Content-Type': 'application/json'                
            }
        } 
     axios
        .get(
            `https://stg.snb.link/api/v1/links?page=${params.page}&size=${params.results}`, axiosConfig
            )
        .then(res => {
            dispatch({ type : 'SET_LIST_ITEMS' , payload: { 'data': res.data['links'] } })
        })
        .catch(err => {
            console.log(err)
        });            
    } 

}

