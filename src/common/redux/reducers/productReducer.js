const initialState = {
    responseCategories : [],
    responseProducts : [],
    productsView : [],
    activeProduct : {}
};

const productReducer = (state = initialState, action) => {
    switch(action.type){
        case "INIT_CATEGORIES":{
            return {
                ...state,
                responseCategories : {...action.responseCatService}
            }
        }

        case "INIT_PRODUCTS":{
            return {
                ...state,
                responseProducts : {...action.responseProductService},
                productsView : [...action.responseProductService.data]
            }
        }

        case "SET_PRODUCTS_VIEW":{
            let newPdtArray = state.responseProducts?.data.filter((item)=>{
                if(!item.name.toLowerCase().includes(action.searchString.toLowerCase())){}
                else return item;
            });

            return{
                ...state,
                productsView : [...newPdtArray]
            }
        }

        case "SET_ACTIVE_PRODUCT":{
            return{
                ...state,
                activeProduct : {...action.productResponse}
            }
        }

        case "CLEAR":{
            return{...initialState}
        }

        default:{
            return state;
        }
    }
}

export default productReducer;