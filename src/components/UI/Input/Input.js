import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    const InputClasses = [];
    if (props.invalid && props.shouldValid && props.touched) {
        InputClasses.push('Invalid');
    }else {
        InputClasses.push('InputElement');
    }
    switch (props.elementType) {
        case( 'input') : 
            inputElement = <input 
            className= {InputClasses} {...props.elementConfig} 
            value={props.value}
            onChange= {props.changed} />;
            break;
        case('textarea') :
            inputElement = <textarea 
            className= {InputClasses.join( )} {...props.elementConfig} 
            value={props.value} 
            onChange= {props.changed} 
            />;
            break;
            case('select') :
            inputElement = <select 
            className= {InputClasses.join( )}
            value={props.value}
            onChange= {props.changed}
            >{props.elementConfig.options.map(
                option => (
                    <option key= {option.value} value = {option.value}>{option.displayValue}</option>
                )
            )}</select>;
            break;
        default: 
            inputElement = <input className= {InputClasses.join( )} {...props.elementConfig} value={props.value}
            onChange= {props.changed}/>;
    }
    return (
        <div className = "Input">
        <label className = "Label">{props.label}</label>
        {inputElement}
        </div>
    )
}

export default input