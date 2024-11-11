import React, { useEffect, useState } from "react";
import CategoriesToggle from "./ProductCategory";
import ProductCard from "./ProductCard";
import SortProduct from "./SortProduct";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationCard from "../Notifications/NotificationCard";
import { useDispatch, useSelector } from "react-redux";
import { isSessionActive } from "../../common/redux/actions/loginActions";
import { getCategories, getProducts } from "../../common/redux/actions/productActions";
import { Grid2 } from "@mui/material";

const Product = ({user}) => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const checkLoggedIn = useSelector(state => state.loginStore);
    const pdtStore = useSelector(state => state.productStore);

    const[messageBoxState, setShowMessage] = useState(false);
    const[productCatalogue, setProductCatalogue] = useState([]);
    const[refreshCat, setRefreshCat] = useState(false);

    const[messageDetails, setMessageDetails] = useState({
      messageText : '',
      messageColor : ''
    });
    
    const[activeCategory, setActiveCategory] = useState("all");

    useEffect(()=>{
      dispatch(isSessionActive());
      dispatch(getCategories());
      dispatch(getProducts());
    },[dispatch]);

    useEffect(()=>{
      if(checkLoggedIn.sessionIsActive === false){
        navigate('/login');
      }
    },[checkLoggedIn.sessionIsActive]);

    const handleOpenBox = () => {
        setShowMessage(true);
        setTimeout(()=>{
          setShowMessage(false);
        }, 2000);
    }


    useEffect(()=>{
      setProductCatalogue(pdtStore.productsView);
    },[pdtStore.productsView, activeCategory]);

    useEffect(()=>{
      if(activeCategory === 'all'){
        setProductCatalogue(pdtStore.productsView);
      } else{
        let newCatArr = pdtStore.productsView.filter((item)=>{
          if(item.category === activeCategory) return item;
        });
        setProductCatalogue(newCatArr);
      }
    },[activeCategory]);

    useEffect(()=>{
      setProductCatalogue(productCatalogue);
    },[refreshCat]);

    useEffect(()=>{ 
      if(location.state){
        setMessageDetails({...messageDetails, messageText : location.state.message, messageColor : location.state.color});
        handleOpenBox();
      }
    },[location.state]);

    return(
        <>
          <CategoriesToggle setCategory={setActiveCategory} data={pdtStore.responseCategories.data}/>
          <SortProduct pdtCat={productCatalogue} setProductCatalogue={setProductCatalogue} refreshCat ={refreshCat} setRefreshCat={setRefreshCat}/>
          <Grid2 sx={{padding : '0vh 3vw 5vh 10vw'}} justifyContent={'center'} container>
          {
            (productCatalogue) 
             ? productCatalogue.map((product,index)=>
              <Grid2 md={4} key={index}>
                   <ProductCard user={user} key={product.id} productData={product}/>
              </Grid2>)
             :<></>
          }
          </Grid2>
          <NotificationCard messageState={messageBoxState} message={messageDetails.messageText} bgcolor={messageDetails.messageColor}/>
        </>
    )
}

export default Product;