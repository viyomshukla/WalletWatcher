import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import image from "../Assests/img1.png"; // Ensure the path is correct
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {token? (
              <Link to="/">
                <img
                  src={image}
                  alt="User Profile Picture"
                  style={{
                    height: "60px",
                    borderRadius: "50%",
                    width: "120px",
                    marginTop: "13px",
                  }}
                  />
                  </Link>
                ) : null}
                  {!token? (
                    <Link to="/login">
                      <img
                        src={image}
                        alt="User Profile Picture"
                        style={{
                          height: "60px",
                          borderRadius: "50%",
                          width: "120px",
                          marginTop: "13px",
                        }}
                        />
                        </Link>
                      ) : null}
            
            <span style={{ fontSize: "42px", marginLeft: "330px" }}>
              Track. Budget. Prosper.
            </span>
          </Typography>
          {!token && (
            <>
              <Link to="/login">
                <Button color="inherit" style={{ color: "white" }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button color="inherit" style={{ color: "white" }}>
                  Register
                </Button>
              </Link>
            </>
          )}
          {token && (
            <Button
              color="inherit"
              style={{ color: "white" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
