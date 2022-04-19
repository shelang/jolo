import { useReducer } from 'react';
import ApiClient from '../utils/apiClient';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, error: null, response: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        response: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        response: null,
      };
    default:
      return state;
  }
};

function useFetch(action) {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    error: null,
    response: null,
  });

  async function performAction(options) {
    try {
      dispatch({ type: 'FETCH_INIT' });
      const res = await ApiClient(options.url, options);
      action && action.onSuccess && action.onSuccess(res);
      dispatch({ type: 'FETCH_SUCCESS', payload: res });
    } catch (e) {
      action && action.onError && action.onError(e);
      dispatch({ type: 'FETCH_FAILURE', payload: e });
    }
  }

  return [state, performAction];
}
export default useFetch;
