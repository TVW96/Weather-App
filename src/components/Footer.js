import React from 'react';
import "./Footer.css";

function Footer() {
    return (
        <div className='footer'>
            <div className='col1'>
                <h3>Weather Where?</h3>
            </div>
            <div className='col2'>
                <h5>Buy me a Coffee</h5>
                <ul>
                    <li>Stack Overflow</li>
                    <li>Github</li>
                    <li>LinkedIn</li>
                </ul>
            </div>
            <div className='col3'>
                <ul>
                    <li>About</li>
                    <li>Repo</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer