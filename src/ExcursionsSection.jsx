import { COLORS, EXCURSIONS } from './COLORS';

// Excursions Section Component
export const ExcursionsSection = () => (
    <section style={{
        background: COLORS.darkRed,
        padding: '4rem 2rem',
        overflow: 'hidden'
    }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
                fontSize: '2.5rem',
                color: COLORS.sage,
                fontFamily: '"Montserrat", sans-serif',
                marginBottom: '2rem',
                fontWeight: '300'
            }}>Special Excursions</h2>

            <div style={{
                display: 'flex',
                gap: '1.5rem',
                overflowX: 'auto',
                paddingBottom: '1rem'
            }}>
                {EXCURSIONS.map((exc, idx) => (
                    <div key={idx} style={{
                        minWidth: '300px',
                        height: '200px',
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: `2px solid ${COLORS.sage}`
                    }}>
                        <img src={exc.image} alt={exc.name} style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }} />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '1.5rem'
                        }}>
                            <h3 style={{
                                color: COLORS.sage,
                                fontSize: '1.3rem',
                                fontFamily: '"Montserrat", sans-serif',
                                marginBottom: '0.3rem'
                            }}>{exc.name}</h3>
                            <p style={{
                                color: COLORS.sage,
                                fontSize: '0.9rem',
                                fontFamily: '"Montserrat", sans-serif',
                                opacity: 0.8,
                                margin: 0
                            }}>{exc.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
