import React from 'react';
import { useState } from "react";
import Select from "react-select";
import CurrencyItem from "./CurrencyItem";
import classes from './CurrenciesList.module.css'

const CurrenciesList = (props) => {

    const [currencies, setCurrencies] = useState(props.currencies)
    const [countries] = useState(props.countries)
    const [base_currency, setBaseCurrency] = useState('RUB')
    const [selected] = useState('RUB')

    function Change(e) {
        setBaseCurrency(e.value)
        const defaultCurrencies = {
            Value: 1,
            Nominal: 1,
            Previous: 1,
            prev_result: 1,
            result: 1
        };
        const firstCurrency = getBaseCurrency(e.value) ?? defaultCurrencies

        const firstCurrencyNominal = firstCurrency.Nominal
        const firstCurrencyValue = firstCurrency.Value

        const firstCurrencyPrevValue = firstCurrency.Previous ?? defaultCurrencies

        setCurrencies(() => {
                return currencies.map((item) => {
                    let secondCurrency = item ?? defaultCurrencies
                    let secondCurrencyValue = secondCurrency.Value
                    let secondCurrencyNominal = secondCurrency.Nominal
                    let secondCurrencyPrevValue = secondCurrency.Previous ?? defaultCurrencies
                    let result =  (secondCurrencyValue / secondCurrencyNominal) / (firstCurrencyValue / firstCurrencyNominal)
                    let prev_result = (secondCurrencyPrevValue / secondCurrencyNominal) / (firstCurrencyPrevValue / firstCurrencyNominal)
                    item.result = result
                    item.prev_result = prev_result
                    return item
                })
            }
        )
    }

    function getBaseCurrency(base) {
        for(const cur in currencies) {
            if(currencies[cur].CharCode === base) {
                return currencies[cur]
            }
        }
    }

    return (
        <div>
            <div>
                <h4 className={classes.blockCenter}> Выберите базовую валюту </h4>
                <Select className={classes.sel} onChange={Change} defaultValue={selected} options={countries} />
                <ol className={classes.rounded}>
                    {currencies.map((currency) => {
                        return <CurrencyItem data={currency} base={base_currency} key={currency.ID}/>
                    })}
                </ol>
            </div>
        </div>
    );

};

export default CurrenciesList;
