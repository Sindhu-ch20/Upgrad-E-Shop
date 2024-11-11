import {combineReducers} from "redux";
import loginReducer from "./loginReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
    loginStore : loginReducer,
    productStore : productReducer,
    orderStore : orderReducer
})