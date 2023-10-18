import React from 'react'
import Menu from './Menu'
import { useTranslations } from 'next-intl'

const ServerMenu = ({ allClasses, headerPosition }) => {
    const t = useTranslations('menu');
    const clubKeys = [
        "home", "clubs", "events", "news", "projects", "contact"
    ];

    const words = {};

    clubKeys.forEach(key => {
        words[key] = t(key);
    });
    return (
        <Menu allClasses={allClasses} headerPosition={headerPosition} words={JSON.stringify(words)} />
    )
}

export default ServerMenu