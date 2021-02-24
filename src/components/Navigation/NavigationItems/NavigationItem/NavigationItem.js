import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './_NavigationItem.module.css';

const navigationitem = ( props ) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}> {props.children}
        </NavLink>
    </li>
);

export default navigationitem;