import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { LAST_MONTH_CURRENCIES } from '../../constanse/LastMonthCurrencies'

const CurrencyItemPage = (props) => {

    const [currentCurrency, setCurrentCurrency] = useState([])
    const currencyName = useParams().id
    const params = useParams()

    useEffect(() => {
        const currentCurrency = LAST_MONTH_CURRENCIES[params.id]
        setCurrentCurrency(currentCurrency)
    }, [params.id])

    const CurrencyName = () => {
        return ( 
            currentCurrency?.Name ? currentCurrency.Name : currencyName
        )
    }

    const CurrencyDynamic = () => {
        if (currentCurrency?.dates) {
            return ( 
                <div className='col-md-8 mx-auto text-center mt-5'>
                    <ol>
                        {currentCurrency.dates.map((currency) => {
                            return <li key={currency.date}> {currency.date} - {currency.value} </li>
                        })}
                    </ol>
                </div>
            )
        }
        else {
            return ( 
                <div className='col-md-8 mx-auto text-center mt-5'>
                    Нет данных
                </div>
            )
        }
    }

    return (
        <div className="container-fluid"> 
            <div className="row">
                <div className='col-md-6 mx-auto text-center'>        
                    <CurrencyName />
                </div>
            </div>
            <div className="row">
                <CurrencyDynamic />
            </div>
        </div>
    );
};

export default CurrencyItemPage;
