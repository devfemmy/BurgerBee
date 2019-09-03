import React from 'react';
import './Burger.css';
import BurgerIngredients from '../Burger/BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    console.log('ingredients', props)
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredients 
            key = {igKey + i}
            type = {igKey}/>
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    console.log(transformedIngredients);
    if (transformedIngredients.length < 1) {
        transformedIngredients = <p>Please start adding Ingredients</p>
    }
    return (
        <div className = "Burger">
        <BurgerIngredients type = "bread-top"></BurgerIngredients>
        {transformedIngredients}
        <BurgerIngredients type = "bread-bottom"></BurgerIngredients>
        </div>
    );
}

export default burger;