import React from 'react';
import Burger from '../../Burger';
import '../../../UI/Button/Button.css'; 
import './CheckoutSummary.css';


const checkoutSummary = (props) => {
    return (
        <div className = "CheckoutSummary" >
            <h1>We hope it tastes well</h1>
            <div style= {{width: '100%', margin: 'auto'}}>
                <Burger ingredients= {props.ingredients}  />
            </div>
            <button style = {{background: '#5C9210'}} 
            onClick = {props.checkoutContinued}
            className = "Button">PROCEED</button>
            <button style = {{background: '#944317'}} 
            onClick = {props.checkoutCancelled}
            className = "Button">CANCEL</button>
        </div>
    )
}

export default checkoutSummary