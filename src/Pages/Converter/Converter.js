import React from 'react';
import {useState} from "react";
import Select from "react-select";
import useStateWithCallback from "use-state-with-callback";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEquals} from "@fortawesome/free-solid-svg-icons";
import classes from "./Converter.module.css";

const Converter = (props) => {

    const [selected, setSelected] = useState(['RUB', 'USD'])
    const [inputValue, setInputValue] = useStateWithCallback("", () => {
        convert()
    })
    const [result, setResult] = useState("")

    function convert() {
        let defaultCurrency = {
            Value: 1,
            Nominal: 1
        };

        const firstCurrency = getBaseCurrency(selected[0]) ?? defaultCurrency,
            firstCurrencyValue = firstCurrency.Value * Number(inputValue),
            firstCurrencyNominal = firstCurrency.Nominal

        const secondCurrency = getBaseCurrency(selected[1]) ?? defaultCurrency,
            secondCurrencyValue = secondCurrency.Value,
            secondCurrencyNominal = secondCurrency.Nominal

        let result = (firstCurrencyValue / firstCurrencyNominal) / (secondCurrencyValue / secondCurrencyNominal)

        setResult(result ? result.toFixed(5) : "")
    }

    function changeFirstSelect(e) {
        let newSelected = selected.slice()
        newSelected[0] = e.value
        setSelected(newSelected)
    }

    function changeSecondSelect(e) {
        let newSelected = selected.slice()
        newSelected[1] = e.value
        setSelected(newSelected)
    }

    function getBaseCurrency(base) {
        for(const cur in props.currencies) {
            if(props.currencies[cur].CharCode === base) {
                return props.currencies[cur]
            }
        }
    }

    return (
        <div className={classes.convertionMain}>
            <h1>Конвертер валют</h1>
            <p className={classes.text}>У меня есть</p>
            <input className={classes.curIn} onChange={e => { setInputValue(e.target.value) }} />
            <Select maxMenuWidth={30} defaultValue={0} className={classes.curSel} onChange={e => { changeFirstSelect(e); convert()}} options={props.countries}/>
            <FontAwesomeIcon icon={faEquals} />
            <p className={classes.text}>Я хочу</p>
            <input className={classes.curIn} value={result} disabled />
            <Select maxMenuWidth={30} defaultValue={selected[1]} className={classes.curSel} onChange={e => { changeSecondSelect(e); convert()}} options={props.countries}/>
        </div>
    );
};

export default Converter;
