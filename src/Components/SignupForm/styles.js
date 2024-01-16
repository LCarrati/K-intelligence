import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: auto;
    max-width: 320px;
    width: 90%;
`

export const InputField = styled.input`
    max-width: 320px;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #D5D8DE;
    border-radius: 4px;
    margin-bottom: 8px;
    padding: 6px;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    opacity: 0.8;
    color: #323941;
    
    ::placeholder {
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #323941;
        opacity: 0.8;
    }

    :focus {
        outline: none;
        border-radius: 4px;
        padding: 16px;
        color: #323941;
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        opacity: 0.8;
    }
`;

export const InputWrapper = styled.div`
    position: relative;
    padding-top: 13px;

    & input {
        border: 1px solid lightgrey;
        border-radius: 5px;
        min-width: 250px;
        padding: 15px 20px;
        font-size: 16px;
        box-sizing: border-box;
        max-width: 320px;
    }

    & label {
        pointer-events: none;
        position: absolute;
        left: 15px;
        background-color: white;
        padding: 0 3px;
        box-sizing: border-box;
        font-size: 13px;
        top: 5px;
        color: #3951b2;
        height: 13px;
        border-radius: 50%;
    }

    & textarea {
        width: 100%;
        max-width: 320px;
        border: 1px solid lightgrey;
        border-radius: 5px;
        min-width: 250px;
        padding: 15px 20px;
        font-size: 16px;
        box-sizing: border-box;
        resize: none;
        height: 130px;
    }
`

export const RadioWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    position: relative;
    min-width: 250px;
    padding: 15px 20px;
    max-width: 320px;
    width: 100%;
    box-sizing: border-box;

        & label {
        pointer-events: none;
        position: absolute;
        top: calc(50% - 8px);
        left: 15px;
        background-color: white;
        padding: 5px;
        box-sizing: border-box;
        top: -15px;
        font-size: 13px;
        color: #3951b2;
        }
`

export const SubmitButton = styled.button`
    max-width: 320px;
    width: 100%;
    height: 40px;
    background-color: #3951b2;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: #FFFFFF;
    cursor: pointer;
    margin: auto;

    &:hover {
        background-color: #3951b2c9;
    }
`

export const FromStepIndicator = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 25px;
    background-color: ${props => props.$ativa === 'true' ? '#3951b2' : 'white'};
    color: ${props => props.$ativa === 'true' ? 'white' : '#333'};
    outline: none;
    padding: 0.75em 0.75em 0.75em 1.25em;
    position: relative;
    text-decoration: none;
    transition: background 0.2s linear;
    font-family: fantasy;
    width: 100%;

    &:after, &:before {
        background: ${props => props.$ativa === 'true' ? '#3951b2' : 'white'};
        bottom: 0;
        clip-path: polygon(50% 50%, -50% -50%, 0 100%);
        content: "";
        left: 100%;
        position: absolute;
        top: 0;
        transition: background 0.2s linear;
        width: 1em;
        z-index: 1;
    }

    &:before {
        background: #cbd2d9;
        margin-left: 1px;
    }

    &:last-child {
        border-right: none;
    }
`

export const StepsContainer = styled.div`
    border: 1px solid #cbd2d9;
    border-radius: 0.3rem;
    display: flex;
    overflow: hidden;
    max-width: 320px;
    margin: 0 auto 25px;
    width: 100%;
`