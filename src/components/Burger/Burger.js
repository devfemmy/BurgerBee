import React from 'react';
import './Burger.css';
import BurgerIngredients from '../Burger/BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        
    });
    return (
        <div className = "Burger">
        <BurgerIngredients type = "bread-top"></BurgerIngredients>
        <BurgerIngredients type = "cheese"></BurgerIngredients>
        <BurgerIngredients type = "meat"></BurgerIngredients>
        <BurgerIngredients type = "bread-bottom"></BurgerIngredients>
        </div>
    );
}

export default burger;