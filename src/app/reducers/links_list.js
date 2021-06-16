const initialState = {
	loading: false,
    data: []
};
export default function links_list(state = initialState, action) {
	if(action.type === "LINKS_LIST_REQUEST"){       
        return { ...state, 'loading': true }
    } else if(action.type === "SET_LIST_ITEMS") {
        return { ...state, 'loading': false, 'data': action.payload.data }
    } else{
        return state;
    }
}