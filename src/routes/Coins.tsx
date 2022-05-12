import { Link,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from 'styled-components';
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

interface CoinInterface {
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
    const [coins, setCoins] =useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
   
    const {state} = useLocation() as RouterState;

    console.log(state)

    useEffect(()=>{
        (async()=>{
          const response = await fetch('https://api.coinpaprika.com/v1/coins');
          const json= await response.json();
          setCoins(json.slice(0,100));
          setLoading(false);
        })();
    },[]);
   return(
       <Container>
           <Header>
               <Title>코인</Title>
           </Header>
           {loading ? <Loader>"Loading..." </Loader>: 
           <CoinsList>
           {coins.map(coin => (
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