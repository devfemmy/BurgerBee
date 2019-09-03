import React, {Component} from 'react';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading : false
    }
    orderHandler = (event) => {
        event.preventDefault();
              this.setState({loading: true})
        const orders = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer : {
                name: 'Oluwafemi',
                address: 'Nigeria'
            }
        }
        axios.post('/orders.json', orders)
        .then(response => {
            console.log(response)
            this.setState({loading: false, purchasing: false})
            this.props.history.push('/');
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false, purchasing: false})
        });
    }
    inputChangedHandler = (event)=> {
        console.log(event.target.value);
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
           formElementsArray.push({
               id: key,
               config: this.state.orderForm[key]
           }) 
        }
        let form = ( <form>
            {formElementsArray.map((formElement) => (
                <Input elementType = {formElement.config.elementType}
                key = {formElement.id}
                changed = {this.inputChangedHandler}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value} />
            ))}
            
            <button style = {{background: '#5C9210', width: '100%'}} onClick = {this.orderHandler}>ORDER</button>
        </form>)
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className= "ContactData">
            <h4>Please Enter your details</h4>
            {form}
            </div>
        )
    }
}

export default ContactData