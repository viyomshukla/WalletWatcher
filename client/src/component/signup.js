import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormValid from './formvalid';
import photo from "../Assests/img1.png"
import { Formik, useFormik } from "formik";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const defaultTheme = createTheme();

export default function SignUp() {
    const nav=useNavigate();
    const { touched, errors } = useFormik({
      validationSchema:FormValid
    })
    useEffect(() => {
      document.body.style.backgroundColor = "#f0f0f0"; // Change the background color here
    
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fetchdata={
      firstname:data.get('firstName'),
      lastname:data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };
    const res = await fetch("https://walletwatcher-3.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchdata),
      });
     
      if(res.ok){
        
        const data = await res.json();
        if(data==="User already exists"){
          
          window.alert("User already exists");
          console.log(await res.json());
        }

        else{
          nav("/login")
        }
        
       
      }
  };

  return (
    <ThemeProvider theme={defaultTheme} >
    
      <Container component="main" maxWidth="xs" style={{border:"1px solid black",marginTop:"78px" ,padding:"18px",borderRadius:"19px",backgroundColor: "white" }}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                 {touched.password && errors.password ? (
            <div style={{ color: "red", fontWeight: "bold" }}>{errors.password}</div>
          ) : null}
              </Grid>
          
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2"  style={{color:"black"}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}