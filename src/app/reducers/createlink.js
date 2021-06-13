const initialState = {
	loading: false,
    alert: { 'show': false, 'text': null, 'type': null },
    user: { 'exist': false },
    data: []
};
export default function createlink(state = initialState, action) {
	if(action.type === "CREATE_LINK_REQUEST"){
        return { ...state, 'loading': true}
    }else if(action.type === "CREATE_LINK_SUCCESS"){
        return { ...state, 'loading': false, 'alert': action.payload.alert , 'user': { 'exist': true }, 'data': action.payload.data }
    }else if(action.type === "CREATE_USER_NOT_EXIST"){
		return {...state, 'user': {'exist': false } }
	}
    // else if(action.type === "CREATE_LINK_FAIL"){
    //     return { ...state}
    // }
    else{
        return state;
    }
}