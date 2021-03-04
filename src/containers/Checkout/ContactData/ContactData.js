import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

import Button from '../../../components/UI/Button/Button';
import classes from './_ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label:'Full Name'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label:'Address'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                label:'ZIP Code'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label:'Country'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                label: 'Email'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false,
        label:'Delivery Method'
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        console.log("orderHandler", this.props.ingredients);
        
        this.setState({ spinning: true});

        //
        const formData = {};

        //formDataIdentifier = name, street,email,..
        for ( let formDataIdentifier in this.state.orderForm ) {
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value;
            //above indicates name or email or country = user entered input value
        }

        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customerInfo: formData
        }
        //sending order summary to firebase db and storing in /orders url
        axios.post('/orders.json', orderData)
            .then(response => {
                this.setState({ spinning: false });

                //navigating to home page after clicking order now button
                this.props.history.push('/');

                console.log('post then res', orderData);
            })
            .catch(error => {
                this.setState({ spinning: false });
                console.log('post catch res', error);
            });
    }

    formValidation(value, rules){
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

    // inputChangedHandler =(event, inputIdentifier) => {
    //     //console.log(event.target.value);

    //     //copying orderform state to updatedOrderForm. By doing this it wont copy nested obj inside name, street,..
    //     const updatedOrderForm = {
    //         ...this.state.orderForm
    //     };

    //     //since orderForm obj in state has nested elements so copying inside properties like name,street,email,.. obj below perfectly
    //     const updatedFormElement = {
    //         ...updatedOrderForm[inputIdentifier]
    //     };

    //     //this will assign our typed value to value {orderForm.name.value} key in orderForm state 
    //     updatedFormElement.value = event.target.value;
    //     updatedFormElement.valid = this.formValidation(updatedFormElement.value, updatedFormElement.validation);
    //     updatedFormElement.touched = true;
    //     updatedOrderForm[inputIdentifier] = updatedFormElement;

    //     let formIsValid = true;
    //     for (let inputIdentifier in updatedOrderForm) {
    //         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    //     }

    //     //console.log('updated form', updatedOrderForm);

    //     this.setState({ orderForm:updatedOrderForm, formIsValid: formIsValid });

    // }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.formValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValidSet = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValidSet = updatedOrderForm[inputIdentifier].valid && formIsValidSet;
        }
        console.log('form valid', formIsValidSet);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValidSet});
    }

    render(){

        const formElementsArray=[];

        for( let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form =(
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType='' elementConfig='' value='' /> */}

                {formElementsArray.map( formElements => (
                    <Input 
                        key={formElements.id}
                        elementType={formElements.config.elementType}
                        elementConfig={formElements.config.elementConfig}
                        value={formElements.config.value}
                        label={formElements.config.label}
                        invalid={!formElements.config.valid}
                        shouldValidate={formElements.config.validation}
                        touched={formElements.config.touched}
                        inputChanged={(event) => this.inputChangedHandler(event, formElements.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}> Order Now</Button>
            </form>
        );

        if( this.state.spinning ){
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h3>Enter Your Details</h3>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);