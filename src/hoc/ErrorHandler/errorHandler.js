import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Supx from '../Supx'


const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res => res, (error) => {
               this.setState({error: error})  
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);

        }
        removeErrorHandler = () => {
            this.setState({error: null})
        }
        render() {
            return (
                <Supx>
                <Modal show = {this.state.error}
                modalClosed = {this.removeErrorHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}/>
                </Supx>
                 
            )
        }
       
    } 
}

export default errorHandler;