import React, {Component} from 'react';
import Order from  '../../components/Burger/OrderSummary/Order/Order';
import axios from '../../axios-orders'
import errorHandler from '../../hoc/ErrorHandler/errorHandler';


class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        console.log('About to send request')
        axios.get('/orders.json')
        .then(res => {
            console.log(res.data)
          const fetchedOrder = [];
            for(let key in res.data) {
                fetchedOrder.push({...res.data[key],
                id: key})
            }
            this.setState({loading: false, orders: fetchedOrder});
        }).catch(err => {
            this.setState({loading: false});
        }

        );
    }
    render() {
        return (
            <div>
            {this.state.orders.map(order => (
                <Order key= {order.id}
                ingredients = {order.ingredients}
                price = {order.totalPrice}/>
            ))}
            </div>
        );
    }
}

export default errorHandler (Orders, axios)