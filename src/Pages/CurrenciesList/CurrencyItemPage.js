import React, {useEffect, useState} from 'react';
import { MyLine } from './Graph.tsx'
import { useParams } from 'react-router-dom'
import { LAST_MONTH_CURRENCIES } from '../../constanse/LastMonthCurrencies'

const CurrencyItemPage = (props) => {

    const [currentCurrency, setCurrentCurrency] = useState([])
    const [data, setData] = useState({})
    const currencyName = useParams().id
    const params = useParams()

    useEffect(() => {
        const currentCurrency = { name: params.id, data: LAST_MONTH_CURRENCIES[params.id] }
        setCurrentCurrency(currentCurrency)
        const labels = currentCurrency.data.map((cc) => {
            return cc["<DATE>"]
        });

        const data = {
            labels,
            datasets: [
                {
                    label: currencyName,
                    data: currentCurrency.data.map((cc) => cc["<HIGH>"]),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }
        console.log(currentCurrency)
        setData(data)
    }, [params.id])

    const CurrencyName = () => {
        return (
            currencyName
        )
    }

    const CurrencyDynamic = () => {
        if (currentCurrency?.data) {
            return (
                <div className='col-md-8 mx-auto text-center mt-5'>
                    <ul className='list-group'>
                        <MyLine
                            data={data}
                        />
                        {currentCurrency.data.map((currency) => {
                            return <li className='list-group-item' key={currency["<DATE>"]}> {currency["<DATE>"]} - {currency["<HIGH>"]} </li>
                        })}
                    </ul>
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
