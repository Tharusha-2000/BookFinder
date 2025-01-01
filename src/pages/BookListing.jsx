import React, { useState } from "react";
import styled from "styled-components";
import ProductCard from "../components/cards/ProductsCard";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { SearchRounded } from "@mui/icons-material";
const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: start;
  flex-direction: row;
  gap: 30px;
  @media (max-width: 700px) {
    flex-direction: column;
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;

const Filters = styled.div`
  padding: 20px 16px;
  flex: 1;
  width: 100%;
  max-width: 300px;
  @media (max-width: 700px) {
    max-width: 440px;
  }
`;

const Products = styled.div`
  flex: 1;
  padding: 20px 0px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  @media (max-width: 760px) {
    gap: 16px;
  }
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h4`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 40px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 50px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.bg_secondary};
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 8px;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + 70};
  }
`;

const SearchButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primary_hover};
  }
`;

const BookListing = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const searchBook = (e) => {
    if (!search.trim()) {
      return;
    }
      console.log(search);
      setLoading(true);
      setTimeout(() => {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBEPZO2B-SyohGnSxq5aUk38NKaBFnci1g&maxResults=40`)
        .then((res) => {
          console.log(search);
          console.log(res.data);
          console.log(res.data.items);
          setProducts(res.data.items);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      }, 40); 
  };

  return (
    <Container>
      <Filters>
        <Header>
          <Title>A room without books is like a body without a soul.</Title>
          <SubTitle>Find Your Book</SubTitle>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Enter Your Book Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              
            />
            <SearchButton onClick={searchBook}>
              <SearchRounded />
            </SearchButton>
          </SearchContainer>
        </Header>
      </Filters>
      <Products>
        <CardWrapper>
          {loading ? (
            <CircularProgress />
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </CardWrapper>
      </Products>
    </Container>
  );
};

export default BookListing;


