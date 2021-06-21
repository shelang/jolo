const initialState = {
	loading: false,
    data: []
};
export default function links_list(state = initialState, action) {
	if(action.type === "LINKS_LIST_REQUEST"){       
        return { ...state, 'loading': true }
    } else if(action.type === "SET_LIST_ITEMS") {
        return { ...state, 'loading': false, 'data': action.payload.data }
    } else if(action.type === "REMOVE_ITEM_SUCCESS"){
        return {...state, data: state.data.filter(item => item.linkId !== action.payload.linkId )}
    } else{
        return state;
    }
}