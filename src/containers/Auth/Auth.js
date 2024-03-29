import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';

import './Auth.css';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }; 
        this.setState({controls: updatedControls});
    }

    render() {
        const formElementsArray = [];   
        for (let key in this.state.controls) {
           formElementsArray.push({
               id: key,
               config: this.state.controls[key]
           }) 
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key= {formElement.id} 
                changed = {(event) => this.inputChangedHandler(event, formElement.id)}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                invalid = {!formElement.config.valid}
                shouldValid = {formElement.config.validation} 
                touched = {formElement.config.touched}/>
                
        ))
        return (
            <div className = "Auth">
                <form onSubmit={this.submitHandler}>
                    {form}
                    <button className = 'Button' 
                    disabled = {!this.state.formValid} style = {{background: '#5C9210', width: '50%', margin: 'auto'}}>SUBMIT</button>
                </form>
            </div>
        )
    }
}



export default Auth;