import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import photo from "../Assests/img1.png";

const defaultTheme = createTheme();

// Validation Schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const API_BASE_URL = "https://walletwatcher-3.onrender.com" || "http://localhost:4000";
export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.message === "User already exists") {
          alert("User already exists");
        } else {
          navigate("/login");
        }
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setSubmitting(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          border: "1px solid black",
          marginTop: "78px",
          padding: "18px",
          borderRadius: "19px",
          backgroundColor: "white",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={photo}
            alt="Profile"
            style={{
              height: "68px",
              borderRadius: "50%",
              marginTop: "-48px",
            }}
          />
          <Typography component="h1" variant="h4" style={{ fontWeight: "bold" }}>
            Sign up
          </Typography>

          {/* Formik Form */}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="firstName"
                      label="First Name"
                      fullWidth
                      required
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      required
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email Address"
                      fullWidth
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2" style={{ color: "black" }}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
