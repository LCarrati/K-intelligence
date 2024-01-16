import SignupForm from "../../Components/SignupForm/SignupForm"
import { Wrapper } from "./styles"
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom";


const SignupPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
      navigate('/login');
    };
    return (
        <Wrapper>
            <img src={logo} style={{'maxWidth': '120px', marginTop: '20px'}} alt="logo" />
            <h1>Crie sua conta grátis</h1>
            <p>Já tem uma conta? <span onClick={handleLoginClick}>Faça login</span></p>
            <SignupForm />
        </Wrapper>
    )
}

export default SignupPage