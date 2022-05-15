import { Link,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useQuery } from "react-query";
import { fetchCoins } from "../Api";
import { Helmet } from "react-helmet-async";

// Helmet : 리액트 펠멧은 document의 <head>로 가는 direct link라서 ,
// title 뿐만 아니라 파비콘 link css 모두 추가  가능


const Container = styled.div`
    padding: 0 20px;
`;

const Header = styled.header`
    height:10vh; 
    display: flex;
    align-items:center;
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li`
background-color:#fff;
color:${props => props.theme.bgColor};
margin-bottom:10px;
border-radius:15px; 
a{  
    display:flex;
    align-items:center;
    padding:20px;
    transition: color .2s ease-in;
}
    &:hover{
        color:${(props)=>props.theme.accentColor};
    }
`;


const Title = styled.h1`
    font-size:48px;
    color:${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
display:block;
    text-align: center;
`;

const Img = styled.img`
width:25px; height:25px; 
margin-right:10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}
interface RouterState {
    state:{
        name:string;
    };
}

function Coins(){
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
   return(
       <Container>
           <Helmet>
            <title>코인</title>
          </Helmet>
           <Header>
               <Title>코인</Title>
           </Header>
           {isLoading ? <Loader>"Loading..." </Loader>: 
           <CoinsList>
           {data?.slice(0,100).map(coin => (
           <Coin key={coin.id}>
             <Link to={`/${coin.id}`} state={{name:coin.name}}>
             <Img src ={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />{coin.name} &rarr;
             </Link>
           </Coin>)) }
        </CoinsList>}
       </Container>
   ) 
}

export default Coins;