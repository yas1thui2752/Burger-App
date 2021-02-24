import React from 'react';

import burgerLogo from '../../assets/Images/burger-image.png';
import classes from './_Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Muskoni order chei" />
    </div>
);

export default logo;
