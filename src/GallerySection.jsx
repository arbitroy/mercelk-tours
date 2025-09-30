import { COLORS, GALLERY_IMAGES } from './COLORS';

// Gallery Section Component
export const GallerySection = ({ onImageClick }) => (
    <section id="gallery" style={{
        background: COLORS.sage,
        padding: '6rem 2rem'
    }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
                fontSize: '3.5rem',
                color: COLORS.darkRed,
                textAlign: 'center',
                fontFamily: '"Montserrat", sans-serif',
                marginBottom: '3rem',
                fontWeight: '300'
            }}>Gallery</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem'
            }}>
                {GALLERY_IMAGES.slice(0, 12).map((img, idx) => (
                    <div key={idx}
                        onClick={() => onImageClick(img)}
                        style={{
                            height: '250px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'transform 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <img src={img} alt="" style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }} />
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button style={{
                    background: 'transparent',
                    color: COLORS.darkRed,
                    border: `2px solid ${COLORS.darkRed}`,
                    padding: '1rem 3rem',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    borderRadius: '50px',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '400',
                    transition: 'all 0.3s'
                }}
                    onMouseEnter={(e) => {
                        e.target.style.background = COLORS.darkRed;
                        e.target.style.color = COLORS.sage;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = COLORS.darkRed;
                    }}>
                    View More
                </button>
            </div>
        </div>
    </section>
);
