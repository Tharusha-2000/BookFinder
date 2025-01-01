import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useState } from "react";
import Authentication from "./pages/Auth/Authentication";
import FoodDetails from "./pages/FoodDetails";
import FoodListing from "./pages/FoodListing";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@mui/material";
import { closeSnackbar } from "./redux/reducers/SnackbarSlice";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Contact from "./pages/Contact";


const Container = styled.div``;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const [openAuth, setOpenAuth] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSnackbar());
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar
            setOpenAuth={setOpenAuth}
            openAuth={openAuth}
            currentUser={currentUser}
          />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/bookdetails/:id" exact element={<FoodDetails />} />
            <Route path="/bookdetails" exact element={<FoodListing />} />
            <Route path="/forgetPassword" exact element={<ForgetPassword />} />
            <Route path="/contact" exact element={<Contact />} />
            
          
          </Routes>
          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}

          <Snackbar
            open={open}
            message={message}
            severity={severity}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
