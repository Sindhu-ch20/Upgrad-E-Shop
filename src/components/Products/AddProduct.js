import React, { useEffect, useState } from "react";
import { Typography, TextField, Stack, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "../../common/services/productService";
const AddProduct = () => {

    const navigate = useNavigate();
    const[newProductDetails,setNewProductDetails] = useState({
        "availableItems": 0,
        "category": "",
        "description": "",
        "imageUrl": "",
        "manufacturer": "",
        "name": "",
        "price": 0 
      });

      useEffect(()=>{
        if(sessionStorage.getItem('loginData')){
           const authPage = JSON.parse(sessionStorage.getItem('loginData')).roles.includes("ADMIN");
           if(!authPage){
            navigate("/products");
           }
        } else{
          navigate("/products");
        }
      });

      const handleAddNewProduct = () => {
        if(newProductDetails.name.length < 1){
          alert('Product name cannot be Empty.');
          return; 
        }

        if(newProductDetails.category.length < 1){
          alert('Category cannot be Empty.');
          return;
        }

        if(newProductDetails.manufacturer.length < 1){
          alert('Manufacturer cannot be Empty.');
          return;
        }

        const avItems = parseInt(newProductDetails.availableItems);
        if(!(avItems && avItems > 0)){
          alert('Available items should be >= 1.');
          return;
        }

        const priceVal = parseInt(newProductDetails.price);
        if(!(priceVal && priceVal > -1)){
          alert('Please enter price > 0.');
          return;
        }

        addNewProduct(newProductDetails)
        .then((response)=>{
          alert("Product Added successfully");
          navigate('/products');
        }).catch((error)=>{
          alert("Something went wrong while adding new product");
        });

      }

return(
    <>
    <Stack useFlexGap minHeight={"90vh"} className='' direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
        <Typography sx={{ marginTop : 1, marginBottom : 2 }} variant='h5'>Add Product</Typography>
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setNewProductDetails({...newProductDetails, name : e.target.value})} value={newProductDetails.name} label="Name" variant="outlined" autoComplete='on' required/> 
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setNewProductDetails({...newProductDetails, category : e.target.value.toLowerCase()})} value={newProductDetails.category} label="Category" variant="outlined" autoComplete='on' required/> 
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setNewProductDetails({...newProductDetails, manufacturer : e.target.value})} value={newProductDetails.manufacturer} label="Manufacturer" variant="outlined" autoComplete='on' required/> 
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setNewProductDetails({...newProductDetails, availableItems : e.target.value})} value={newProductDetails.availableItems} label="Available Items" variant="outlined" autoComplete='on' required/> 
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setNewProductDetails({...newProductDetails, price : e.target.value})} value={newProductDetails.price} label="Price" variant="outlined" autoComplete='on' required/> 
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setNewProductDetails({...newProductDetails, imageUrl : e.target.value})} value={newProductDetails.imageUrl} label="Image URL" variant="outlined" autoComplete='on'/> 
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setNewProductDetails({...newProductDetails, description : e.target.value})} value={newProductDetails.description} label="Product Description" variant="outlined" autoComplete='on'/> 
        
        <Button onClick={handleAddNewProduct} variant="contained" sx={{backgroundColor : '#3f51b5', marginTop : 2, width : 1/4}}> SAVE PRODUCT </Button>
        </Stack>
    </>
);
};

export default AddProduct;