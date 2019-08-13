import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state() {
        ingredients = {
            meat: 1,
            bacon: 2,
            cheese: 2,
            salad: 2

        }
    }
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <div>Burger Controller</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;