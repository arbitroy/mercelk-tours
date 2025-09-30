import { COLORS } from './COLORS';

// Menu Panel Component
export const MenuPanel = ({ isOpen, menuItems, socialItems }) => (
    <aside style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-100%',
        width: 'min(420px, 100vw)',
        height: '100vh',
        background: COLORS.sage,
        zIndex: 999,
        padding: '6rem 2rem 2rem',
        overflowY: 'auto',
        transition: 'right 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column'
    }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: 1 }}>
            {menuItems.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '1rem' }}>
                    <a href={item.link} style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: '3rem',
                        fontWeight: '300',
                        color: '#000',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        display: 'inline-block',
                        transition: 'color 0.3s',
                        position: 'relative'
                    }}
                        onMouseEnter={(e) => e.target.style.color = COLORS.darkRed}
                        onMouseLeave={(e) => e.target.style.color = '#000'}>
                        {item.label}
                        <span style={{
                            position: 'absolute',
                            top: '0.3em',
                            right: '-1.5em',
                            fontSize: '0.4em',
                            color: COLORS.darkRed,
                            fontWeight: '400'
                        }}>0{idx + 1}</span>
                    </a>
                </li>
            ))}
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <h3 style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '1rem',
                color: COLORS.darkRed,
                marginBottom: '1rem',
                fontWeight: '400'
            }}>Socials</h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {socialItems.map((item, idx) => (
                    <a key={idx} href={item.link} style={{
                        fontSize: '1.1rem',
                        color: '#000',
                        textDecoration: 'none',
                        fontFamily: '"Montserrat", sans-serif',
                        transition: 'color 0.3s'
                    }}
                        onMouseEnter={(e) => e.target.style.color = COLORS.darkRed}
                        onMouseLeave={(e) => e.target.style.color = '#000'}>
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    </aside>
);
