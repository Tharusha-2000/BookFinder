import { CircularProgress, IconButton, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import {
  Add,
  FavoriteBorder,
  FavoriteBorderOutlined,
  FavoriteRounded,
  Remove,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  max-width: 1400px;
  display: flex;
  gap: 40px;
  justify-content: center;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const ImagesWrapper = styled.div`
  flex: 0.7;
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  max-width: 500px;
  width: 100%;
  max-height: 500px;
  border-radius: 12px;
  object-fit: cover;
  @media (max-width: 768px) {
    max-width: 400px;
    height: 400px;
  }
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 4px 10px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;

const Percent = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: green;
`;

const Categories = styled.div`
  font-size: 16px;
  font-weight: 500;
  diaplay: flex;
  flex-direction: column;
  gap: 24px;
`;
const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
  align-items: center;
`;
const Item = styled.div`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  padding: 4px 12px;
  display: flex;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 32px 0px;
  @media only screen and (max-width: 700px) {
    gap: 12px;
    padding: 12px 0px;
  }
`;

const Div = styled.div`
  font-size: 16px;
  font-weight: 500;
  diaplay: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const BookDetails = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const [averageRating, setAverageRating] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  
  const { id } = useParams(); 
  console.log(id);
  const getProduct = async () => {
    const API_URL =`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBEPZO2B-SyohGnSxq5aUk38NKaBFnci1g`;
    setLoading(true);
    await axios.get(API_URL).then((res) => {
      console.log(res.data);
      setProduct(res.data);
      setLoading(false);
    }).catch((error) => {
      console.log("Error fetching product data:", error);
      setLoading(false);
    });
  };


  useEffect(() => {
    getProduct();
  }, []);

 

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Wrapper>
          <ImagesWrapper>
            <Image src={product?.volumeInfo.imageLinks.thumbnail} />
          </ImagesWrapper>
          <Details>
            <div>
              <Title>{product?.volumeInfo.title}</Title>
            </div>
         
                            
                        
            {/* <h4>{item.volumeInfo.publisher}<span>{item.volumeInfo.publishedDate}</span></h4><br/> */}
                          
            

            <Desc>{product?.volumeInfo.description}</Desc>

            <Categories>
               Authors
              <Items>
                {product?.volumeInfo.authors.map((author, index) => (
                  <Item key={index}>{author}</Item>
                ))}
              </Items>
            </Categories>
             
            <Categories>
               Category:
              <Items>
                {product?.volumeInfo.categories.map((author, index) => (
                  <Item key={index}>{author}</Item>
                ))}
              </Items>
            </Categories>

            <Div>
             
              
              <Items>
              Price :{product?.saleInfo.saleability}
              </Items>
              <Items>
              Pages :  {product?.volumeInfo.pageCount}
              </Items>
            <Items>
              Publisher : {product?.volumeInfo.publisher} 
              </Items>
              <Items>  
              Date: {product?.volumeInfo.publishedDate}
              </Items>
            </Div>
      
            <ButtonWrapper>
            <a href={product?.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
                <Button text="More" full />
                </a>
            </ButtonWrapper>
      
          </Details>
        </Wrapper>
      )}
    </Container>
  );
};

export default BookDetails;
