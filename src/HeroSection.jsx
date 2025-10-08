import { COLORS, MASONRY_IMAGES } from './COLORS';

// Hero Section Component
export const HeroSection = ({ PatternBackground }) => (
    <section id="hero" style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: COLORS.darkRed
    }}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '1rem',
            padding: '1rem',
            animation: 'scroll 40s linear infinite'
        }}>
            {[...MASONRY_IMAGES, ...MASONRY_IMAGES, ...MASONRY_IMAGES].map((img, idx) => (
                <div key={idx} style={{
                    gridRow: `span ${Math.floor(Math.random() * 2) + 1}`,
                    overflow: 'hidden',
                    borderRadius: '8px'
                }}>
                    <img src={img} alt="" style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(20%) brightness(0.8)'
                    }} />
                </div>
            ))}
        </div>

        {PatternBackground && (
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 5,
                pointerEvents: 'none'
            }}>
                <PatternBackground color={COLORS.sage} opacity={0.15} />
            </div>
        )}

        <div style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            background: 'rgba(0,0,0,0.5)',
            padding: '3rem 2rem',
            backdropFilter: 'blur(10px)'
        }}>
            <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: '300',
                color: COLORS.darkRed,
                fontFamily: '"Montserrat", sans-serif',
                margin: '0 0 1rem 0',
                letterSpacing: '5px',
                textTransform: 'uppercase'
            }}>
                EXPLORE KENYA'S WILD BEAUTY
            </h1>
            <a href="#contact" style={{
                color: COLORS.sage,
                fontSize: '1.5rem',
                textDecoration: 'none',
                borderBottom: `2px solid ${COLORS.sage}`,
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '300',
                paddingBottom: '4px',
                display: 'inline-block',
                transition: 'color 0.3s, border-color 0.3s'
            }}
                onMouseEnter={(e) => {
                    e.target.style.color = COLORS.darkRed;
                    e.target.style.borderColor = COLORS.darkRed;
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = COLORS.sage;
                    e.target.style.borderColor = COLORS.sage;
                }}>
                Book Now
            </a>
        </div>

        <style>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
    </section>
);