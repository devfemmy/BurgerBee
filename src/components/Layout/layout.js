import React from 'react'
import Aux from '../../hoc/Aux';
import './layout.css';

const layout = ( props ) => {
    return (
        <Aux>
        <div>Tool, Sidebar, Drawer</div>
        <main className = "Content">
        {props.children}
        </main>
        </Aux>
 
        
    );
}
 

export default layout;
