import React, {Component} from 'react';
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        totalPrice: 0
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = null;
        for (let params of query.entries()) {
            if (params[0]==='price') {
                price = params[1];
            }else{
                ingredients[params[0]] = +params[1];
            }
            
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render () {
        return (
            <div>
                <CheckoutSummary ingredients = {this.state.ingredients}
                checkoutContinued = {this.checkoutContinuedHandler}
                checkoutCancelled = {this.checkoutCancelledHandler}/>
                <Route  path = {this.props.match.path + '/contact-data'}
                        render = {(props) => (<ContactData ingredients = {this.state.ingredients} price = {this.state.totalPrice} {...props} />)}/>
            </div>
        );
    }
}

export default Checkout;