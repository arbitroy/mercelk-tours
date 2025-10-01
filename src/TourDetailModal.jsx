import { X, MapPin, Calendar, Plane, Car } from 'lucide-react';
import { COLORS } from './COLORS';
import { useState, useEffect, useRef } from 'react';

export const TourDetailModal = ({ tour, onClose }) => {
    const [visibleDays, setVisibleDays] = useState(new Set());
    const timelineRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const dayIndex = parseInt(entry.target.dataset.day);
                        setVisibleDays(prev => new Set([...prev, dayIndex]));
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );

        const dayElements = timelineRef.current?.querySelectorAll('[data-day]');
        dayElements?.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [tour]);

    if (!tour) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.85)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                animation: 'fadeIn 0.3s ease-out',
                backdropFilter: 'blur(5px)'
            }}
            onClick={onClose}
        >
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes drawLine {
          from { height: 0; }
          to { height: 100%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

            <div
                style={{
                    background: COLORS.sage,
                    maxWidth: '900px',
                    width: '100%',
                    maxHeight: '90vh',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'slideUp 0.4s ease-out',
                    boxShadow: '0 20px 60px rgba(139,0,0,0.3)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    position: 'relative',
                    height: '250px',
                    overflow: 'hidden'
                }}>
                    <img
                        src={tour.image}
                        alt={tour.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(139,0,0,0.8))',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '2rem'
                    }}>
                        <h2 style={{
                            color: COLORS.sage,
                            fontSize: '2.5rem',
                            margin: 0,
                            fontFamily: '"Montserrat", sans-serif',
                            fontWeight: '300'
                        }}>{tour.name}</h2>
                        <p style={{
                            color: COLORS.sage,
                            fontSize: '1.2rem',
                            margin: '0.5rem 0 0 0',
                            fontFamily: '"Montserrat", sans-serif',
                            opacity: 0.9
                        }}>{tour.subtitle}</p>
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            background: 'rgba(139,0,0,0.9)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '45px',
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: COLORS.sage,
                            transition: 'all 0.3s',
                            backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.1) rotate(90deg)';
                            e.target.style.background = COLORS.darkRed;
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1) rotate(0deg)';
                            e.target.style.background = 'rgba(139,0,0,0.9)';
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '2.5rem',
                    background: COLORS.sage
                }}>
                    {/* Tour Info */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem',
                        padding: '1.5rem',
                        background: 'white',
                        borderRadius: '8px',
                        border: `2px solid ${COLORS.darkRed}`
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Calendar size={20} color={COLORS.darkRed} />
                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: COLORS.brown, opacity: 0.7, fontFamily: '"Montserrat", sans-serif' }}>Duration</p>
                                <p style={{ margin: 0, fontSize: '1rem', color: COLORS.brown, fontWeight: '600', fontFamily: '"Montserrat", sans-serif' }}>{tour.days}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {tour.type?.includes('air') ? <Plane size={20} color={COLORS.darkRed} /> : <Car size={20} color={COLORS.darkRed} />}
                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: COLORS.brown, opacity: 0.7, fontFamily: '"Montserrat", sans-serif' }}>Type</p>
                                <p style={{ margin: 0, fontSize: '1rem', color: COLORS.brown, fontWeight: '600', fontFamily: '"Montserrat", sans-serif' }}>{tour.type}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <MapPin size={20} color={COLORS.darkRed} />
                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: COLORS.brown, opacity: 0.7, fontFamily: '"Montserrat", sans-serif' }}>Route</p>
                                <p style={{ margin: 0, fontSize: '1rem', color: COLORS.brown, fontWeight: '600', fontFamily: '"Montserrat", sans-serif' }}>{tour.starts} → {tour.ends}</p>
                            </div>
                        </div>
                    </div>

                    {/* Journey Timeline */}
                    <div ref={timelineRef}>
                        <h3 style={{
                            fontSize: '2rem',
                            color: COLORS.darkRed,
                            marginBottom: '2rem',
                            fontFamily: '"Montserrat", sans-serif',
                            fontWeight: '300'
                        }}>Your Journey</h3>

                        <div style={{ position: 'relative', paddingLeft: '3rem' }}>
                            {/* Vertical Line */}
                            <div style={{
                                position: 'absolute',
                                left: '1.125rem',
                                top: '1.75rem',
                                height: `calc(100% - ${tour.detailedItinerary?.length > 0 ? '6rem' : '3.5rem'})`,
                                width: '3px',
                                background: `linear-gradient(to bottom, ${COLORS.darkRed}, #D2691E)`,
                                animation: 'drawLine 1s ease-out'
                            }} />

                            {tour.detailedItinerary?.map((day, index) => (
                                <div
                                    key={index}
                                    data-day={index}
                                    style={{
                                        position: 'relative',
                                        marginBottom: index === tour.detailedItinerary.length - 1 ? 0 : '2.5rem',
                                        opacity: visibleDays.has(index) ? 1 : 0,
                                        transform: visibleDays.has(index) ? 'translateX(0)' : 'translateX(-20px)',
                                        transition: `all 0.6s ease-out ${index * 0.1}s`
                                    }}
                                >
                                    {/* Day Circle */}
                                    <div style={{
                                        position: 'absolute',
                                        left: '-3.125rem',
                                        top: '0.5rem',
                                        width: '2.5rem',
                                        height: '2.5rem',
                                        borderRadius: '50%',
                                        background: visibleDays.has(index) ? COLORS.darkRed : '#ccc',
                                        border: `3px solid ${COLORS.sage}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontFamily: '"Montserrat", sans-serif',
                                        fontWeight: '600',
                                        color: COLORS.sage,
                                        fontSize: '0.9rem',
                                        transition: 'all 0.4s ease-out',
                                        animation: visibleDays.has(index) ? 'pulse 2s ease-in-out infinite' : 'none',
                                        boxShadow: visibleDays.has(index) ? '0 4px 15px rgba(139,0,0,0.4)' : 'none'
                                    }}>
                                        {day.day}
                                    </div>

                                    {/* Day Content */}
                                    <div style={{
                                        background: 'white',
                                        padding: '1.5rem',
                                        borderRadius: '8px',
                                        border: `2px solid ${visibleDays.has(index) ? COLORS.darkRed : '#ddd'}`,
                                        transition: 'border-color 0.4s ease-out',
                                        boxShadow: visibleDays.has(index) ? '0 4px 12px rgba(139,0,0,0.1)' : 'none'
                                    }}>
                                        <h4 style={{
                                            margin: '0 0 0.5rem 0',
                                            color: COLORS.darkRed,
                                            fontSize: '1.3rem',
                                            fontFamily: '"Montserrat", sans-serif',
                                            fontWeight: '400'
                                        }}>
                                            Day {day.day}: {day.location}
                                        </h4>
                                        <p style={{
                                            margin: 0,
                                            color: COLORS.brown,
                                            lineHeight: '1.6',
                                            fontFamily: '"Montserrat", sans-serif'
                                        }}>
                                            {day.activities}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking CTA */}
                    <div style={{
                        marginTop: '3rem',
                        padding: '2rem',
                        background: COLORS.darkRed,
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{
                            color: COLORS.sage,
                            fontSize: '1.5rem',
                            marginBottom: '1rem',
                            fontFamily: '"Montserrat", sans-serif',
                            fontWeight: '300'
                        }}>Ready for Your Adventure?</h3>
                        <p style={{
                            color: COLORS.sage,
                            marginBottom: '1.5rem',
                            fontFamily: '"Montserrat", sans-serif',
                            opacity: 0.9
                        }}>Contact us to customize this tour or get a personalized quote</p>
                        <a
                            href="#contact"
                            onClick={onClose}
                            style={{
                                display: 'inline-block',
                                background: COLORS.sage,
                                color: COLORS.darkRed,
                                padding: '1rem 3rem',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontFamily: '"Montserrat", sans-serif',
                                fontWeight: '600',
                                fontSize: '1.1rem',
                                transition: 'all 0.3s',
                                border: `2px solid ${COLORS.sage}`
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = COLORS.sage;
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = COLORS.sage;
                                e.target.style.color = COLORS.darkRed;
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            Book This Tour
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};