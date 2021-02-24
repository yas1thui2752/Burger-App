import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate (){
        console.log('ordersummary update');
    }
    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                            <li key={igKey}>
                                <span style={{textTransform: 'capitalize'}}>{igKey}:</span> {this.props.ingredients[igKey]}
                            </li>
                        )
            });
        return(
            <Aux>
                <h3> Order Summary</h3>
                <p>Your burger ingredients:</p>
                <ul>
                    { ingredientsSummary }
                </ul>
                <p><strong>Total price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>Cancel</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>Continue to Checkout</Button>
            </Aux>
        )
    }
}

export default OrderSummary;
