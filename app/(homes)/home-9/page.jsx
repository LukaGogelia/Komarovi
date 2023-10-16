


import ModeChanger from '@/components/homes/ModeChanger'
import HomeNine from '@/components/homes/homepageWrappers/HomeNine'
import React from 'react'

export const metadata = {
  title: 'Home-9 || Educrat - Professional LMS Online Education Course NextJS Template',
  description:
    'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',
  
}

export default function page() {
  return (
    <div style={{maxWidth:'100vw',overflow:'hidden'}}>
      
      <ModeChanger whiteMode={true}/>
        <HomeNine/>
    </div>
  )
}
