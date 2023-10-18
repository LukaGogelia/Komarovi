import React from 'react'
import LoginForm from './LoginForm'
import { useTranslations } from 'next-intl'

const ServerLoginForm = () => {
    const t = useTranslations("login");
    const keys = [
        "login", "identifier", "password", "stayLoggedIn"
    ];
    const words = {};

    keys.forEach(key => {
        words[key] = t(key);
    });

    console.log(JSON.stringify(words));
    return (
        <LoginForm words={JSON.stringify(words)} />
    )
}

export default ServerLoginForm