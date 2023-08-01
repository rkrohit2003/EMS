import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import styles from "./Login.module.css"
import { useUserEmail } from '../../UserEmailContext';

const defaultTheme = createTheme();
export default function Login({ setIsLoggedIn, setIsManager }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUserEmail } = useUserEmail();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/login`, {
        email,
        password
      });

      const isLoggedIn = response.data !== 0;

      if (isLoggedIn) {
        const curUser = await axios.get(`${process.env.REACT_APP_BACKEND}/api/user/${email}`);
        setIsLoggedIn(isLoggedIn);
        setIsManager(curUser.data[0].isManager);
        localStorage.setItem('name', curUser.data[0].name);
        setUserEmail(email);
        localStorage.setItem('isManager', curUser.data[0].isManager);
        localStorage.setItem('isLoggedIn', email.toString());
        navigate('/');
      } else {
        setError('Incorrect Email or password');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className={styles.Login}>
      <ThemeProvider
        theme={defaultTheme}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign in
            </Typography>
            {error && (
              <Typography component="p" variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
            <Box
              component="form" onSubmit={handleSubmit}
              sx={{
                input: { color: "white" },
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  color: "white",
                },
                "& label": {
                  color: "white",
                },
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#66fcf1",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#66fcf1",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#66fcf1",
                  },
                  "& helperText-root.Mui-error": {
                    color: "#FA8072",
                  },
                },
              }}
              style={{
                marginTop: 30,
                display: "flex",
                flexDirection: "column",
                width: "80%",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button type="submit" fullWidth variant="contained"
                sx={{
                  width: '80%',
                  margin: 'auto',
                  marginTop: '20px !important',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: "#66fcf1 !important",
                  backgroundColor: '#1f2833',
                  border: '1px solid #66fcf1',
                  borderRadius: '20px',
                  padding: '15px',
                  '&:hover': {
                    color: '#1f2833 !important',
                    backgroundColor: '#66fcf1',
                    border: '1px solid #1f2833',
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider></div>
  );
}
