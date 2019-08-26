import React from 'react'
import Aux from '../../../hoc/Supx';
import '../../UI/Button/Button.css'
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key = {igKey}><span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    })
return (
    <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to check out?</p>
        <button style = {{background: '#5C9210'}} 
        onClick = {props.proceed}
        className = "Button">PROCEED</button>
        <button style = {{background: '#944317'}} 
        onClick = {props.cancel}
        className = "Button">CANCEL</button>  
           
    </Aux>
)
};

export default orderSummary