const initialState = {
	loading: false,
	alert: { 'show': false, 'text': null, 'type': null },
	token: null,
  	refresh: null,
};
export default function auth(state = initialState, action) {
	if(action.type === "AUTH_REQUEST"){
		return {...state, 'loading': true } 
	}else if(action.type === "AUTH_SUCCESS"){
		return {...state, 'loading': false, token: action.payload.token, refresh: action.payload.refresh}
	}
	// else if(action.type === "AUTH_FAIL"){
	// 	return {...state, 'loading': false, alert: action.payload }
	// }
	else{
		return state;
	}
}