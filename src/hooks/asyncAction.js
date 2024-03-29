import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiClient from '../utils/apiClient'
import { toast } from 'react-toastify'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, error: null, response: null }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        response: action.payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        response: null,
      }
    default:
      return state
  }
}

function useFetch(action) {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    error: null,
    response: null,
  })
  const navigate = useNavigate()

  function performAction(options) {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: 'FETCH_INIT' })
        const res = await ApiClient(options.url, options)
        action && action.onSuccess && action.onSuccess(res)
        dispatch({ type: 'FETCH_SUCCESS', payload: res })
        resolve(res)
      } catch (e) {
        if (e.status === 401) {
          navigate('/refresh')
        }
        reject()

        action && action.onError && action.onError(e)
        dispatch({ type: 'FETCH_FAILURE', payload: e })
      }
    })
  }

  return [state, performAction]
}
export default useFetch
