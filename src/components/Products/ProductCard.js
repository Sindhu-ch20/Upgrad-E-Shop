import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, 
    Stack, Typography, Dialog, DialogActions, DialogTitle,  DialogContent, DialogContentText} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationCard from '../Notifications/NotificationCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveProduct } from '../../common/redux/actions/productActions';
import { deleteProduct } from '../../common/services/productService';


const ProductCard = ({productData, user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const[messageBoxState, setShowMessage] = useState(false);
  const[messageDetails, setMessageDetails] = useState({
    messageText : '',
    messageColor : ''
  });
   
  const handleOpenBox = () => {
    setShowMessage(true);
    setTimeout(()=>{
      setShowMessage(false);
      window.location.reload();
    }, 2000);
   };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleBuyProduct = () => {
    dispatch(setActiveProduct(productData.id));
    navigate(`/products/${productData.id}`);
  };

  const handleModifyProduct = () => {
    navigate('/products/modify',{
        state : {
            productData
        }
    })
  }

  const handleDeleteProduct = () => {
    deleteProduct(productData.id).then((response)=>{
        setMessageDetails({...messageDetails, messageText : 'Order Deleted Successfully!', messageColor : 'green'});
    }).catch((error)=>{
        setMessageDetails({...messageDetails, messageText : 'Some error occured while product deletion!', messageColor : 'red'});
    })
    handleDialogClose();
    handleOpenBox();
  }



    return (
      <Card sx={{ width: 315, height: '88%', mt: '4vh', mb: '3vh' }}>
      <CardMedia
          component="img"
          image={productData.imageUrl}
          sx={{ width: '100%', height: 200, objectFit: 'cover' }}
          title={productData.name}
      />

      <CardContent sx={{ minHeight: 120 }}>
          <Stack direction="row" justifyContent="space-between">
              <Typography gutterBottom variant="h6" sx={{ fontSize: '1.1rem', flexGrow: 1 }}>
                  {productData.name}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ fontSize: '1.1rem' }}>
                  ₹{productData.price}
              </Typography>
          </Stack>
          <Typography color="gray" variant="body2" sx={{ fontWeight: 100 }}>
              {productData.description.length > 120 ? `${productData.description.slice(0, 120)}...` : productData.description}
          </Typography>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems : 'center' }}>
          <Button onClick={handleBuyProduct} size="small" variant="contained" sx={{ backgroundColor: "#3f51b5" }}>Buy</Button>
          {user === "admin" &&
              <div>
                  <IconButton onClick={handleModifyProduct}>
                      <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDialogOpen}>
                      <DeleteIcon />
                  </IconButton>
              </div>
          }
      </CardActions>

      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm deletion of product!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{backgroundColor : '#3f51b5'}} onClick={handleDeleteProduct}>OK</Button>
          <Button variant='outlined' sx={{color : '#3f51b5'}} onClick={handleDialogClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <NotificationCard messageState={messageBoxState} message={messageDetails.messageText} bgcolor={messageDetails.messageColor}/>
        
  </Card>
    );
};

export default ProductCard;