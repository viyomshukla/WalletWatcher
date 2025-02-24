import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import photo from "../Assests/img1.png";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';

const defaultTheme = createTheme();

export default function SignIn() {
  const nav = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#f0f0f0"; // Change the background color here
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fetchdata = {
      email: data.get('email'),
      password: data.get('password'),
    };
    const API_BASE_URL = "https://walletwatcher-3.onrender.com" || "http://localhost:4000";
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchdata),
      });

      if (res.ok) {
        const { token } = await res.json();
        Cookies.set('token', token, { expires: 7, sameSite: 'strict' });
        console.log("Token set successfully:", token);

        if (token) {
          nav("/");
        } else {
          alert("Login failed");
        }
      } else {
        console.error("Login failed:", res.statusText);
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" style={{ border: "1px solid black", marginTop: "78px", padding: "18px", borderRadius: "19px", backgroundColor: "white" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={photo} alt="Profile" style={{ height: "68px", borderRadius: "50%", marginTop: "-48px" }} />
          <Typography component="h1" variant="h4" style={{ fontWeight: "bold" }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item style={{ marginLeft: "197px" }}>
                <Link href="/signup" variant="body2" style={{ color: "black" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
