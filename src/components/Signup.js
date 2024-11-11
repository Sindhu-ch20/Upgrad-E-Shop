import React, { useState } from 'react';
import { Avatar, Typography, TextField, Stack, Button } from "@mui/material";
import { pink } from "@mui/material/colors";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { signUpUser } from '../common/services/signupService';

const Signup = () => {

      const [cnfPassword, setConfirmPasswordVal] = useState("");
      const [userInputs,setUserInputs] = useState({
        "email": "",
        "password": "",
        "firstName": "",
        "lastName": "",
        "contactNumber": "",
      });

      const handleSignupNewUser = () => { 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactNumberRegex = /^\d{8,13}$/;

        if(userInputs.firstName.length < 1){
            alert('Please enter First name.');
            return;
        }

        if(userInputs.lastName.length < 1){
            alert('Please enter last name.');
            return;
        }

        if(!emailRegex.test(userInputs.email)) {
           alert('Please enter a valid email address');
           return;
        }

        if(userInputs.password.length < 6){
            alert('Password length should be atleast 6 characters.');
            return;
        }

        if(userInputs.password !== cnfPassword){
            alert("Confirm password value doesn't match the above password."); 
            return;
        }

        if(!contactNumberRegex.test(userInputs.contactNumber)){
            alert('Please enter a valid contact number');
            return;
        }

        signUpUser(userInputs).then(()=>{
            window.location.reload();
        }).catch((error)=>{
            alert("User registration failed! Please try again.");
        });

      };
    
    return(
        <>
        <Stack useFlexGap minHeight={"90vh"} className='' direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
        <Avatar sx={{bgcolor : pink[500]}} >
            <LockOutlinedIcon color="inherit"></LockOutlinedIcon>
        </Avatar>
        <Typography sx={{ marginTop : 1 }} variant='h6'>Sign up</Typography>
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setUserInputs({...userInputs, firstName : e.target.value})} value={userInputs.firstName} label="First Name" variant="outlined" autoComplete='on' required/> 
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setUserInputs({...userInputs, lastName : e.target.value})} value={userInputs.lastName} label="Last Name" variant="outlined" autoComplete='on' required/> 
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setUserInputs({...userInputs, email : e.target.value})} value={userInputs.email} label="Email Address" variant="outlined" autoComplete='on' required/> 
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setUserInputs({...userInputs, password : e.target.value})} value={userInputs.password} label="Password" variant="outlined" autoComplete='off' required/>
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setConfirmPasswordVal(e.target.value)} value={cnfPassword} label="Confirm Password" variant="outlined" autoComplete='off' required/>
        <TextField sx={{ marginTop : 1, width : 1/4 }} onChange={(e)=>setUserInputs({...userInputs, contactNumber : e.target.value})} value={userInputs.contactNumber} label="Contact Number" variant="outlined" autoComplete='on' required/> 
        <Button onClick={handleSignupNewUser} variant="contained" sx={{backgroundColor : '#3f51b5', marginTop : 2, width : 1/4}}> SIGN UP </Button>
        <div style={{marginTop : "16px", textAlign: 'end', width : '25%'}}>
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
        <Typography sx={{ marginTop : 5 }} variant='body2'>Copyright ©️ Upgrad 2024</Typography>
        </Stack>
        </>
    );
};

export default Signup;