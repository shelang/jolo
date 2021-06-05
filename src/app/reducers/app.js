const initialState = {
	is_launched_account: false,
    alert: { 'show': false, 'text': null, 'type': null }
};
export default function app(state = initialState, action) {
	if(action.type === "LAUNCH_ACCOUNT"){
        return { ...state, is_launched_account: true, 'alert': action.payload}
    }else if(action.type === "APP_SET_ALERT"){
		return {...state, is_launched_account: true, 'alert': { 'show': false, 'text': null, 'type': null }  }
	}else if(action.type === "APP_LOGOUT"){
        return { ...state, is_launched_account: false}
    }else{
        return state;
    }
}