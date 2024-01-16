import React, { useState } from 'react'
import { Form, InputField, InputWrapper, SubmitButton } from '../SignupForm/styles'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const LoginForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nickname: '',
        password: '',
    })

    // Controle dos inputs
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? e.target.files[0] : value,
        }));
    };

    // Envio dos dados para o servidor de login
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validations
        if (
            !formData.nickname ||
            !formData.password
        ) {
            toast.error('Todos os campos são obrigatórios');
            return;
        }

        const response = await axios.get(`https://ghmuyzv4zzn7xnimyc4gks57i40nugrk.lambda-url.us-east-1.on.aws/?nickname=${formData.nickname}&password=${formData.password}&type=login`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200) {
            const status = {
                logado: true,
                nickname: formData.nickname
            }
            localStorage.setItem('status', JSON.stringify(status))
            navigate(`/dashboard/${formData.nickname}`)
        } else {
            toast.error('Credenciais inválidas')
        }
    }


    return (
        <Form onSubmit={handleSubmit}>
            <InputWrapper>
                <InputField type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
                <label>
                    Usuário:
                </label>
            </InputWrapper>
            <InputWrapper>
                <InputField type="password" name="password" value={formData.password} onChange={handleChange} />
                <label>
                    Senha:
                </label>
            </InputWrapper>
            <SubmitButton type="submit">Login</SubmitButton>
        </Form>
    )
}

export default LoginForm