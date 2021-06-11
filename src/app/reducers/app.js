const initialState = {
	is_launched_account: false,
    token: null
    // alert: { 'show': false, 'text': null, 'type': null }
};
export default function app(state = initialState, action) {
	if(action.type === "LAUNCH_ACCOUNT"){
        return { ...state, is_launched_account: true , token: action.payload.token}
    }else if(action.type === "APP_LOGOUT"){
        return { ...state, is_launched_account: false}
    }else{
        return state;
    }
}