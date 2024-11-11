import Axios from 'axios';

export const login = async (email,password) => {
    const url = 'https://dev-project-ecommerce.upgrad.dev/api/auth/signin';
    return await Axios.post(url, {
        "password": password,
        "username": email
      });
};


export const saveSession =  (loginDetails) => {
  sessionStorage.setItem("loginData", JSON.stringify(loginDetails.response.data));
  sessionStorage.setItem("loginToken", loginDetails.response.headers['X-Auth-Token']);
}