import { COLORS } from './COLORS';
import { Globe, Instagram, Mail, MessageCircle, Phone, X } from 'lucide-react';

// Footer Component
export const Footer = () => (
    <footer style={{
        background:  COLORS.darkRed,
        padding: '3rem 2rem',
        color: COLORS.sage
    }}>
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
        }}>
            <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: '"Montserrat", sans-serif', fontWeight: '300' }}>Mercelk Tours</h3>
                <p style={{ opacity: 0.8, fontSize: '0.95rem', fontFamily: '"Montserrat", sans-serif' }}>Creating unforgettable Kenya safari experiences</p>
            </div>

            <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: '"Montserrat", sans-serif' }}>Contact</h4>
                <p style={{ opacity: 0.8, margin: '0.5rem 0', fontSize: '0.9rem', fontFamily: '"Montserrat", sans-serif' }}>+254 748 937 141</p>
                <p style={{ opacity: 0.8, margin: '0.5rem 0', fontSize: '0.9rem', fontFamily: '"Montserrat", sans-serif' }}>mercelktours@gmail.com</p>
            </div>

            <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: '"Montserrat", sans-serif' }}>Follow Us</h4>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <a href="https://www.instagram.com/mercelktours/" target="_blank" rel="noopener noreferrer" style={{
                        color: COLORS.sage,
                        transition: 'opacity 0.3s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                        <Instagram size={24} />
                    </a>
                    <a href="https://wa.me/254748937141" target="_blank" rel="noopener noreferrer" style={{
                        color: COLORS.sage,
                        transition: 'opacity 0.3s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                        <MessageCircle size={24} />
                    </a>
                    <a href="https://community-si.com/en/public/profile/mercelk-tours" target="_blank" rel="noopener noreferrer" style={{
                        color: COLORS.sage,
                        transition: 'opacity 0.3s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                        <Globe size={24} />
                    </a>
                </div>
            </div>
        </div>

        <div style={{
            textAlign: 'center',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: `1px solid rgba(205,202,150,0.2)`
        }}>
            <p style={{ opacity: 0.7, fontSize: '0.9rem', fontFamily: '"Montserrat", sans-serif', margin: 0 }}>
                © {new Date().getFullYear()} Mercelk Tours. All rights reserved.
            </p>
        </div>
    </footer>
);