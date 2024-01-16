import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Form, FromStepIndicator, InputField, InputWrapper, RadioWrapper, StepsContainer, SubmitButton } from "./styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const SignupForm = () => {
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

    const fileInputRef = useRef();
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? fileInputRef.current.files[0] : value,
        }));
    };


    const steps = [
        {
            id: 'personal', //nome, apelido, gênero
            title: 'Dados pessoais',
        },
        {
            id: 'contact', //email, telefone, website, discord
            title: 'Contato',
        },
        {
            id: 'moreInfo', // bio, avatar
            title: 'Aparência',
        },
        {
            id: 'password',
            title: 'Senha',
        }// lat e long via código geolocation, type vai ser sempre user
    ]

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = { ...formData };

        // Exclui um campo na cópia
        delete formDataToSend.confirmPassword;
        delete formDataToSend.image;
        formDataToSend.imageName = formData.image.name

        // Submit the form data or perform further actions
        console.log('Form data submitted:', formDataToSend);

        try {
            // Envie a solicitação usando Axios
            // const response = await axios.post('https://testek-server.kintelligence.com.br:7331/user', formDataToSend, { // sem resposta
            await axios.post('https://ghmuyzv4zzn7xnimyc4gks57i40nugrk.lambda-url.us-east-1.on.aws/', formDataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(formData)
            console.log(formData.image.name)
            const avatarImageToSend = JSON.stringify({ image: formData.image.name, folderPath: `linktree/${formData.nickname}/` })
            console.log(avatarImageToSend)
            const response = await axios.post('https://ghmuyzv4zzn7xnimyc4gks57i40nugrk.lambda-url.us-east-1.on.aws/', avatarImageToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data)
            console.log(formData.image.type)
            await axios.put(response.data[0], formData.image, {
                headers: {
                    'Content-Type': formData.image.type, // Defina o tipo de conteúdo do arquivo
                },
            })
            // Lide com a resposta da API conforme necessário
            console.log('API Response:', response.data);
            navigate('/congrats')

        } catch (error) {
            // Lide com erros da solicitação
            toast.error('Erro ao criar usuário', {
                position: "top-center"
            });
            console.error('Error:', error);
        }
    };

    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = () => {
        if (currentFormStepValidation) {
            setCurrentStep((prevState) => prevState + 1)
        } else {
            toast.error('Preencha todos os campos obrigatórios', {
                position: "top-center"
            });
        }
    };

    const handleChangeStep = (step) => {
        if (currentFormStepValidation) {
            setCurrentStep(step);
        } else {
            toast.error('Preencha todos os campos obrigatórios', {
                position: "top-center"
            });
        }
    }

    let currentFormStep;
    let currentFormStepValidation;

    switch (steps[currentStep].id) {
        case 'personal':
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
        case 'contact':
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
        case 'moreInfo':
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
        case 'password':
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

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('aff')
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
                {currentStep < steps.length - 1 && <SubmitButton type="button" onClick={handleNextStep}>Next</SubmitButton>}
                {currentStep === steps.length - 1 && <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>}
            </Form>
        </>
    );
};
export default SignupForm