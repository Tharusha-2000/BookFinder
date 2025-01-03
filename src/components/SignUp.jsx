import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";

import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";


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

const SignUp = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!firstName || !lastName || !email || !password) {
      dispatch(
        openSnackbar({
          message: "Please fill in all fields",
          severity: "error",
        })
      );
      return false;
    }
  
    if (!nameRegex.test(firstName)) {
      dispatch(
        openSnackbar({
          message: "First name should only contain letters",
          severity: "error",
        })
      );
      return false;
    }
  
    if (!nameRegex.test(lastName)) {
      dispatch(
        openSnackbar({
          message: "Last name should only contain letters",
          severity: "error",
        })
      );
      return false;
    }
  
    if (!emailRegex.test(email)) {
      dispatch(
        openSnackbar({
          message: "Please enter a valid email address",
          severity: "error",
        })
      );
      return false;
    }
  
    if (!passwordRegex.test(password)) {
      dispatch(
        openSnackbar({
          message: "Password must be at least 8 characters long and contain at least one letter, one number, and one special character",
          severity: "error",
        })
      );
      return false;
    }
  
    return true;
  };



  return (
    <Container>
      <div>
        <Title>Create New Acc👋</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          value={firstName}
          handelChange={(e) => setFirstName(e.target.value)}
        />
         <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          value={lastName}
          handelChange={(e) => setLastName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="Sign Up"
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;
