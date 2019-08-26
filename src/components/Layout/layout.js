import React, {Component} from 'react'
import Supx from '../../hoc/Supx';
import './layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    SideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
         return {showSideDrawer: !prevState.showSideDrawer};
        } );
    }
    render() {

        return (
            <Supx>
            <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler} /> 
            <SideDrawer 
            open = {this.state.showSideDrawer}
            closed = {this.SideDrawerHandler} />
            <main className = "Content">
            {this.props.children}
            </main>
            </Supx>
     
            
        );
    }
   
}
 

export default Layout;
