import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useState } from "react";
import Authentication from "./pages/Auth/Authentication";
import BookDetails from "./pages/BookDetails";
import BookListing from "./pages/BookListing";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@mui/material";
import { closeSnackbar } from "./redux/reducers/SnackbarSlice";
import Contact from "./pages/Contact";


const Container = styled.div``;

function App() {

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
          
          />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/bookdetails/:id" exact element={<BookDetails />} />
            <Route path="/bookdetails" exact element={<BookListing />} />
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
