import React from 'react';
import { useNavigate } from 'react-router';

const CurrencyItem = (props) => {

    function getChange() {
        if(props.data.result - props.data.prev_result < 0) {
            return (props.data.result - props.data.prev_result).toPrecision(4)
        }
        else {
            return '+' + ((props.data.result - props.data.prev_result).toPrecision(4))
        }
    }

    function getColor() {
        if(props.data.result - props.data.prev_result < 0) {
            return {color: 'red'}
        }
        else {
            return {color: 'green'}
        }
    }

    function CurrencyLineItem() {
        return (
            <p>{props.data.Nominal} {props.data.CharCode} - {props.data.result.toPrecision(5)} {props.base}. <span style={color}>{change}</span></p>
        )
    }

    const navigate = useNavigate();

    function useGotoCurrencyPage() {
        navigate('/' + props.data.CharCode);
    }

    const change = getChange()
    const color = getColor();

    return (
        <li onClick={useGotoCurrencyPage}>
            <CurrencyLineItem />
        </li>
    )
}

export default CurrencyItem;
