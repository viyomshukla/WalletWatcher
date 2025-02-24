import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import photo from "../Assests/img1.png"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';




const defaultTheme = createTheme();

export default function SignIn() {
    const nav=useNavigate();
    useEffect(() => {
      document.body.style.backgroundColor = "#f0f0f0"; // Change the background color here
     
  }, []);
    
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fetchdata={
        email: data.get('email'),
        password: data.get('password'),
      };
      const res=await fetch("https://walletwatcher-3.onrender.com/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchdata),
      });
      
      if (res.ok) {
        const { token } = await res.json();
        Cookies.set('token', token, { expires: 7, sameSite: 'strict' }); // Example: set cookie with expiration and SameSite policy
        console.log("Token set successfully:", token);
     
        if(token){
            nav("/")
        }
        else{
            alert("login failed")
        }
        
      }
      else {
        console.error("Login failed:", res.statusText);
      }
    }

    



  return (
   
    <ThemeProvider theme={defaultTheme} >
      <Container component="main" maxWidth="xs" style={{border:"1px solid black",marginTop:"78px" ,padding:"18px",borderRadius:"19px",backgroundColor: "white" }} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
      <img src={photo} style={{height:"68px", borderRadius:"50%", marginTop:"-48px"}}></img>
          <Typography component="h1" variant="h4" style={{fontWeight:"bold"}}>
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
             
              <Grid item style={{marginLeft:"197px"}}>
                <Link href="/signup" variant="body2" style={{color:"black"}}>
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
