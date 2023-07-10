import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import walletIcon from '../assets/icons/walletIcon.png';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 , margin: "0px" , padding: "0px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1  , padding: "0px"}}
          >
           <img src={walletIcon} alt="Wallet Icon" style={{ width: "30px", height: "30px" }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Expenser App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}