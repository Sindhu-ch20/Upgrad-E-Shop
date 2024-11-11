const initialState = {
    response : {},
    requestMade : false,
    userDetails : {},
    sessionIsActive : null
}

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_LOGIN_FIELDS":{
            return{
                ...state,
                response : {...action.responseLogin},
                requestMade : action.requestMade,
                userDetails : {...action.responseLogin.data}
            };
        }

        case "CHECK_SESSION_ACTIVE":{
            let userData = sessionStorage.getItem('loginToken');
            if(userData){
                return{
                    ...state,
                    sessionIsActive : true
                }
            }
            return{
                ...state,
                sessionIsActive : false
            }
        }

        case "LOGOUT_SESSION":{
            sessionStorage.removeItem("loginData");
            sessionStorage.removeItem("loginToken");
            return{
                ...state,
                sessionIsActive : false
            }
        }

        default:{
            return state;
        }
    }
};

export default loginReducer;