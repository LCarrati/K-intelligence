import React, { useEffect } from 'react'
import { Wrapper } from './styles'
import { useNavigate } from 'react-router-dom'

const CongratsPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/login');
        }, 4000);
    })
    return (
        <Wrapper>
            <h1>Tudo pronto!</h1>
            <p>Agora você pode <b>fazer login</b> e compartilhar seus links!</p>
            <p>Você será <b>redirecionado</b> para a página de login <b>automaticamente</b>.</p>
            <p>Caso não seja redirecionado, clique <a href="/login">aqui</a>.</p>
        </Wrapper>
    )
}

export default CongratsPage