const initialState = {
	loading: false,
};
export default function createlink(state = initialState, action) {
	if(action.type === "CREATE_LINK_REQUEST"){
        return { ...state, 'loading': true}
    }else if(action.type === "CREATE_LINK_SUCCESS"){
        return { ...state, 'loading': false}
    }
    // else if(action.type === "CREATE_LINK_FAIL"){
    //     return { ...state}
    // }
    else{
        return state;
    }
}