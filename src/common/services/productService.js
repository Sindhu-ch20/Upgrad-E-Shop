import Axios from "axios";

export const fetchCategories = async () => {
    const url = 'https://dev-project-ecommerce.upgrad.dev/api/products/categories';
    return await Axios.get(url);
}

export const fetchProducts = async () => {
    const url = 'https://dev-project-ecommerce.upgrad.dev/api/products';
    return await Axios.get(url);
}

export const getProductDetails = async (productID) => {
    const url = `https://dev-project-ecommerce.upgrad.dev/api/products/${productID}`;
    return await Axios.get(url);
}

export const addNewProduct = async (productDetails) => {
    const url = 'https://dev-project-ecommerce.upgrad.dev/api/products';
    const loginToken = sessionStorage.getItem('loginToken');
    const userInfo = {
        headers: {
          'X-Auth-Token': `${loginToken}`,
          'Content-Type': 'application/json',
        },
    };
    return await Axios.post(url, productDetails,userInfo);
};

export const updateProduct = async (productDetails) => {
    const url = `https://dev-project-ecommerce.upgrad.dev/api/products/${productDetails.id}`;
    const loginToken = sessionStorage.getItem('loginToken');
    const userInfo = {
        headers: {
          'X-Auth-Token': `${loginToken}`,
          'Content-Type': 'application/json',
        },
    };
    return await Axios.put(url, productDetails,userInfo);
};

export const deleteProduct = async (productID) => {
    const url = `https://dev-project-ecommerce.upgrad.dev/api/products/${productID}`;
    const loginToken = sessionStorage.getItem('loginToken');
    const userInfo = {
          'X-Auth-Token': `${loginToken}`,
          'Content-Type': 'application/json',
    };

    return await Axios.delete(url, {
        data: {},
        headers: userInfo,
    });
};