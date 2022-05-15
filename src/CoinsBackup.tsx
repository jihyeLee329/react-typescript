import { Link,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useQuery } from "react-query";
import { fetchCoins } from "./Api";
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
    // const name = location.state as RouterState;
// const {name} = useLocation().state as RouterState;

function Coins(){
    //useQuery 는 2개의 인자가 필요. 1번째는 queryKey , query의 고유 식별자. 
    // 2번째 인자는 fetcher 함수. 
    // fetcher 함수를 불러와서 fetcher 함수가 laading중이면 reqct query는 
    // {1번째변수, 2번째 변수}  1번째변수에서 알려줄거임. 
    // fetcher 함수가 실행이 되고 끝나면 , 2번째 변수에 결과를 담을거임
    // 그리고 react query 는 데이터를 유지하고있음. 캐시에 저장해두고 있음.
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
    
    // const [coins, setCoins] =useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const {state} = useLocation() as RouterState;
    // useEffect(()=>{
    //     (async()=>{
    //       const response = await fetch('https://api.coinpaprika.com/v1/coins');
    //       const json= await response.json();
    //       setCoins(json.slice(0,100));
    //       setLoading(false);
    //     })();
    // },[]);



   return(
       <Container>
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

