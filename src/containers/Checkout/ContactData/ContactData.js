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
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
                valid: true,
                value: '',
                validation: {
                    required: true
                },
            }
        },
        formValid: false, 
        loading : false
    }
    orderHandler = (event) => {
        event.preventDefault();
              this.setState({loading: true})
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        
        const orders = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            orderData: formData
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
    checkValidityHandler = (value, rules) => {
        let isValid = true
        if (rules.required ) {
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }
    inputChangedHandler = (event, InputIdentifier)=> {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[InputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidityHandler(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[InputIdentifier] = updatedFormElement;
        updatedFormElement.touched = true
        let formIsValid = true;
        for (let InputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[InputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formValid: formIsValid});
    }
    render() {
        const formElementsArray = [];   
        for (let key in this.state.orderForm) {
           formElementsArray.push({
               id: key,
               config: this.state.orderForm[key]
           }) 
        }
        let form = ( <form onSubmit = {this.orderHandler}>
            {formElementsArray.map((formElement) => (
                <Input elementType = {formElement.config.elementType}
                key = {formElement.id}
                changed = {(event) => this.inputChangedHandler(event, formElement.id)}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                invalid = {!formElement.config.valid}
                shouldValid = {formElement.config.validation} 
                touched = {formElement.config.touched}/>
            ))}
            
            <button className = 'Button' disabled = {!this.state.formValid} style = {{background: '#5C9210', width: '100%'}}>ORDER</button>
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