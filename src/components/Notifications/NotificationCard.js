import React, { useState, useEffect } from 'react';
import  {Snackbar, IconButton, LinearProgress, SnackbarContent, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NotificationCard = ({messageState, message, bgcolor}) => {

  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(()=>{
    setOpen(messageState);
    if (messageState) {
        setProgress(0);
    }
  },[messageState]);

  useEffect(() => {
    let timer;
    if (open) {
      timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
      }, 20);
    } else {
      setProgress(0);
    }
    return () => {
      clearInterval(timer);
    };
  }, [open]);


  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const closeButton = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const snackbarContent = (
    <React.Fragment>
      <Typography variant="body2" color={'inherit'}>
        {message}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        color='inherit'
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}
      />
    </React.Fragment>
  )

  return (
    <>
      <Snackbar
        sx={{mt : '2vh','& .MuiSnackbarContent-root': {
            backgroundColor: bgcolor,
            }
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical : 'top', horizontal : 'right' }}>

            <SnackbarContent sx={{ padding : '12px 15px', maxWidth : '10vw'}} action={closeButton} message={snackbarContent}/>

      </Snackbar>
    </>
  );
};

export default NotificationCard;