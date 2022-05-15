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
    <ApexChart type="line" series={[
        {
            name :"price",
            data: data?.map((price => price.close))??[],
        },
    ]}
    options={{
        grid:{
            show: false
        },
        xaxis: {
            labels:{show:false},
            axisTicks: {show:false},
            axisBorder: {show:false},
            type:"datetime",
            categories: data?.map((price => price.time_close))??[]
        },
        yaxis: {
            show:false
        },
        fill:{
            type:"gradient",
            gradient: {gradientToColors:["#0be881"], stops:[0, 100]},
        },
        colors:["#0fbcf9"],
        tooltip:{
            y:{
                formatter:(value)=>`$ ${value.toFixed(3)}`
            }
        },
        theme:{mode:"dark"},
        chart : {height:300, width:500, toolbar:{ show:false}, background:"transparent"},
        stroke: {
            curve : "smooth",
            width:3,
        }
    }}/>}</div>
}

export default Chart;