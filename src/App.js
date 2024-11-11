import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import {Route, Routes, Navigate ,useLocation} from "react-router-dom";
import Signup from './components/Signup';
import Product from './components/Products/Product';
import ProductDetails from './components/Products/ProductDetails';
import OrderPage from './components/Order/Orders';
import AddProduct from './components/Products/AddProduct';
import UpdateProduct from './components/Products/UpdateProduct';
import NavBar from './common/NavBar';

function App() {
  const location = useLocation();
  const [navparam, setNavParam] = useState();
  const [userRole, setUserRole] = useState("user");

  useEffect(()=>{
    if(location.pathname === "/login") setNavParam("login");
    else if(location.pathname === "/signup") setNavParam("signup");
    else{
      setNavParam("logged");
    }
  },[location.pathname]);

  useEffect(()=>{
    let userDetails = JSON.parse(sessionStorage.getItem('loginData'));
    if(userDetails){
      if(userDetails.roles.includes('ADMIN')) setUserRole('admin');
      else setUserRole('user');
    }
  },[]);

  return (
    <>
    <NavBar page={navparam} user={userRole}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path='/products' element={<Product user={userRole}/>}/>
        <Route path='/products/add' element={<AddProduct/>}/>
        <Route path='/products/modify' element={<UpdateProduct/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
        <Route path='/products/:id/order' element={<OrderPage/>}/>
      </Routes>
    </>
  );
}

export default App;
