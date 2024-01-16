import { Avatar, Middle, Top, Wrapper } from "./styles"
import avatar1 from '../../assets/avatar1.jpg'
import { Form, InputField, InputWrapper, SubmitButton } from '../../Components/SignupForm/styles'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"


const DashboardPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userStatus = localStorage.getItem('status');
    if (userStatus && JSON.parse(userStatus).logado === false) {
      navigate('/login');
    } else if (!userStatus) {
      navigate('/login');
    } else {
      toast.success('Seja bem vindo(a) ' + JSON.parse(userStatus).nickname);
    }

  }, []);
  const userNickname = JSON.parse(localStorage.getItem('status')).nickname

  const getUserData = async () => {
    const user = await axios.get(`https://ghmuyzv4zzn7xnimyc4gks57i40nugrk.lambda-url.us-east-1.on.aws/?nickname=${userNickname}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return user.data
  }
  // console.log(getUserData())
  const [userData, setUserData] = useState({
    username: '',
    bio: '',
    website: '',
    discord: '',
    phone: '',
    avatar: '',
    email: ''
  });

  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data)
      console.log(data)
    })
  }, [])

  const handleChange = (e) => {
    // enviar para o banco somente o dado alterado
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  }

  const [isDisabled, setIsDisabled] = useState(true);


  return (
    <Wrapper>
      <Top>
        <Avatar src={`./${userData.username}/${userData.imageName}`} alt="avatar" />
      </Top>
      <Middle>
        <h1>Olá {userData.username}!</h1>
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