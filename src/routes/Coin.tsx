import { useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 0 20px;
`;

const Header = styled.header`
    height:10vh; 
    display: flex;
    align-items:center;
`;
const Title = styled.h1`
    font-size:48px;
    color:${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
display:block;
    text-align: center;
`;

type Params ={
    coinId : string,
}

type RouteState = {
   state:{
       name:string,
       rank:number,
   }
}
function Coin(){
    const [loading, setLoading] =useState(true);
    const {coinId} = useParams<Params>();
    const {state} = useLocation() as RouteState;
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo]= useState({});
   useEffect(()=>{
       (async ()=>{
        const infoData =await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
        const priceData = await(
            await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        ).json();
        setInfo(infoData);
        setPriceInfo(priceData);
    })();
   },[]);

    return(
        <Container>
           <Header>
               <Title>{state?.name || "Loading..."}</Title>
           </Header>
           {loading ? <Loader>"Loading..." </Loader> :null } </Container>
    )
}

export default Coin;