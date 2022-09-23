import './App.css';
import Header from "./components/Layouts/Header/Header";
import Footer from "./components/Layouts/Footer/Footer";
import Main from "./components/Router/main";
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [currencies, setCurrencies] = useState([])
    const [countries, setCountries] = useState()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((response) => {
                let currentCurrencies = response.data.Valute;
                let currentCountries = [{value: 'RUB', label: 'RUB'}]
                for (const code in currentCurrencies) {
                    currentCountries.push({value: code, label: code});
                    currentCurrencies[code]['result'] = currentCurrencies[code].Value
                    currentCurrencies[code]['prev_result'] = currentCurrencies[code].Previous
                }
                setCountries(currentCountries)
                setCurrencies(Object.values(currentCurrencies).map((val) => {
                    return val
                }))
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const title = 'Список валют'
    if(isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else if (!isLoading && currencies) {
        return (
            <div className="App">
                <Header title={title}/>
                <Main currencies={currencies} countries={countries} isLoading={isLoading}/>
                <Footer/>
            </div>
        );
    }
}

export default App;
