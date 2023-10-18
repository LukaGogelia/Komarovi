import React from 'react'
import HomeHero from './HomeHero'
import { useTranslations } from 'next-intl'

const ServerHomeHero = () => {

  const t = useTranslations("/");
  const clubKeys = [
    "drama-club", "debate-club", "english-debates", "english-literature",
    "cinema-club", "chess-club", "thinkers-club", "research-club", "sat-club",
    "uni-community", "geography-club", "morality-equity", "study-to-learn",
    "chemistry-club", "sports-club", "diversity-equity", "young-roots", "kombosto",
    "physics-programming", "civic-education"
  ];

  const clubWords = {};

  clubKeys.forEach(key => {
    clubWords[key] = t(key);
  });

  return (
    <HomeHero clubWords={JSON.stringify(clubWords)} />
  )
}

export default ServerHomeHero