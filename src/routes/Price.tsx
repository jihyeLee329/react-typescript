import {useQuery} from 'react-query';
import {useOutletContext} from 'react-router';
import styled from 'styled-components';
import {fetchCoinTickers} from '../Api'


const Loader = styled.span`
display:block;
    text-align: center;
`;

interface CharProps{
    coinId :string
}

export interface PriceData{
    id : string;
    name : string;
    symbol : string;
    rank : number;
    circulating_supply : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        USD :{
            ath_date: string,
            ath_price:number,
            market_cap:number,
            percent_change_1h:number,
            percent_change_1y:number,
            percent_change_6h:number,
            percent_change_7d:number,
            percent_change_12h:number,
            percent_change_15m:number,
            percent_change_24h:number,
            percent_change_30d:number,
            percent_change_30m:number,
            percent_from_price_ath:number,
            price:number,
            volume_24h:number,
            volume_24h_change_24h:number,
        }
    };
}
function Price (){
    const {coinId} = useOutletContext<CharProps>(); 
    const {isLoading : loading, data : priceData} = useQuery<PriceData>(['coinPrice', coinId], 
    ()=> fetchCoinTickers(coinId)
    );
    console.log(priceData)
    return (
        <>
        {loading ?
            ( 
                <Loader>Loading...</Loader>
            ) : (
                <table style={{width:'100%'}}>
                    <colgroup>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'20%'}}></col>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Price</th>
                        <th>1시간</th>
                        <th>24시간</th>
                        <th>시가총액</th>
                    </tr>
                    <tr>
                        <td>{priceData!.rank}</td>
                        <td>{priceData!.quotes.USD.price.toFixed(3)}</td>
                        <td>{priceData!.quotes.USD.percent_change_1h.toFixed(3)}</td>
                        <td>{priceData!.quotes.USD.percent_change_24h.toFixed(3)}</td>
                        <td>{priceData!.quotes.USD.market_cap.toFixed(3)}</td>

                    </tr>
                    </tbody>
                </table>
              
                
            )
        }
        </>

    );
}
export default Price;