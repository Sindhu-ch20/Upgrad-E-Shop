import React from 'react';
import { Stack, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { placeOrder } from '../../common/services/orderServices';

const ConfirmOrderPage = ({setStep, productInfo}) => {

    const {productQty, productDetails} = productInfo;
    const totalPrice = productQty * productDetails.price;

    const navigate = useNavigate();
    const addressFromAPI = useSelector(state => state.orderStore);

    const address = addressFromAPI.activeAddress;

    const handleReturnToAddressPage = () =>{ 
        setStep(1);
    }

    const handlePlaceOrder = () =>{
        placeOrder(productInfo, address).then((response)=>{
            navigate('/products', {
                state : {
                    message : 'Order placed successfully',
                    color : 'green'
                }
            })
        }).catch((error)=>{
            navigate('/products', {
                state : {
                    message : 'Some problem occured while placing the order.',
                    color : 'red'
                }
            })
        });
    };

    return(
        <>
        <Stack useFlexGap direction={'column'} justifyContent={'center'} alignItems={'center'} width={'95vw'}>
          <Stack useFlexGap direction={'row'} justifyContent={'center'} alignItems={'center'} width={'100vw'} mt={'7vh'}>
            <Paper elevation={1} sx={{ width : '38vw', height : '50vh', padding : '4vh 2.5vw'}}>
                <Typography variant='h4'>{productDetails.name}</Typography>
                <Typography variant='body2' sx={{mt : 2}}>Quantity: <span style={{fontWeight : 'bold'}}>{productQty}</span></Typography>
                <Typography variant='body2' sx={{mt : 2}}>Category: <span style={{fontWeight : 'bold'}}>{productDetails.category.charAt(0).toUpperCase() + productDetails.category.slice(1)}</span></Typography>
                <Typography variant='subtitle2' sx={{mt : 4, fontStyle : 'italic'}}>{productDetails.description}</Typography>
                <Typography variant='h5' sx={{mt : 4, color : 'red'}}>Total Price : ₹{totalPrice}</Typography>
            </Paper>
            <Paper elevation={1} sx={{ width : '22vw', height : '50vh', ml : '2px', padding : '4vh 2.5vw'}}>
                <Typography variant='h4'>Address Details :</Typography>
                <Typography variant='body2' sx={{mt : 2}}>{address.name}</Typography>
                <Typography variant='body2' sx={{mt : '4px'}}>Contact Number: {address.contactNumber}</Typography>
                <Typography variant='body2' sx={{mt : '4px'}}>{`${address.street},${address.landmark !== "" ? " "+address.landmark+"," : ""} ${address.city}`}</Typography>
                <Typography variant='body2' sx={{mt : '4px'}}>{address.state}</Typography>
                <Typography variant='body2' sx={{mt : '4px'}}>{address.zipcode}</Typography>
            </Paper>
          </Stack>
          <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} width={'27vw'} marginTop={'2vh'}>
              <Button variant="text" onClick={handleReturnToAddressPage} sx={{ width : 1/5, color : 'black', backgroundColor : '#EEEEEE'}}> BACK </Button>
              <Button variant="contained" onClick={handlePlaceOrder} sx={{backgroundColor : '#3f51b5', width : 1/3, ml : 2}}> PLACE ORDER </Button>
          </Stack>
        </Stack>  
        </>
    );
};

export default ConfirmOrderPage;