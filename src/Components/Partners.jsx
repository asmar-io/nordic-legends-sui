import { Link } from "react-router-dom";
import KillaClubPartnerLogo from "../Assets/images/killa-club-partner-logo.png";
import SuicideClubPartnerLogo from "../Assets/images/suicide-social-club-partner-logo.png";
import BlubLifeLabsPartnerLogo from "../Assets/images/blob-life-lab-partner-logo.png";
import FryOnSuiPartnerLogo from "../Assets/images/fry-on-sui-partner-logo.png";
import TradePortPartnerLogo from "../Assets/images/tradeport-logo.png";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";

const Partners = () => {
  const partnerInfos = [
    { site: "https://x.com/killaclubsui", img: KillaClubPartnerLogo, name: "Killa Club" },
    { site: "https://x.com/SSCONSUI", img: SuicideClubPartnerLogo, name: "Suicide Social Club" },
    { site: "https://x.com/BlobLifeLabs", img: BlubLifeLabsPartnerLogo, name: "Blub Life Labs" },
    { site: "https://x.com/FryMemecoin", img: FryOnSuiPartnerLogo, name: "$Fry On Sui" },
    { site: "https://x.com/tradeportxyz", img: TradePortPartnerLogo, name: "Tradeport" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [inView, setInView] = useState(false);

  const partnersRef = useRef(null);
  const autoSlideRef = useRef(null);

  // Check if in mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for triggering animations on desktop
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (partnersRef.current) {
      observer.observe(partnersRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Auto-slide partners on mobile
  useEffect(() => {
    if (isMobile) {
      autoSlideRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % partnerInfos.length);
      }, 3000); // Slide every 3 seconds
    }
    return () => clearInterval(autoSlideRef.current);
  }, [isMobile, partnerInfos.length]);

  // Mobile Navigation Handlers
  const goToNextPartner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % partnerInfos.length);
  };

  const goToPreviousPartner = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + partnerInfos.length) % partnerInfos.length);
  };

  return (
    <div ref={partnersRef} className="container partners-section-container" id="partners">
      <h1 className="partner-heading">Our Battle Brothers</h1>
      <div className={`partners-container ${isMobile ? "mobile" : "desktop"}`}>
        {isMobile ? (
          <div className="mobile-partner">
            <IoIosArrowDropleftCircle className="nav-arrow left-arrow" onClick={goToPreviousPartner} />
            <Link to={partnerInfos[currentIndex].site}>
              <div className="partner-container active">
                <img
                  className="partner-logo"
                  src={partnerInfos[currentIndex].img}
                  alt={`${partnerInfos[currentIndex].name}'s logo`}
                />
                <p className="partner-name">{partnerInfos[currentIndex].name}</p>
              </div>
            </Link>
            <IoIosArrowDroprightCircle className="nav-arrow right-arrow" onClick={goToNextPartner} />
          </div>
        ) : (
          partnerInfos.map((partnerInfo, index) => (
            <Link to={partnerInfo.site} key={index}>
              <div
                className={`partner-container ${inView ? "slide-in" : ""}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img className="partner-logo" src={partnerInfo.img} alt={`${partnerInfo.name}'s logo`} />
                <p className="partner-name">{partnerInfo.name}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Partners;
