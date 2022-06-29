import React from 'react';
import classes from './Header.module.css'
const Header = ({title}) => {
    return (
        <div className={classes.AppHeader}>
            <h4 className={classes.Title}>{title}</h4>
        </div>
    );
};

export default Header;
