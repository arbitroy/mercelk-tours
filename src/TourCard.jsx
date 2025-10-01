import { COLORS } from './COLORS';

// Tour Card Component
export const TourCard = ({ tour, onViewDetails }) => (
    <div style={{
        position: 'relative',
        height: '500px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: `3px solid ${COLORS.darkRed}`,
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s'
    }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(139,0,0,0.3)';
            e.currentTarget.querySelector('.overlay').style.background = 'rgba(139,0,0,0.85)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.querySelector('.overlay').style.background = 'rgba(0,0,0,0.5)';
        }}>
        <img src={tour.image} alt={tour.name} style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }} />
        <div className="overlay" style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '2rem',
            transition: 'background 0.3s'
        }}>
            <h3 style={{
                color: COLORS.sage,
                fontSize: '2rem',
                marginBottom: '0.5rem',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '400'
            }}>{tour.name}</h3>
            <p style={{
                color: COLORS.sage,
                fontSize: '1.1rem',
                marginBottom: '1rem',
                fontFamily: '"Montserrat", sans-serif',
                opacity: 0.9
            }}>{tour.subtitle}</p>
            <p style={{
                color: COLORS.sage,
                fontSize: '1rem',
                marginBottom: '0.5rem',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '400'
            }}>{tour.days}</p>
            <p style={{
                color: COLORS.sage,
                fontSize: '0.9rem',
                opacity: 0.8,
                fontFamily: '"Montserrat", sans-serif',
                marginBottom: '1rem'
            }}>{tour.itinerary}</p>
            <button 
                onClick={onViewDetails}
                style={{
                    background: COLORS.sage,
                    color: COLORS.darkRed,
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '400',
                    alignSelf: 'flex-start',
                    transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 4px 15px rgba(205,202,150,0.4)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                }}
            >
                View Details
            </button>
        </div>
    </div>
);