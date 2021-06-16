import axios from 'axios'

export const setListItems = (listItems) => {
    let currentData = []
    for (let key in listItems) {
        currentData.push({
        ...listItems[key],
        id: key
      });
    }
    return dispatch => {
        dispatch({ type : 'SET_LIST_ITEMS' , payload: { 'data': currentData } }) 
    }
}

export const linksList = (config) => {
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
            dispatch(setListItems(res.data))
          
        })
        .catch(err => {
            console.log(err)
        });            
    } 

}