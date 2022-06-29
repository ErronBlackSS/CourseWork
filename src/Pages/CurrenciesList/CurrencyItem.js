import React from 'react';

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

    const change = getChange()
    const color = getColor();

    return (
        <li>
            <p>{props.data.Nominal} {props.data.CharCode} - {props.data.result.toPrecision(5)} {props.base}. <span style={color}>{change}</span></p>
        </li>
    )
}

export default CurrencyItem;
