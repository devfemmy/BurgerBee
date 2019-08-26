import React from 'react';
import BuildControl from '../BuildControls/BuildControl/BuildControl';
import './BuildControls.css'
const controls = [
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
]

const buildControls = (props) => (
    <div className = "BuildControls">
    <p><strong>Current Price: {props.price.toFixed(2)}</strong></p>
         {controls.map(ctrl => (
         <BuildControl 
           key = {ctrl.label}
           label = {ctrl.label}
           added = {() => props.ingredientsAdded(ctrl.type)}
           removed = {() => props.ingredientsRemoved(ctrl.type)}
           disabled = {props.disabled[ctrl.type]}/>  
         ))}
         <button className = "OrderButton"
         disabled = {!props.purchasable}
         onClick = {props.ordered}
         >ORDER NOW</button>
    </div>
); 

export default buildControls