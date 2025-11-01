import { useState } from 'react';
import { AIR_TOURS, COLORS, ROAD_TOURS } from './COLORS';
import { TourCard } from './TourCard';
import { TourDetailModal } from './TourDetailModal';
import { AfricanPatternCircle } from './AfricanPatternCircle';

// Tours Section Component
export const ToursSection = ({ PatternBackground }) => {
    const [activeTab, setActiveTab] = useState('road');
    const [selectedTour, setSelectedTour] = useState(null);

    return (
        <>
            <section id="tours" style={{
                background: `linear-gradient(to bottom, ${COLORS.sage}, #fff)`,
                padding: '6rem 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <AfricanPatternCircle
                    patternSrc="/pattern1_african.svg"
                    position="left"
                    size={500}
                    opacity={0.9}
                />
                {PatternBackground && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0
                    }}>
                        <PatternBackground color={COLORS.darkRed} opacity={0.22} />
                    </div>
                )}

                <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontSize: '3.5rem',
                        color: COLORS.darkRed,
                        textAlign: 'center',
                        fontFamily: '"Montserrat", sans-serif',
                        marginBottom: '3rem',
                        fontWeight: '300'
                    }}>Featured Safari Packages</h2>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        marginBottom: '3rem'
                    }}>
                        {['road', 'air'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} style={{
                                background: activeTab === tab ? COLORS.darkRed : 'transparent',
                                color: activeTab === tab ? COLORS.sage : COLORS.darkRed,
                                border: `2px solid ${COLORS.darkRed}`,
                                padding: '1rem 3rem',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                borderRadius: '50px',
                                transition: 'all 0.3s',
                                fontFamily: '"Montserrat", sans-serif',
                                fontWeight: '400'
                            }}>
                                {tab === 'road' ? 'Road Safaris' : 'Air Safaris'}
                            </button>
                        ))}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}>
                        {(activeTab === 'road' ? ROAD_TOURS : AIR_TOURS).map((tour, idx) => (
                            <TourCard key={idx} tour={tour} onViewDetails={() => setSelectedTour(tour)} />
                        ))}
                    </div>
                </div>
            </section>

            {selectedTour && (
                <TourDetailModal
                    tour={selectedTour}
                    onClose={() => setSelectedTour(null)}
                />
            )}
        </>
    );
};