import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients : {
            meat: 0,
            bacon: 0,
            cheese: 0,
            salad: 0

        },
        totalPrice: 4,
        purchasable : false,
        purchasing: false,
        loading: false
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
        this.setState({loading: true})
        const orders = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer : {
                name: 'Oluwafemi',
                address: 'Nigeria'
            }
        }
        axios.post('/orders.json', orders)
        .then(response => {
            console.log(response)
            this.setState({loading: false, purchasing: false})
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false, purchasing: false})
        });
    }


    render() { 
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSum =  <OrderSummary 
        ingredients = {this.state.ingredients}
        proceed = {this.purchaseContinueHandler}
        cancel = {this.purchaseCancelHandler}
        price = {this.state.totalPrice}/>

        if(this.state.loading) {
            orderSum = <Spinner />
        }
        return (
            <Aux>
                <Modal show = {this.state.purchasing}
                modalClosed = {this.purchaseCancelHandler}>
                {orderSum}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls 
                ingredientsAdded= {this.addIngredientHandler}
                ingredientsRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                purchasable = {this.state.purchasable}
                ordered = {this.purchaseHandler}
                price = {this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;