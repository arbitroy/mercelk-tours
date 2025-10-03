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
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    minHeight: '600px'
  }}>
    <div style={{
      background: COLORS.darkRed,
      padding: '4rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h2 style={{
        fontSize: '3rem',
        color: COLORS.sage,
        fontFamily: '"Montserrat", sans-serif',
        marginBottom: '2rem',
        fontWeight: '300'
      }}>Contact & Booking</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Phone size={24} color={COLORS.sage} />
          <div>
            <p style={{ color: COLORS.sage, margin: 0, fontSize: '0.9rem', fontFamily: '"Montserrat", sans-serif', opacity: 0.8 }}>Phone</p>
            <a href="tel:+254748937141" style={{ color: COLORS.sage, fontSize: '1.2rem', fontFamily: '"Montserrat", sans-serif', textDecoration: 'none' }}>+254 748 937 141</a>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Mail size={24} color={COLORS.sage} />
          <div>
            <p style={{ color: COLORS.sage, margin: 0, fontSize: '0.9rem', fontFamily: '"Montserrat", sans-serif', opacity: 0.8 }}>Email</p>
            <a href="mailto:mercelktours@gmail.com" style={{ color: COLORS.sage, fontSize: '1.2rem', fontFamily: '"Montserrat", sans-serif', textDecoration: 'none' }}>mercelktours@gmail.com</a>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: COLORS.sage, marginBottom: '1rem', fontSize: '1.1rem', fontFamily: '"Montserrat", sans-serif' }}>Connect With Us</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="https://www.instagram.com/mercelktours/" target="_blank" rel="noopener noreferrer" style={{
              color: COLORS.sage,
              transition: 'transform 0.3s'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <Instagram size={28} />
            </a>
            <a href="https://wa.me/254748937141" target="_blank" rel="noopener noreferrer" style={{
              color: COLORS.sage,
              transition: 'transform 0.3s'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <MessageCircle size={28} />
            </a>
            <a href="https://community-si.com/en/public/profile/mercelk-tours" target="_blank" rel="noopener noreferrer" style={{
              color: COLORS.sage,
              transition: 'transform 0.3s'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <Globe size={28} />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div style={{
      background: COLORS.sage,
      padding: '4rem 3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
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