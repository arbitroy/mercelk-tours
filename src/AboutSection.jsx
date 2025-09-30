import { COLORS, CORE_VALUES } from './COLORS';

// About Section Component
export const AboutSection = () => (
    <section id="about" style={{
        background: COLORS.sage,
        padding: '6rem 2rem',
        position: 'relative'
    }}>
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
        }}>
            <div style={{
                position: 'relative',
                height: '500px',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800" alt="Safari" style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }} />
            </div>

            <div>
                <h2 style={{
                    fontSize: '3rem',
                    color: COLORS.darkRed,
                    fontFamily: '"Montserrat", sans-serif',
                    marginBottom: '1.5rem',
                    fontWeight: '300'
                }}>About Mercelk Tours</h2>
                <p style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: COLORS.brown,
                    fontFamily: '"Montserrat", sans-serif',
                    marginBottom: '2rem'
                }}>
                    To create unforgettable travel experiences that connect people with Kenya's rich wildlife, culture, and landscapes while promoting sustainable and responsible tourism.
                </p>

                <div style={{
                    display: 'grid',
                    gap: '1.5rem',
                    marginTop: '3rem'
                }}>
                    {CORE_VALUES.map((value, idx) => (
                        <div key={idx} style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            border: `2px solid ${value.color}`,
                            transform: `translateX(${idx * 10}px)`,
                            boxShadow: '0 4px 15px rgba(139,0,0,0.1)',
                            transition: 'transform 0.3s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = `translateX(${idx * 10}px) translateY(-5px)`}
                            onMouseLeave={(e) => e.currentTarget.style.transform = `translateX(${idx * 10}px)`}>
                            <h3 style={{
                                color: value.color,
                                marginBottom: '0.5rem',
                                fontSize: '1.3rem',
                                fontFamily: '"Montserrat", sans-serif',
                                fontWeight: '400'
                            }}>{value.title}</h3>
                            <p style={{
                                color: COLORS.brown,
                                margin: 0,
                                fontFamily: '"Montserrat", sans-serif'
                            }}>{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);
