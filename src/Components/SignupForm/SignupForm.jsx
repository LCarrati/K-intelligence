import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Form, FromStepIndicator, InputField, InputWrapper, RadioWrapper, StepsContainer, SubmitButton } from "./styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        bio: '',
        website: '',
        phone: '',
        discord: '',
        type: 'user',
        latitude: '',
        longitude: '',
    });

    // Controle dos inputs
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? fileInputRef.current.files[0] : value,
        }));
    };

    // Envio dos dados de cadastro para o servidor
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = { ...formData };

        // Alterando os dados para se adequar ao envio ao servidor
        delete formDataToSend.confirmPassword;
        delete formDataToSend.image;
        formDataToSend.imageName = formData.image.name

        // Enviando os dados para o servidor
        try {
            // const response = await axios.post('https://testek-server.kintelligence.com.br:7331/user', formDataToSend, { // sem resposta

            // Envio de dados para o banco de dados
            await axios.post(
                'https://ghmuyzv4zzn7xnimyc4gks57i40nugrk.lambda-url.us-east-1.on.aws/',
                formDataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Envio da imagem para o servidor
            const avatarImageToSend = JSON.stringify(
                {
                    image: formData.image.name,
                    folderPath: `linktree/${formData.nickname}/`
                }
            )

            // Gerando o link assinado para a imagem
            const response = await axios.post(
                'https://ghmuyzv4zzn7xnimyc4gks57i40nugrk.lambda-url.us-east-1.on.aws/',
                avatarImageToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Enviando a imagem para o servidor através do link assinado
            await axios.put(response.data[0], formData.image, {
                headers: {
                    'Content-Type': formData.image.type, // Defina o tipo de conteúdo do arquivo
                },
            })

            // Tudo certo, redirecionar para a página de sucesso
            navigate('/congrats')

        } catch (error) {
            toast.error('Erro ao criar usuário', {
                position: "top-center"
            });
            console.error('Error:', error);
        }
    };


    // Formulário de cadastro multi-step
    // ------ início ------
    const [currentStep, setCurrentStep] = useState(0);
    let currentFormStep;
    let currentFormStepValidation;

    // Definir a quantidade de steps do formulário
    const steps = [0, 1, 2, 3]

    // Controle dos steps do formulário ao clicar no botão next
    const handleNextStep = () => {
        if (currentFormStepValidation) {
            setCurrentStep((prevState) => prevState + 1)
        } else {
            toast.error('Preencha todos os campos obrigatórios', {
                position: "top-center"
            });
        }
    };

    // Controle dos steps do formulário ao clicar no breadcrumb
    const handleChangeStep = (step) => {
        if (currentFormStepValidation) {
            setCurrentStep(step);
        } else {
            toast.error('Preencha todos os campos obrigatórios', {
                position: "top-center"
            });
        }
    }

    // Renderizar os steps e validações
    switch (currentStep) {
        case 0:
            currentFormStep = <>
                <InputWrapper>
                    <InputField type="text" name="name" value={formData.name} onChange={handleChange} />
                    <label>
                        Nome:
                    </label>
                </InputWrapper>
                <InputWrapper>
                    <InputField type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
                    <label>
                        Nome de Usuário:
                    </label>
                </InputWrapper>
                <RadioWrapper>
                    <input type="radio" id="genderMale" name="gender" value="male" onChange={handleChange} />
                    <legend htmlFor="genderMale">Homem</legend>
                    <input type="radio" id="genderFemale" name="gender" value="female" onChange={handleChange} />
                    <legend htmlFor="genderFemale">Mulher</legend>
                    <input type="radio" id="genderOther" name="gender" value="other" onChange={handleChange} />
                    <legend htmlFor="genderOther">Outro</legend>
                    <label>
                        Gênero:
                    </label>
                </RadioWrapper>
            </>
            currentFormStepValidation = formData.name && formData.nickname && formData.gender
            break;
        case 1:
            currentFormStep = <>
                <InputWrapper>
                    <InputField type="email" name="email" value={formData.email} onChange={handleChange} />
                    <label>
                        Email:
                    </label>
                </InputWrapper>
                <InputWrapper>
                    <InputField type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    <label>
                        Telefone:
                    </label>
                </InputWrapper>
                <InputWrapper>
                    <InputField type="text" name="discord" value={formData.discord} onChange={handleChange} />
                    <label>
                        Discord:
                    </label>
                </InputWrapper>
                <InputWrapper>
                    <InputField type="text" name="website" value={formData.website} onChange={handleChange} />
                    <label>
                        Website (sem http://):
                    </label>
                </InputWrapper>
            </>
            currentFormStepValidation = formData.email && formData.phone && formData.discord && formData.website
            break;
        case 2:
            currentFormStep = <>
                <InputWrapper>
                    <input type="file" name="image" ref={fileInputRef} onChange={handleChange} />
                    <label>
                        Avatar:
                    </label>
                </InputWrapper>
                <InputWrapper>
                    <textarea name="bio" maxLength={150} value={formData.bio} onChange={handleChange}></textarea>
                    <label>
                        Bio:
                    </label>
                </InputWrapper>
            </>
            currentFormStepValidation = formData.image && formData.bio
            break;
        case 3:
            currentFormStep = <>
                <InputWrapper>
                    <InputField type="password" name="password" value={formData.password} onChange={handleChange} />
                    <label>
                        Senha:
                    </label>
                </InputWrapper>
                <InputWrapper>
                    <InputField
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <label>
                        Confirmar senha:
                    </label>
                </InputWrapper>
            </>
            currentFormStepValidation = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
        default:
            break;
    }
    // Formulário de cadastro multi-step
    // ------ Fim ------

    // Obter a localização do usuário
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setFormData((prevData) => ({
                        ...prevData,
                        latitude,
                        longitude,
                    }))
                },
                (error) => {
                    console.error("Erro ao obter a localização:", error.message);
                }
            );
        }
    }, []);

    return (
        <>
            <StepsContainer>
                <FromStepIndicator $ativa={currentStep >= 0 ? 'true' : 'false'} onClick={() => handleChangeStep(0)}>1</FromStepIndicator>
                <FromStepIndicator $ativa={currentStep >= 1 ? 'true' : 'false'} onClick={() => handleChangeStep(1)}>2</FromStepIndicator>
                <FromStepIndicator $ativa={currentStep >= 2 ? 'true' : 'false'} onClick={() => handleChangeStep(2)}>3</FromStepIndicator>
                <FromStepIndicator $ativa={currentStep >= 3 ? 'true' : 'false'} onClick={() => handleChangeStep(3)}>4</FromStepIndicator>
            </StepsContainer>
            <Form>
                {currentFormStep}
                {currentStep < steps.length - 1 && <SubmitButton type="button" onClick={handleNextStep}>Próximo</SubmitButton>}
                {currentStep === steps.length - 1 && <SubmitButton type="submit" onClick={handleSubmit}>Enviar</SubmitButton>}
            </Form>
        </>
    );
};
export default SignupForm