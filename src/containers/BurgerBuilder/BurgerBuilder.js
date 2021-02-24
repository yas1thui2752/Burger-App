//Libraries
import React, { Component } from "react";
import axios from '../../axios-orders';

//components
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

//functions
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';

const INGREDIENTS_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    chicken: 2.0,
    bacon: 1.5
}

class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state= { state can be managed by here too }
    // }

    state = {
        ingredients : null,
        totalPrice: 2,
        purchasable: false,
        purchasing:false,
        spinning: false,
        error:false
    }

    //using this to fetch ingredients from the backend (firebase) db
    componentDidMount(){
        //receiving ingredients from firebase db from /ingrediests
        axios.get('https://sample-burger-a1dfc.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients : response.data})
            }).catch(error => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState (ingredients){
        
        const sum = Object.keys( ingredients )
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable : sum > 0 } );
        console.log("updatePurchaseState", sum);

    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition =  INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice =  oldPrice + priceAddition;
        console.log("updatedIng", updatedIngredients);
        this.setState({ totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){//checks it sthe length of array is 0 then returning without anything
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceReduction =  INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice =  oldPrice - priceReduction;
        console.log("removeIng", updatedIngredients);
        this.setState({ totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = ()=>{
        //adding order now button click event to true
        this.setState({ purchasing:true })
    }

    purchaseCancleHandler = () => {
        //cancelling order now button click event
        this.setState({ purchasing:false })
    }

    purchaseContinueHandler = () => {
        //commenting brlow part because to add routing to checkout page before sending to firebase db. and moving this to ContactData file in orderHandler method
        //alert("Going to Checkout");
        // this.setState({ spinning: true});
        // const orderData = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Yash',
        //         address: {
        //             street:'1000 some place here',
        //             city:'In us',
        //             state:'OH',
        //             country:'earth'
        //         },
        //         email:'random@tush.com'
        //     },
        //     delivary:'ASAP'
        // }
        // //sending order summary to firebase db and storing in /orders url
        // axios.post('/orders.json', orderData)
        //     .then(response => {
        //         this.setState({ spinning: false, purchasing: false });
        //         console.log('post then res', response);
        //     })
        //     .catch(error => {
        //         this.setState({ spinning: true, purchasing: false });
        //         console.log('post catch res', error);
        //     });

        //attaching ingredients into url to access those in checkout page using query parameters(search)
        const queryParameters = [];
        
        for (let i in this.state.ingredients){
            queryParameters.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParameters.push('price=' + this.state.totalPrice); //price=5.7

        const queryString = queryParameters.join('&');
        console.log('queryString', queryString); //bacon=2&cheese=2&chicken=1&salad=1

        this.props.history.push({
            pathname: '/checkout',
            search : '?' + queryString
        });

        
    }
    
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <h3>Burger can't load</h3>:<Spinner />;

         //displaying burger model, ingredients and order summary only there are ingredients   
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = { this.state.ingredients } />
                    <BuildControls
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        price = {this.state.totalPrice}
                        purchasable={ this.state.purchasable }
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                            ingredients = {this.state.ingredients}
                            price = {this.state.totalPrice}
                            purchaseCancel = {this.purchaseCancleHandler}
                            purchaseContinue = {this.purchaseContinueHandler}/>;

        }

        if(this.state.spinning){
            orderSummary = <Spinner />
            console.log("spinning.........!!");
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancleHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);