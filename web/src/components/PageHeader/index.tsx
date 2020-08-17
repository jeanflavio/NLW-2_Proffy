import React from 'react';

import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

import './style.css';

//propriedades do page header
interface PageHeaderProps {
    title: string;
    description?: string;
    //o ponto de interrogação faz com que essa propriedade não seja
}
//Function Component
const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return ( 
        <header className="page-header">
        <div className="top-bar-container">
            <Link to="/">
                <img src={backIcon} alt="Voltar"/>
            </Link>
            <img src={logoImg} alt="Proffy" />
        </div>

        <div className="header-content">
            <strong>{props.title}</strong> 
            
            { props.description && <p>{props.description}</p> }

            {props.children}
        </div>

    </header>
    )
}

export default PageHeader;