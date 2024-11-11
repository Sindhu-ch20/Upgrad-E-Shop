import Axios from "axios";

export const signUpUser = async (user) => {
    const url = 'https://dev-project-ecommerce.upgrad.dev/api/auth/signup';
    return await Axios.post(url,user);
}