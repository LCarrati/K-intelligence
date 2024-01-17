import { useNavigate } from "react-router-dom";
import LoginForm from "../../Components/LoginForm/LoginForm"
import logo from '../../assets/logo.png'
import { Title, Wrapper } from "./styles"
import { useEffect } from "react";

const LoginPage = () => {
    const navigate = useNavigate();

    // Verificando se o usuário está logado (rudimental, apenas para testes)
    useEffect(() => {
        const userStatus = localStorage.getItem('status');
        if (userStatus && JSON.parse(userStatus).logado === true) {
            navigate('/dashboard/' + JSON.parse(userStatus).nickname);
        } 
    }, []);

    const handleSignupClick = () => {
        navigate('/register');
    };

    return (
        <Wrapper>
            <img src={logo} style={{ 'maxWidth': '160px', marginTop: '50px' }} alt="logo" />
            <Title>My Link Tree</Title>
            <LoginForm />
            <p>Não tem uma conta? <span onClick={handleSignupClick}>Cadastre-se gratuitamente!</span></p>
        </Wrapper>
    )
}

export default LoginPage