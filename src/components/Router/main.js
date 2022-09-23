import React from 'react';
import { Routes, Route } from 'react-router-dom'
import CurrenciesList from "../../Pages/CurrenciesList/CurrenciesList";
import Graphics from "../../Pages/Graph/Graphics";
import Converter from "../../Pages/Converter/Converter";
import CurrencyItemPage from '../../Pages/CurrenciesList/CurrencyItemPage'
const Main = (props) => {

    const graphData = props.currencies.map((currency) => {
        return { CharCode: currency.CharCode, ID: currency.ID  }
    })

    return (
        <main>
            <Routes>
                <Route exact={true} path='/' element={<CurrenciesList currencies={props.currencies} countries={props.countries}/>}/>
                <Route path='/graph' element={<Graphics currencies={graphData}/>}/>
                <Route path='/converter' element={<Converter currencies={props.currencies} countries={props.countries}/>}/>
                <Route path='/:id' element={<CurrencyItemPage />}/>
            </Routes>
        </main>
    )
}

export default Main;
