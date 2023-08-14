import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import walletIcon from "../assets/icons/walletIcon.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch , useSelector } from "react-redux";
import { logout } from "../store/auth.js";


export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  function _logout() {
    Cookies.remove("token");
    dispatch(logout()); // Corrected line to dispatch the 'logout' action
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1, margin: "0px", padding: "0px" }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ marginRight: 1, padding: "0px" }}
            >
              <img
                src={walletIcon}
                alt="Wallet Icon"
                style={{ width: "30px", height: "30px" }}
              />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ textDecoration: "none", color: "inherit", marginLeft: 1 }}
            >
              Expenser App
            </Typography>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isAuthenticated && (
              <Button
                color="inherit"
                onClick={_logout}
                sx={{ display: "flex", alignItems: "right" }}
              >
                Log Out
              </Button>
            )}

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: 1,
                  }}
                >
                  <Button color="inherit">Login</Button>
                </Link>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
