import React from 'react';

import classes from './_Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = ( props ) => {

    //keys object method convert ingredients keys into array.
    //1st map method loops through keys array(salad, meat, cheese,...)
    //2nd map loops through number of slies it contain(meat- 2, cheese-2,salad-1,..)
    //reduce array method takes all the arrays and group them into 1 single array. so that we can find length and display msg if no ingredients
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igName => {
            const amount = props.ingredients[igName];
            //console.log("keyssd", amount);
            return [...Array(amount)].map((_, i) => {
                return <BurgerIngredients key={igName +i} type={igName} />;
            });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        //console.log("transformed", transformedIngredients);

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please add ingredients</p>
        }

    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;