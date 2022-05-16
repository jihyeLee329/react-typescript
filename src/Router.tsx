import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Coins from './routes/Coins'
import Coin from './routes/Coin'
import Price from './routes/Price';
import Chart from './routes/Chart';
interface IRouterProps{
    toggleDark : () => void,
    isDark: boolean,
}

function Router({toggleDark, isDark}:IRouterProps){
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/:coinId" element={<Coin />} >
                    <Route path="price" element={<Price />} />
                    <Route path="chart" element={<Chart isDark={isDark}/>}/>
                </Route>
                <Route path="/" element={<Coins toggleDark={toggleDark} />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;
