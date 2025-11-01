import { useState, useEffect, useRef } from 'react';
import { MapPin, Camera, Plane, Building2, Car, ArrowRight, Building, Hotel } from 'lucide-react';
import { COLORS } from './COLORS';
import { AfricanPatternCircle } from './AfricanPatternCircle';

// Services data
const SERVICES = [
    {
        id: 'safari',
        title: 'Safari',
        subtitle: 'Thrilling Wildlife Adventures',
        description: 'Embark on thrilling wildlife adventures across Kenya\'s iconic parks and reserves.',
        features: ['Expert Guides', '4x4 Land Cruiser', 'Custom Itinerary', 'Park Permits', 'Meet & Greet'],
        icon: Camera,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
        gridArea: 'safari',
        size: 'large'
    },
    {
        id: 'excursions',
        title: 'Excursions',
        subtitle: 'Curated Experiences',
        description: 'Hot air ballooning, Karen Blixen Museum, Giraffe Centre, and more.',
        icon: MapPin,
        image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
        gridArea: 'excursions',
        size: 'medium'
    },
    {
        id: 'day-tours',
        title: 'Day Tours',
        subtitle: 'Make Every Moment Count',
        description: 'Carefully designed for travelers who want to maximize their time.',
        icon: Plane,
        image: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=800',
        gridArea: 'day-tours',
        size: 'medium'
    },
    {
        id: 'city-tours',
        title: 'City Tours',
        subtitle: 'Urban Discovery',
        description: 'Guided explorations within the city, focusing on history and culture.',
        icon: Building2,
        image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800',
        gridArea: 'city-tours',
        size: 'small'
    },
    {
        id: 'transfers',
        title: 'Transfers',
        subtitle: 'Seamless Journeys',
        description: 'Reliable and comfortable transfers between airports, hotels, and destinations.',
        icon: Car,
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
        gridArea: 'transfers',
        size: 'small'
    },
    {
        id: 'booking',
        title: 'Hotel Booking',
        subtitle: 'Comfortable Stays',
        description: 'Find and book the best hotels for your stay in Kenya.',
        icon: Hotel,
        image: 'https://southamericatourism.com/wp-content/uploads/2019/05/Luxury-hotels-in-the-middle-of-nowhere_TierraAtacama1_1400x1000.jpg',
        gridArea: 'booking',
        size: 'small'
    }
];

const BentoCard = ({ service, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const Icon = service.icon;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), index * 100);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, [index]);

    return (
        <div
            ref={cardRef}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
                    : 'translateY(30px) scale(0.95)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                gridArea: service.gridArea,
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                border: `2px solid ${COLORS.darkRed}`,
                cursor: 'pointer',
                boxShadow: isHovered
                    ? '0 20px 60px rgba(139, 0, 0, 0.3)'
                    : '0 10px 30px rgba(139, 0, 0, 0.15)',
                minHeight: service.size === 'large' ? '500px' : service.size === 'medium' ? '350px' : '250px'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={service.image}
                alt={service.title}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.6s ease'
                }}
            />

            <div style={{
                position: 'absolute',
                inset: 0,
                background: isHovered
                    ? `linear-gradient(to top, ${COLORS.darkRed}ee, ${COLORS.darkRed}88)`
                    : `linear-gradient(to top, ${COLORS.darkRed}cc, transparent)`,
                transition: 'background 0.4s ease'
            }} />

            <div style={{
                position: 'relative',
                height: '100%',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: COLORS.sage
            }}>
                <div style={{
                    width: '56px',
                    height: '56px',
                    background: `${COLORS.sage}22`,
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    border: `1px solid ${COLORS.sage}33`,
                    transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                    transition: 'all 0.4s ease'
                }}>
                    <Icon size={28} color={COLORS.sage} />
                </div>

                <h3 style={{
                    fontSize: service.size === 'large' ? '2.5rem' : service.size === 'medium' ? '2rem' : '1.5rem',
                    fontWeight: '300',
                    marginBottom: '0.5rem',
                    fontFamily: '"Montserrat", sans-serif',
                    letterSpacing: '1px'
                }}>
                    {service.title}
                </h3>

                <p style={{
                    fontSize: '1.1rem',
                    opacity: 0.9,
                    marginBottom: '1rem',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '400'
                }}>
                    {service.subtitle}
                </p>

                <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    opacity: service.size === 'large' || isHovered ? 1 : 0,
                    maxHeight: service.size === 'large' || isHovered ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'all 0.4s ease',
                    fontFamily: '"Montserrat", sans-serif',
                    marginBottom: service.size === 'large' ? '1.5rem' : '0.5rem'
                }}>
                    {service.description}
                </p>

                {service.features && service.size === 'large' && (
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                        marginBottom: '1.5rem',
                        opacity: isHovered ? 1 : 0.8,
                        transition: 'opacity 0.3s'
                    }}>
                        {service.features.map((feature, idx) => (
                            <span key={idx} style={{
                                padding: '0.5rem 1rem',
                                background: `${COLORS.sage}22`,
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                border: `1px solid ${COLORS.sage}33`,
                                fontFamily: '"Montserrat", sans-serif'
                            }}>
                                {feature}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const ServicesSection = ({ PatternBackground }) => {
    return (
        <>
            <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                }

                .bento-grid {
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);
                  grid-template-rows: 350px 350px 250px;
                  grid-template-areas:
                    "safari safari excursions excursions"
                    "safari safari   day-tours booking"
                    "transfers city-tours day-tours booking";
                  gap: 1.3rem;
                  width: 100%;
                  max-width: 1400px;
                  margin: 0 auto;
                }

                @media (max-width: 1200px) {
                  .bento-grid {
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(3, 250px);
                    grid-template-areas:
                      "safari safari excursions"
                      "safari safari day-tours"
                      "city-tours transfers day-tours";
                  }
                }

                @media (max-width: 768px) {
                  .bento-grid {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto;
                    grid-template-areas:
                      "safari"
                      "excursions"
                      "day-tours"
                      "city-tours"
                      "booking"
                      "transfers";
                  }
                }
            `}</style>

            <section id="services" style={{
                background: COLORS.sage,
                padding: '6rem 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>

                 <AfricanPatternCircle
                  patternSrc="/pattern3_african.svg"
                  position="right"
                  size={500}
                  opacity={0.9}
                />
                {PatternBackground && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0
                    }}>
                        <PatternBackground color={COLORS.darkRed} opacity={0.2} />
                    </div>
                )}

                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '5%',
                    width: '300px',
                    height: '300px',
                    background: `${COLORS.darkRed}11`,
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    animation: 'float 6s ease-in-out infinite',
                    zIndex: 0
                }} />

                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '4rem'
                    }}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            color: COLORS.darkRed,
                            fontFamily: '"Montserrat", sans-serif',
                            fontWeight: '300',
                            marginBottom: '1rem',
                            letterSpacing: '2px'
                        }}>
                            Our Services
                        </h2>
                        <p style={{
                            fontSize: '1.2rem',
                            color: COLORS.brown,
                            fontFamily: '"Montserrat", sans-serif',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.8',
                            opacity: 0.9
                        }}>
                            From thrilling safaris to seamless transfers, we handle every detail
                            of your Kenyan adventure with expertise and care.
                        </p>
                    </div>

                    <div className="bento-grid">
                        {SERVICES.map((service, index) => (
                            <BentoCard key={service.id} service={service} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};