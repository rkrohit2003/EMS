import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AccountCircle } from '@mui/icons-material';
import styles from './style.module.css';

const Navbar = ({ setIsManager, setIsLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the menu
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', '');
    localStorage.setItem('name', '');
    localStorage.setItem('isManager', false);
    setIsManager(false);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          <Link to="/" className={styles.link}>
            EMS
          </Link>
        </Typography>
        <IconButton color="inherit" className={styles.notificationIcon} onClick={() => navigate('/notification')}>
          <Badge color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <div>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
