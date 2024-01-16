import React, { useEffect, useState } from 'react'
import { Avatar, Links, Middle, Top, Wrapper } from './styles'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const PublicPage = () => {
    const { userNickname } = useParams();

    const [userData, setUserData] = useState({
        userNickname: '',
        bio: '',
        website: '',
        discord: '',
        phone: '',
        avatar: '',
        email: ''
    });

    // Obtenção de dados do usuário quando o componente está montado
    const getUserData = async () => {
        const user = await axios.get(
            `https://ghmuyzv4zzn7xnimyc4gks57i40nugrk.lambda-url.us-east-1.on.aws/?nickname=${userNickname}`, {
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

    return (
        <Wrapper>
            <Top>
                <Avatar src={`./${userData.userNickname}/${userData.imageName}`} alt="avatar" />
            </Top>
            <Middle>
                <h1>{userData.userNickname}</h1>
                <p>{userData.bio}</p>
                <a href={`http://${userData.website}`} target="_blank"><Links>Website</Links></a>
                <a href={`https://discordapp.com/users/${userData.discord}`} target="_blank"><Links>Discord Discord</Links></a>
                <a href={`tel:${userData.phone}`} target="_blank"><Links>{userData.phone}</Links></a>
                <a href={`mailto:${userData.email}`} target="_blank"><Links>{userData.email}</Links></a>
            </Middle>
        </Wrapper>
    )
}

export default PublicPage