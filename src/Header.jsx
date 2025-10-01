import { COLORS } from './COLORS';

// ============= COMPONENTS =============
// Header Component
export const Header = ({ onMenuToggle, isMenuOpen }) => (
    <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem',
        background: 'transparent',
        zIndex: 1000,
        pointerEvents: 'none'
    }}>
        <div style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        }}>
            <img
                src="/mercelk_logo.png"
                alt="Logo"
                width={90}
                height={90}
            />
            <h1 style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '1.7rem',
                fontWeight: '700',
                color: COLORS.darkRed,
                margin: 0,
                letterSpacing: '3px',
                lineHeight: 1.1,
            }}>MERCELK TOURS</h1>
        </div>

        <button
            onClick={onMenuToggle}
            style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: COLORS.darkRed,
                fontWeight: '700',
                fontSize: '1rem',
                fontFamily: '"Montserrat", sans-serif',
                transition: 'color 0.3s'
            }}
        >
            <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
            <div style={{
                width: '14px',
                height: '14px',
                position: 'relative',
                transform: isMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s'
            }}>
                <span style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '100%',
                    height: '2px',
                    background: 'currentColor',
                    transform: 'translate(-50%, -50%)'
                }} />
                <span style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '100%',
                    height: '2px',
                    background: 'currentColor',
                    transform: 'translate(-50%, -50%) rotate(90deg)'
                }} />
            </div>
        </button>
    </header>
);
