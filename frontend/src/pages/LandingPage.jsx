import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { landingPageStyles } from "../assets/dummystyle";
import { ArrowRight, LayoutTemplate, Menu, X } from "lucide-react";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
import { ProfileInfoCard } from "../components/Cards";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCTA=()=>{
    if(!user){
      setOpenAuthModal(true)
    }
    else{
      navigate('/dashboard')
    }
  }

  return (
    <div className={landingPageStyles.container}>
      {/*Header*/}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>ResumeXpert</span>
          </div>

          {/* Mobile Menu btn*/}
          <button
            className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={landingPageStyles.mobileMenuIcon} size={24} />
            ) : (
              <Menu size={24} className={landingPageStyles.mobileMenuIcon} />
            )}
          </button>

          {/* Desktop Navigation*/}
          <div className="hidden md:flex items-center">
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className={landingPageStyles.desktopAuthButton}
                onClick={() => setMobileMenuOpen(true)}
              >
                <div
                  className={landingPageStyles.desktopAuthButtonOverlay}
                ></div>
                <span className={landingPageStyles.desktopAuthButtonText}>
                  Get Started
                </span>
              </button>
            )}
          </div>

          {/*Mobile Menu*/}
          {mobileMenuOpen && (
            <div className={landingPageStyles.mobileMenu}>
              <div className={landingPageStyles.mobileMenuContainer}>
                {user ? (
                  <div className={landingPageStyles.mobileUserInfo}>
                    <div className={landingPageStyles.mobileUserWelcome}>
                      Welcome Back
                    </div>
                    <button
                      className={landingPageStyles.mobileDashboardButton}
                      onClick={() => {
                        navigate("/dashboard");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Go to Dashboard
                    </button>
                  </div>
                ) : (
                  <button
                    className={landingPageStyles.mobileAuthButton}
                    onClick={() => {
                      setOpenAuthModal(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className={landingPageStyles.main}>
        <section className={landingPageStyles.heroSection}>
          <div className={landingPageStyles.heroGrid}>
            {/* Left Content */}
            <div className={landingPageStyles.heroLeft}>
              <div className={landingPageStyles.tagline}>
                Professional Resume Builder
              </div>

              <h1 className={landingPageStyles.heading}>
                <span className={landingPageStyles.headingText}>Craft</span>
                <span className={landingPageStyles.headingGradient}>
                  Professional
                </span>
                <span className={landingPageStyles.headingText}>Resumes</span>
              </h1>

              <p className={landingPageStyles.description}>
                Create job-winning resumes with expertly designed templates.
                ATS-freindly, recruiter-approved, and tailored to your career goals.
              </p>

              <div  className={landingPageStyles.ctaButtons}>
                <button className={landingPageStyles.primaryButton} onClick={handleCTA}>
                      <div className={landingPageStyles.primaryButtonOverlay}>
                      </div>
                      <span className={landingPageStyles.primaryButtonContent}>
                        Start Building
                        <ArrowRight className={landingPageStyles.primaryButtonIcon} 
                        size={18}/>
                      </span>
                </button>

                <button className={landingPageStyles.secondaryButton} 
                onClick={handleCTA}>
                    View Templates
                </button>
              </div>

              {/* Stats Grid */}

              
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
