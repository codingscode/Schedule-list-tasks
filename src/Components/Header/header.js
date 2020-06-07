import React from 'react'

import './style_header.css'
import logoimage from '../../Assets/agenda.png'


function Cabecario(){
    return (
        <div className="header-container">
            <img src={logoimage} alt="planning"/>
            <h1>Schedule</h1>
        </div>
    )
}

export default Cabecario