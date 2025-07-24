import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {landingPageStyles} from '../assets/dummystyle'
import {LayoutTemplate, Menu, X} from 'lucide-react'
import { useState } from 'react'
import { UserContext } from '../context/UserContext'

const LandingPage = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div className={landingPageStyles.container}>
        {/*Header*/}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
            <div className={landingPageStyles.logoContainer}>
                <div className={landingPageStyles.logoIcon}>
                   <LayoutTemplate className={landingPageStyles.logoIconInner}/>
                </div>
                <span className={landingPageStyles.logoText}>
                    ResumeXpert
                </span>
            </div>

            {/* Mobile Menu btn*/}
            <button className={landingPageStyles.mobileMenuButton}
            onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>
                { 
                    mobileMenuOpen ?
                    <X className={landingPageStyles.mobileMenuIcon} size={24}/> 
                    :
                    <Menu size={24} className={landingPageStyles.mobileMenuIcon}/> 
                } 
            </button>

            {/* Desktop Navigation*/}
            <div className="hidden md:flex items-center">
                {user}
            </div>
        </div>
      </header>
    </div>
  )
}

export default LandingPage
