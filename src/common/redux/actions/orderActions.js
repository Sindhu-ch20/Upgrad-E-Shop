export const setActiveAddress = (addressDetails) => {
    return{
        type : "SET_ACTIVE_ADDRESS",
        addressDetails
    }
};

export const clearAddress = () => {
    return{
        type : "CLEAR",
    }
};