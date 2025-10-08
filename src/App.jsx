import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AboutSection } from './AboutSection';
import { COLORS, MENU_ITEMS, SOCIAL_ITEMS } from './COLORS';
import { BookingForm } from './BookingForm';
import { ExcursionsSection } from './ExcursionsSection';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { MenuPanel } from './MenuPanel';
import { ToursSection } from './ToursSection';
import { Footer } from './Footer';
import { ServicesSection } from './ServicesSection';

// Pattern Background Component with Opacity Change
const PatternBackground = ({ color = COLORS.darkRed, opacity = 0.32 }) => {
  const [sectionOpacity, setSectionOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Calculate opacity based on scroll position
      const windowHeight = window.innerHeight;
      const scrollPosition = currentScrollY % (windowHeight * 1.5);
      
      const fadePoint = windowHeight * 0.75;
      let calculatedOpacity;
      
      if (scrollPosition < fadePoint) {
        calculatedOpacity = Math.min(1, scrollPosition / (fadePoint * 0.5));
      } else {
        calculatedOpacity = Math.max(0.4, 1 - ((scrollPosition - fadePoint) / (fadePoint * 0.5)));
      }
      
      setSectionOpacity(calculatedOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const finalOpacity = opacity * sectionOpacity;

  const svgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='15' x2='60' y2='15' stroke='${encodeURIComponent(color)}' stroke-width='1' opacity='${finalOpacity * 0.875}'/%3E%3Cline x1='0' y1='45' x2='60' y2='45' stroke='${encodeURIComponent(color)}' stroke-width='1' opacity='${finalOpacity * 0.875}'/%3E%3Cline x1='10' y1='0' x2='10' y2='10' stroke='${encodeURIComponent(color)}' stroke-width='1.5' opacity='${finalOpacity}'/%3E%3Cline x1='30' y1='5' x2='30' y2='15' stroke='${encodeURIComponent(color)}' stroke-width='1.5' opacity='${finalOpacity}'/%3E%3Cline x1='50' y1='0' x2='50' y2='10' stroke='${encodeURIComponent(color)}' stroke-width='1.5' opacity='${finalOpacity}'/%3E%3Cpath d='M20 25 L 25 30 M 25 25 L 20 30' stroke='${encodeURIComponent(color)}' stroke-width='1' opacity='${finalOpacity * 0.9375}'/%3E%3Cpath d='M40 25 L 45 30 M 45 25 L 40 30' stroke='${encodeURIComponent(color)}' stroke-width='1' opacity='${finalOpacity * 0.9375}'/%3E%3Cpath d='M0 55 L 5 50 L 10 55 L 15 50 L 20 55' stroke='${encodeURIComponent(color)}' stroke-width='1' fill='none' opacity='${finalOpacity * 0.875}'/%3E%3Ccircle cx='30' cy='30' r='1.5' fill='${encodeURIComponent(color)}' opacity='${finalOpacity}'/%3E%3Ccircle cx='15' cy='40' r='1.5' fill='${encodeURIComponent(color)}' opacity='${finalOpacity}'/%3E%3Ccircle cx='45' cy='40' r='1.5' fill='${encodeURIComponent(color)}' opacity='${finalOpacity}'/%3E%3C/svg%3E")`;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: svgPattern,
      backgroundSize: '60px 60px',
      pointerEvents: 'none',
      zIndex: 0,
      willChange: 'opacity',
      opacity: sectionOpacity,
      transition: 'opacity 0.3s ease-out',
      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0.8) 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0.8) 100%)'
    }} />
  );
};

// Lightbox Component
const Lightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.95)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }} onClick={onClose}>
      <button onClick={onClose} style={{
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        background: 'transparent',
        border: 'none',
        color: COLORS.sage,
        cursor: 'pointer',
        fontSize: '2rem'
      }}>
        <X size={32} />
      </button>
      <img src={image} alt="Gallery" style={{
        maxWidth: '90%',
        maxHeight: '90vh',
        objectFit: 'contain'
      }} />
    </div>
  );
};

// Contact Section Component
const ContactSection = () => (
  <section id="contact" style={{
    background: COLORS.sage,
    padding: '6rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <PatternBackground color={COLORS.darkRed} opacity={0.28} />
    
    {/* Gradient at the bottom */}
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '200px',
      background: `linear-gradient(to bottom, transparent, ${COLORS.darkRed})`,
      pointerEvents: 'none',
      zIndex: 0
    }} />
    
    <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
      <BookingForm />
    </div>
  </section>
);

// ============= MAIN APP =============
const MercelkTours = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet" />

      <div style={{ fontFamily: '"Montserrat", sans-serif', color: COLORS.brown, position: 'relative' }}>
        <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
        <MenuPanel isOpen={isMenuOpen} menuItems={MENU_ITEMS} socialItems={SOCIAL_ITEMS} />

        <HeroSection />
        <AboutSection PatternBackground={PatternBackground} />
        <ToursSection PatternBackground={PatternBackground} />
        <ExcursionsSection />
        <ServicesSection PatternBackground={PatternBackground} />
        <ContactSection />
        <Footer />

        <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      </div>
    </>
  );
};

export default MercelkTours;