import { login } from "../../services/loginService"

export const loginSession = (email,password) => dispatch => {
    login(email, password).then((response)=>{
        dispatch({
            type : "SET_LOGIN_FIELDS",
            responseLogin : response,
            requestMade : true
       }) 
    }).catch((response)=>{
        dispatch({
            type : "SET_LOGIN_FIELDS",
            responseLogin : response,
            requestMade : true
       }) 
    })
};

export const isSessionActive = () => {
    return {
        type : "CHECK_SESSION_ACTIVE"
    };
};

export const logoutSession = () => {
    return {
        type : "LOGOUT_SESSION"
    }
}
