import React from 'react';
import classes from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faChartColumn, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className={classes.AppFooter}>
            <div>
                <Link to='/'><FontAwesomeIcon className={classes.icons} icon={faList}/></Link>
            </div>
            <div>
                <Link to='/graph'><FontAwesomeIcon className={classes.icons} icon={faChartColumn} /></Link>
            </div>
            <div>
                <Link to='/converter'><FontAwesomeIcon className={classes.icons} icon={faHandshake}/></Link>
            </div>
        </div>
    );
};

export default Footer;
