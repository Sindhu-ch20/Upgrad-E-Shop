import Axios from 'axios';

export const addAddress = async (addressDetails) => {
    const url = 'https://dev-project-ecommerce.upgrad.dev/api/addresses';
    const loginToken = sessionStorage.getItem('loginToken');
      
    const userInfo = {
           headers: {
             'X-Auth-Token': `${loginToken}`,
             'Content-Type': 'application/json',
           },
    };
    return await Axios.post(url, addressDetails, userInfo);
};

export const getSavedAddresses = async () => {
    const url = 'https://dev-project-ecommerce.upgrad.dev/api/addresses';
    const loginToken = sessionStorage.getItem('loginToken');

    const userInfo = {
          'X-Auth-Token': `${loginToken}`,
          'Content-Type': 'application/json',
    };
    return await Axios.get(url, {
        headers: userInfo,
    });
}

export const placeOrder = async (productInfo, addressInfo) =>{
    const url = 'https://dev-project-ecommerce.upgrad.dev/api/orders';
    const loginToken = sessionStorage.getItem('loginToken');
    const userID = JSON.parse(sessionStorage.getItem('loginData')).id;

    const userInfo = {
        headers: {
          'X-Auth-Token': `${loginToken}`,
          'Content-Type': 'application/json',
        },
    };

    const orderData = {
        "address": addressInfo.id,
        "product": productInfo.productDetails.id,
        "quantity": productInfo.productQty,
        "user": userID
    }

    return await Axios.post(url,orderData,userInfo);
}