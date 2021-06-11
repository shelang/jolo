const initialState = {
	loading: false,
    alert: { 'show': false, 'text': null, 'type': null },
};
export default function createlink(state = initialState, action) {
	if(action.type === "CREATE_LINK_REQUEST"){
        return { ...state, 'loading': true}
    }else if(action.type === "CREATE_LINK_SUCCESS"){
        return { ...state, 'loading': false, alert: action.payload }
    }else if(action.type === "CODE_SET_ALERT"){
		return {...state, 'loading': false, 'alert': { 'show': false, 'text': null, 'type': null }  }
	}
    // else if(action.type === "CREATE_LINK_FAIL"){
    //     return { ...state}
    // }
    else{
        return state;
    }
}