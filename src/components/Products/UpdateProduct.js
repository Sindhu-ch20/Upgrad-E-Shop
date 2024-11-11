import React, { useEffect, useState } from "react";
import { Typography, TextField, Stack, Button} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProduct } from "../../common/services/productService";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const[modifiedDetails,setModifiedProductDetails] = useState({
        "availableItems": 0,
        "category": "",
        "description": "",
        "imageUrl": "",
        "manufacturer": "",
        "name": "",
        "price": 0 
    });

    useEffect(()=>{
        if(!location.state){
            navigate('/products');
        }
    })

    useEffect(()=>{
        if(location.state){
            setModifiedProductDetails(location.state.productData);
        }
    },[location.state]);

    const handleModifyProduct = () => {
        if(modifiedDetails.name.length < 1){
            alert('Product name cannot be Empty');
            return;
          }
  
          if(modifiedDetails.category.length < 1){
            alert('Category cannot be Empty.');
            return;
          }
  
          if(modifiedDetails.manufacturer.length < 1){
            alert('Manufacturer cannot be Empty.');
            return;
          }
  
          const avItems = parseInt(modifiedDetails.availableItems);
          if(!(avItems && avItems > 0)){
            alert('Available items should be >= 1.');
            return; 
          }
  
          const priceVal = parseInt(modifiedDetails.price);
          if(!(priceVal && priceVal > -1)){
            alert('Please enter price > 0.');
            return;
          }

          updateProduct(modifiedDetails).then(()=>{
            alert("Product updated successfully!");
            navigate('/products');
          }).catch((error)=>{
            alert("Something went wrong while updating the product! Please try again.")
          });

    }

    return(
        <>
        <Stack useFlexGap minHeight={"90vh"} className='' direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
            <Typography sx={{ marginTop : 1, marginBottom : 2 }} variant='h5'> Modify Product</Typography>
            <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setModifiedProductDetails({...modifiedDetails, name : e.target.value})} value={modifiedDetails.name} label="Name" variant="outlined" autoComplete='on' required/> 
            <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setModifiedProductDetails({...modifiedDetails, category : e.target.value})} value={modifiedDetails.category} label="Category" variant="outlined" autoComplete='on' required/> 
            <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setModifiedProductDetails({...modifiedDetails, manufacturer : e.target.value})} value={modifiedDetails.manufacturer} label="Manufacturer" variant="outlined" autoComplete='on' required/> 
            <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setModifiedProductDetails({...modifiedDetails, availableItems : e.target.value})} value={modifiedDetails.availableItems} label="Available Items" variant="outlined" autoComplete='on' required/> 
            <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setModifiedProductDetails({...modifiedDetails, price : e.target.value})} value={modifiedDetails.price} label="Price" variant="outlined" autoComplete='on' required/> 
            <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setModifiedProductDetails({...modifiedDetails, imageUrl : e.target.value})} value={modifiedDetails.imageUrl} label="Image URL" variant="outlined" autoComplete='on'/> 
            <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setModifiedProductDetails({...modifiedDetails, description : e.target.value})} value={modifiedDetails.description} label="Product Description" variant="outlined" autoComplete='on'/> 
            
            <Button onClick={handleModifyProduct} variant="contained" sx={{backgroundColor : '#3f51b5', marginTop : 2, width : 1/4}}> MODIFY PRODUCT </Button>
        </Stack>
        </>
    );
};

export default UpdateProduct;