import { fetchCategories, fetchProducts, getProductDetails } from "../../services/productService";

export const getCategories = () => dispatch => {
    fetchCategories().then((response)=>{
        dispatch({
            type : "INIT_CATEGORIES",
            responseCatService : response
       }) 
    }).catch((response)=>{
        dispatch({
            type : "INIT_CATEGORIES",
            responseCatService : response
       }) 
    });
};

export const getProducts = () => dispatch =>{
    fetchProducts().then((response)=>{
        dispatch({
            type : "INIT_PRODUCTS",
            responseProductService : response
        })
    }).catch((response)=>{
        dispatch({
            type : "INIT_PRODUCTS",
            responseProductService : response
        })
    })
}

export const setProductsView = (searchString) => {
    return{
        type : "SET_PRODUCTS_VIEW",
        searchString
    }
}

export const clearProducts = () => {
    return{
        type : "CLEAR",
    }
}

export const setActiveProduct = (productID) => dispatch => {
    getProductDetails(productID).then((productResponse)=>{
        dispatch({
            type : "SET_ACTIVE_PRODUCT",
            productResponse
        })
    }).catch((productResponse)=>{
        dispatch({
            type : "SET_ACTIVE_PRODUCT",
            productResponse
        })
    })
}