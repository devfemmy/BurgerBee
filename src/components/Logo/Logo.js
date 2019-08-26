import React from 'react';

import './Logo.css'

import burgerLogo from '../../assets/images/burger-logo.png'
const logo = (props) => (
    <div className = "Logo" style = {{height: props.height, marginTop: '30px'}}>
        <img src = {burgerLogo} alt= "My burger" />
    </div>

);

export default logo;