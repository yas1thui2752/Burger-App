import React, { Component } from "react";
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state={
        ingredients:null,
        price:0
    }

    componentWillMount (){
        const query = new URLSearchParams(this.props.location.search);
        
        const ingredients ={};
        let price = 0;

        for( let param of query.entries()){
            //['salad','1']
            //extracting price and ingredients from url
            
            if(param[0] === 'price'){
                price = param[1];
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ ingredients : ingredients, totalPrice: price });
        console.log('checkout cmpDidMount ingredients', ingredients);

    }

    checkoutCalcelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        console.log('Checkout to contact data form');
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={ this.state.ingredients }
                    checkoutCalcel={ this.checkoutCalcelHandler }
                    checkoutContinue={ this.checkoutContinueHandler }
                    price={this.state.totalPrice}/>

                    {/* By declearing ContactData manully in render method insted of using component attribute is to pass the 
                    ingredients and total price data to ContactData component */}

                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} />)} />
            </div>
        );
    }
}

export default Checkout;