const initialState = {
    activeAddress : {}
};

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_ACTIVE_ADDRESS":{
            return {
                ...state,
                activeAddress : {...action.addressDetails}
            }
        }

        case "CLEAR":{
            return {
                ...initialState
            }
        }

        default:{
            return state;
        }
    }
}

export default orderReducer;