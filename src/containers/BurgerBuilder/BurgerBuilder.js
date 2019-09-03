import React, {Component} from 'react';
import Supx from '../../hoc/Supx'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/errorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable : false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {this.setState({error: true})})
    }
    updatePurchasable (ingredients) {
        const sum = Object.keys(ingredients)
        .map((igKey) => {
            return ingredients[igKey];

        }).reduce((sum, el) => {
            return sum + el;
        },0);

        this.setState({purchasable: sum > 0})

        // console.log("sum", sum); 
    }

    addIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       const updatedCount = oldCount + 1;
       const updatedIngredients = {
           ...this.state.ingredients
       };
       updatedIngredients[type] = updatedCount;
       const priceAddition = INGREDIENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice + priceAddition;
       this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
       this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchasable(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        console.log( "is this", this.props);
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
        
    }


    render() { 
        console.log('this mount', this.props)
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSum = null; 
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />
        if(this.state.ingredients) {
            burger = (
                <Supx>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls 
                ingredientsAdded= {this.addIngredientHandler}
                ingredientsRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                purchasable = {this.state.purchasable}
                ordered = {this.purchaseHandler}
                price = {this.state.totalPrice}/>
                </Supx>
                
            );
            orderSum =  <OrderSummary 
            ingredients = {this.state.ingredients}
            proceed = {this.purchaseContinueHandler}
            cancel = {this.purchaseCancelHandler}
            price = {this.state.totalPrice}/>
        }

        if(this.state.loading) {
            orderSum = <Spinner />
        }
       
        return (
            <Supx>
                <Modal show = {this.state.purchasing}
                modalClosed = {this.purchaseCancelHandler}>
                {orderSum}
                </Modal>
                {burger}
            </Supx>
        );
    }
}

export default errorHandler(BurgerBuilder, axios);