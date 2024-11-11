import React, { useEffect, useState } from 'react';
import { Avatar, Typography, TextField, Stack, Button } from "@mui/material";
import { pink } from "@mui/material/colors";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSession, isSessionActive} from '../common/redux/actions/loginActions';
import { saveSession } from '../common/services/loginService';

const Login = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const dispatch = useDispatch();
    const responseFromStore = useSelector(state => state.loginStore);
    const navigate = useNavigate();

    useEffect(() => {
        if(responseFromStore.requestMade){
           if(responseFromStore.response.data){
             saveSession(responseFromStore);
             navigate('/products');
           }
           else{ 
              alert("Login failed due to invalid credentials or server error");
           }
        }
    }, [responseFromStore]);

    useEffect(()=>{
        dispatch(isSessionActive());
    },[dispatch]);
  
      useEffect(()=>{
        if(responseFromStore.sessionIsActive === true){
          navigate('/products');
        }
      },[responseFromStore.sessionIsActive]);

    const handleLogin = () =>{ 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if(!emailRegex.test(email)) {
           alert('Please enter a valid email address');
           return
        }
        if(password.length === 0){
           alert('Please enter the password to proceed!');
           return;
        }

        dispatch(loginSession(email,password));
    }


    return(
        <>
        <Stack useFlexGap minHeight={"90vh"} direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
        <Avatar sx={{bgcolor : pink[500]}} >
            <LockOutlinedIcon color="inherit"></LockOutlinedIcon>
        </Avatar>
        <Typography sx={{ marginTop : 1 }} variant='h6'>Sign in</Typography>
        <TextField sx={{ marginTop : 2, width : 1/4 }} onChange={(e)=>setEmail(e.target.value)} type='email' label="Email Address" value={email} variant="outlined" required/> 
        <TextField sx={{ marginTop : 2, width : 1/4 }} onChange={(e)=>setPassword(e.target.value)} type='password' label="Password" value={password} variant="outlined" autoComplete='off' required/>
        
        <Button onClick={handleLogin} variant="contained" sx={{backgroundColor : '#3f51b5', marginTop : 2, width : 1/4}}> SIGN IN </Button>
        <div style={{marginTop : "16px", textAlign: 'left', width : '25%'}}>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
        <Typography sx={{ marginTop : 20 }} variant='body2'>Copyright ©️ Upgrad 2024</Typography>
        </Stack>
        </>
    );
};

export default Login;