import { Stack, Box, Stepper, Step, StepLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectAddressPage from "./OrderAddress";
import ConfirmOrderPage from "./ConfirmOrder";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const[activeStep, setActiveStep] = useState(1);

  const steps = [
    'Items',
    'Select Address',
    'Confirm Order',
  ];

  const colors = {
    active : '#3F51B5',
    inactive : 'gray'
  };

  useEffect(() => {
    if (!location.state)
      navigate("/products");
  });

  return (
    <>
      <Stack
        direction={"column"}
        minHeight={"100vh"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        useFlexGap>
        <Box sx={{ width: "70vw", mt : 4 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel sx={{
                    '& .MuiStepIcon-root': { 
                        color: (index <= activeStep) ? colors.active : colors.inactive,
                     },
                }}> {label} </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {
            (activeStep === 1) 
            ? <SelectAddressPage setStep={(num) => setActiveStep(num)}/>
            : <ConfirmOrderPage productInfo={location.state} setStep={(num) => setActiveStep(num)}/>
        }

      </Stack>
    </>
  );
};

export default OrderPage;
