import React from 'react';

import classes from './_Order.module.css';

const order = ( props ) => {
    const ingredients = [];

    //converting JS object into array and pushing into empty ingredients array.
    for (let ingredientsName in props.ingredients){
        ingredients.push({
            name: ingredientsName,
            amount: props.ingredients[ingredientsName]
        });
    }

    const ingredientsOutput = ingredients.map(ig =>{
        return <span
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name}({ig.amount})</span>
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Total Price:{ props.price.toFixed(2) }</p>
            {/* <p>Name:{ props.customer.name }</p> */}

        </div>
    );
}

export default order;
