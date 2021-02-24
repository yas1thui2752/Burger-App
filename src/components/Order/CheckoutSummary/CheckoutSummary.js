import React from 'react';

import classes from './_CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';


const checkoutSummary = ( props )=> {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Enjoy It..!!</h1>
            <h3>Total price: ${props.price}</h3>
            
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.checkoutCalcel}>
                Cancel
            </Button>
            <Button btnType='Success' clicked={props.checkoutContinue}>
                Continue
            </Button>
        </div>
    );
}

export default checkoutSummary;