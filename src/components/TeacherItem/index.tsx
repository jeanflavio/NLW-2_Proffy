import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './style.css'


function TeacherItem() {
    return (
        <article className="teacher-item">
                <header>
                  <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ae/aecac689cf02e496288a456e76444f56b4691e13_full.jpg" alt=""/>
                  <div>
                    <strong>Leãozinho</strong>
                    <span>Educação Fisica</span>
                  </div>
                </header>
                <p>
                Entusiasta das melhores tecnologias de química avançada.
                  <br /> <br/>
                Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
                </p>

                <footer>
                  <p>
                    Preço/Hora
                    <strong>R$ 80,00</strong>
                  </p>
                  <button type="button">
                    <img src={whatsappIcon} alt="whatsapp"/>
                    Entrar em contato
                  </button>
                </footer>
            </article>
    )
}

export default TeacherItem;