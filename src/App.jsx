import { Globe, Instagram, Mail, MessageCircle, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { AboutSection } from './AboutSection';
import { COLORS, MENU_ITEMS, SOCIAL_ITEMS } from './COLORS';
import { BookingForm } from './BookingForm'; // Changed from ContactForm
import { ExcursionsSection } from './ExcursionsSection';
import { GallerySection } from './GallerySection';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { MenuPanel } from './MenuPanel';
import { ToursSection } from './ToursSection';
import { Footer } from './Footer';
import { ServicesSection } from './ServicesSection';

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
    minHeight: '100vh'
  }}>
    <BookingForm />
  </section>
);

// ============= MAIN APP =============
const MercelkTours = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet" />

      <div style={{ fontFamily: '"Montserrat", sans-serif', color: COLORS.brown }}>
        <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
        <MenuPanel isOpen={isMenuOpen} menuItems={MENU_ITEMS} socialItems={SOCIAL_ITEMS} />

        <HeroSection />
        <AboutSection />
        <ToursSection />
        <ExcursionsSection />
        <ServicesSection />
        <ContactSection />
        <Footer />

        <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      </div>
    </>
  );
};

export default MercelkTours;