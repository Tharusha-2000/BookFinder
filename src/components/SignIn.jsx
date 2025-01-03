import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { useDispatch } from "react-redux";


import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom"; 

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;
const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 10px;
  left: 180px;
  z-index: 10;
`;


const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const validateInputs = () => {
    if (!username || !password) {
      dispatch(
        openSnackbar({
          message: "Please fill all the fields",
          severity: "error",
        })
       );
       setLoading(false);
       setButtonDisabled(false);
      return false;
    }
    return true;
  };

  

  return (
    <Container>
      <div>
       
        <Span>Please login with your details here</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={username}
          handelChange={(e) => setUserName(e.target.value)}
        />

        
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />

        <TextButton>Forgot Password?</TextButton>
        <Button
          text="Sign In"
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignIn;
