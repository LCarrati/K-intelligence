import { Avatar, Middle, Top, Wrapper } from "./styles"
import { Form, InputField, InputWrapper, SubmitButton } from '../../Components/SignupForm/styles'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"


const DashboardPage = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        bio: '',
        website: '',
        discord: '',
        phone: '',
        avatar: '',
        email: ''
    });

    // Verificando se o usuário está logado (rudimental, apenas para testes)
    useEffect(() => {
        const userStatus = localStorage.getItem('status');
        if (userStatus && JSON.parse(userStatus).logado === false) {
            navigate('/login');
        } else if (!userStatus) {
            navigate('/login');
        } else {
            toast.success('Seja bem vindo(a) ' + JSON.parse(userStatus).nickname, {
                position: "top-center"
            });
        }

    }, []);
    const userNickname = JSON.parse(localStorage.getItem('status')).nickname 

    // Obtenção de dados do usuário quando o componente está montado
    const getUserData = async () => {
        const user = await axios.get(`https://ghmuyzv4zzn7xnimyc4gks57i40nugrk.lambda-url.us-east-1.on.aws/?nickname=${userNickname}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return user.data
    }
    useEffect(() => {
        getUserData().then((data) => {
            setUserData(data)
        })
    }, [])

    // Controle dos inputs
    const handleChange = (e) => {
        // lógica de alteração de dados no servidor ainda não implementada
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    }

    // Controle da edição dos inputs
    const [isDisabled, setIsDisabled] = useState(true);

    return (
        <Wrapper>
            <Top>
                <Avatar src={`/linktree/${userData.nickname}/${userData.imageName}`} alt="avatar" />
            </Top>
            <Middle>
                <h1>Olá {userData.nickname}!</h1>
                <p>A sua página de links já está disponível em:</p>
                <p><a href={`https://leonardo-carrati.dev.br/linktree/links/${userData.nickname}`} target="_blank">leonardo-carrati.dev.br/linktree/links/{userData.nickname}</a></p>
                <br />
                <h2>Seus links</h2>
                <Form>
                    <InputWrapper>
                        <InputField type="text" name="website" value={userData.website} onChange={handleChange} disabled={isDisabled} />
                        <label>
                            Website:
                        </label>
                    </InputWrapper>
                    <InputWrapper>
                        <InputField type="text" name="discord" value={userData.discord} onChange={handleChange} disabled={isDisabled} />
                        <label>
                            Discord:
                        </label>
                    </InputWrapper>
                    <InputWrapper>
                        <InputField type="text" name="phone" value={userData.phone} onChange={handleChange} disabled={isDisabled} />
                        <label>
                            Telefone:
                        </label>
                    </InputWrapper>
                    <InputWrapper>
                        <InputField type="text" name="email" value={userData.email} onChange={handleChange} disabled={isDisabled} />
                        <label>
                            E-mail:
                        </label>
                    </InputWrapper>
                    <InputWrapper>
                        <textarea name="bio" maxLength={100} value={userData.bio} onChange={handleChange} disabled={isDisabled}></textarea>
                        <label>
                            Bio:
                        </label>
                    </InputWrapper>
                </Form>
                {!isDisabled && <SubmitButton onClick={() => setIsDisabled(true)}>Salvar alterações</SubmitButton>}
                {isDisabled && <SubmitButton onClick={() => setIsDisabled(false)}>Editar links</SubmitButton>}
            </Middle>
        </Wrapper>
    )
}

export default DashboardPage