import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import { ShoppingCart, Search as SearchIcon } from '@mui/icons-material';
import { AppBar, styled, alpha, Toolbar, Typography, Grid2, Button, Stack, Box } from '@mui/material';

const NavBar = () => {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: '50%',
        margin: 'auto'
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
    }));
    
    return <AppBar position='sticky'>
        <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={2} alignItems={'center'}>
                    <Grid2 size="auto">
                        <Stack direction='row' spacing={2}>
                            <ShoppingCart />
                            <Typography
                                variant="subtitle1"
                                noWrap
                                >
                                upGrad E-Shop
                            </Typography>
                        </Stack>
                    </Grid2>
                    <Grid2 size='grow'>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Grid2>
                    <Grid2 size='auto'>
                        <Stack direction="row" spacing={2} alignItems='center'>
                            <Typography sx={{textDecoration:'underline'}}>Login</Typography>
                            <Typography sx={{textDecoration:'underline'}}>Sign Up</Typography>
                            <Typography sx={{textDecoration:'underline'}}>Home</Typography>
                            <Typography sx={{textDecoration:'underline'}}>Add Product</Typography>
                            <Button variant="contained" color='error'>LOGOUT</Button>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Box>
        </Toolbar>
  </AppBar>
}

export default NavBar;