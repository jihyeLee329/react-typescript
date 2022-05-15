import { useQuery } from 'react-query';
import {useOutletContext} from 'react-router'
import { fetchCoinHistory } from '../Api';
import ApexChart from 'react-apexcharts'

interface CharProps {
    coinId :string,
}

interface IHistorical {
    time_open: string,
    time_close: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number,
}

function Chart (){
    const {coinId}= useOutletContext<CharProps>();
    const {isLoading, data}= useQuery<IHistorical[]>(['ohlcv', coinId], 
    ()=>fetchCoinHistory(coinId),
    {
        refetchInterval:1000,
    })
    return <div>{isLoading ? "Loading chart ...":
    <ApexChart type="candlestick" 
    series={[
        {
            data: data?.map(((price) => {
           return {
               x:price.time_close, 
               y:[price.open.toFixed(3), price.high.toFixed(3), price.low.toFixed(3), price.close.toFixed(3)],
           };
        }))??[],
        },
    ]}
    options={{
        theme:{mode:"dark"},
        chart : {
            type: 'candlestick',
            height:300, 
            width:500, 
            background:"transparent",
            toolbar: {
                show: false,
            } //차트 상단 오른쪽에 툴바 숨김처리
        },
        // stroke: {
        //     curve : "smooth",
        //     width:3,
        // },
        // grid:{
        //     show: false
        // },  차트 가로축라인
        xaxis: {
            tooltip: {
                enabled: false
            },
            // axisTicks: {show:false},
            // axisBorder: {show:false},
            type:"datetime",
            categories: data?.map((price => price.time_close))??[]
        },
        yaxis: {
            tickAmount: 10, //y축 눈금 수 
        },
        // fill:{
        //     type:"gradient",
        //     gradient: {gradientToColors:["#0be881"], stops:[0, 100]},
        // },
        // tooltip:{
        //     y:{
        //         formatter:(value)=>`$ ${value.toFixed(3)}`
        //     }
        // },
       
    }}/>}</div>
}

export default Chart;