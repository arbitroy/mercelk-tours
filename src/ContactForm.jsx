import { COLORS } from './COLORS';

// Contact Form Component
export const ContactForm = () => (
    <form style={{
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    }}>
        <h3 style={{
            fontSize: '2rem',
            color: COLORS.darkRed,
            fontFamily: '"Montserrat", sans-serif',
            marginBottom: '1rem',
            fontWeight: '300'
        }}>Book Your Safari</h3>

        <input
            type="text"
            placeholder="Your Name"
            style={{
                padding: '1rem',
                fontSize: '1rem',
                border: `2px solid ${COLORS.brown}`,
                borderRadius: '8px',
                fontFamily: '"Montserrat", sans-serif',
                background: 'white'
            }} />

        <input
            type="email"
            placeholder="Email Address"
            style={{
                padding: '1rem',
                fontSize: '1rem',
                border: `2px solid ${COLORS.brown}`,
                borderRadius: '8px',
                fontFamily: '"Montserrat", sans-serif',
                background: 'white'
            }} />

        <input
            type="tel"
            placeholder="Phone Number"
            style={{
                padding: '1rem',
                fontSize: '1rem',
                border: `2px solid ${COLORS.brown}`,
                borderRadius: '8px',
                fontFamily: '"Montserrat", sans-serif',
                background: 'white'
            }} />

        <select style={{
            padding: '1rem',
            fontSize: '1rem',
            border: `2px solid ${COLORS.brown}`,
            borderRadius: '8px',
            fontFamily: '"Montserrat", sans-serif',
            background: 'white',
            color: COLORS.brown
        }}>
            <option>Select Tour Package</option>
            <option>Savannah Symphony (9 days)</option>
            <option>Peaks & Plains (7 days)</option>
            <option>Rift Valley Explorer (5 days)</option>
            <option>Kenya Classic (6 days)</option>
            <option>Ethereal Kenya (6 days - Air)</option>
        </select>

        <textarea
            placeholder="Special Requests or Questions"
            rows={4}
            style={{
                padding: '1rem',
                fontSize: '1rem',
                border: `2px solid ${COLORS.brown}`,
                borderRadius: '8px',
                fontFamily: '"Montserrat", sans-serif',
                background: 'white',
                resize: 'vertical'
            }} />

        <button type="submit" style={{
            background: COLORS.darkRed,
            color: COLORS.sage,
            border: 'none',
            padding: '1.2rem 2rem',
            fontSize: '1.1rem',
            cursor: 'pointer',
            borderRadius: '50px',
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: '400',
            transition: 'background 0.3s'
        }}
            onMouseEnter={(e) => e.target.style.background = '#6d0000'}
            onMouseLeave={(e) => e.target.style.background = COLORS.darkRed}>
            Submit Booking Request
        </button>
    </form>
);
