import React, { useEffect, useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from "./style.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/user/${localStorage.getItem('isLoggedIn')}`);
        setUser(response.data[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.dis}>
      {user === null ? (
        <h2>Loading...</h2>
      ) : (
        <form className={`${styles.form} ${styles.container}`}>
          <div className={styles.cancelIcon} onClick={() => navigate('/')}>
            <CancelIcon />
          </div>
          <h2 className={styles.heading}>Your Profile</h2>
          <TextField label="Name" style={{ marginBottom: '20px' }} value={user.name} />
          <TextField label="Email" style={{ marginBottom: '20px' }} value={user.email} type="email" />
          <TextField label="Password" style={{ marginBottom: '20px' }} value={user.password} type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              )
            }}
          />
          <TextField label="Phone" style={{ marginBottom: '20px' }} value={user.phone} type="tel" />
          <TextField label="Address" style={{ marginBottom: '20px' }} value={user.address} />
          <TextField label="Department" style={{ marginBottom: '20px' }} value={user.department} />
          <TextField label="Salary" style={{ marginBottom: '20px' }} value={user.salary} type="number" />
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Back
          </Button>
        </form>
      )}
    </div>
  );
};

export default Profile;
