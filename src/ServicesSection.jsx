import { useState, useEffect, useRef } from 'react';
import { MapPin, Camera, Plane, Building2, Car, ArrowRight } from 'lucide-react';
import { COLORS } from './COLORS';

// Services data with bento grid positioning
const SERVICES = [
    {
        id: 'safari',
        title: 'Safari',
        subtitle: 'Thrilling Wildlife Adventures',
        description: 'Embark on thrilling wildlife adventures across Kenya\'s iconic parks and reserves, where breathtaking landscapes and unforgettable encounters with nature await. Customized to fit your needs and specifications.',
        features: ['Expert Guides', '4x4 Land Cruiser', 'Custom Itinerary', 'Park Permits'],
        icon: Camera,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
        gridArea: 'safari',
        size: 'large'
    },
    {
        id: 'excursions',
        title: 'Excursions',
        subtitle: 'Curated Experiences',
        description: 'A wide range of activities including hot air ballooning in Maasai Mara & Amboseli, Karen Blixen Museum, Giraffe Centre, Nairobi Museums, David Sheldrick Wildlife Trust, and dining experiences.',
        icon: MapPin,
        image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
        gridArea: 'excursions',
        size: 'medium'
    },
    {
        id: 'day-tours',
        title: 'Day Tours',
        subtitle: 'Make Every Moment Count',
        description: 'Carefully designed for travelers who want to maximize their time with guided explorations and memorable experiences.',
        icon: Plane,
        image: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=800',
        gridArea: 'day-tours',
        size: 'medium'
    },
    {
        id: 'city-tours',
        title: 'City Tours',
        subtitle: 'Urban Discovery',
        description: 'Guided explorations within the city, focusing on history, culture, lifestyle, and landmarks. Discover Nairobi\'s hidden gems.',
        icon: Building2,
        image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800',
        gridArea: 'city-tours',
        size: 'small'
    },
    {
        id: 'transfers',
        title: 'Transfers',
        subtitle: 'Seamless Journeys',
        description: 'Reliable and comfortable transfers between airports, hotels, and destinations. Pick-up/drop-off and domestic flight arrangements available.',
        icon: Car,
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
        gridArea: 'transfers',
        size: 'small'
    }
];

// Bento Card Component with animations
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

    const cardStyle = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible
            ? isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
            : 'translateY(30px) scale(0.95)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: isVisible ? '0s' : `${index * 0.1}s`
    };

    const overlayStyle = {
        background: isHovered
            ? `linear-gradient(to top, ${COLORS.darkRed}ee, ${COLORS.darkRed}88)`
            : `linear-gradient(to top, ${COLORS.darkRed}cc, transparent)`,
        transition: 'background 0.4s ease'
    };

    return (
        <div
            ref={cardRef}
            className={`bento-card-${service.id}`}
            style={{
                ...cardStyle,
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
            {/* Background Image */}
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

            {/* Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                ...overlayStyle
            }} />

            {/* Content */}
            <div style={{
                position: 'relative',
                height: '100%',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: COLORS.sage
            }}>
                {/* Icon */}
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

                {/* Title */}
                <h3 style={{
                    fontSize: service.size === 'large' ? '2.5rem' : service.size === 'medium' ? '2rem' : '1.5rem',
                    fontWeight: '300',
                    marginBottom: '0.5rem',
                    fontFamily: '"Montserrat", sans-serif',
                    letterSpacing: '1px'
                }}>
                    {service.title}
                </h3>

                {/* Subtitle */}
                <p style={{
                    fontSize: '1.1rem',
                    opacity: 0.9,
                    marginBottom: '1rem',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '400'
                }}>
                    {service.subtitle}
                </p>

                {/* Description - only show on hover for medium/small cards, always show for large */}
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

                {/* Features - only for large cards */}
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

                {/* CTA Button - shows on hover */}
                <button style={{
                    alignSelf: 'flex-start',
                    padding: '0.875rem 2rem',
                    background: isHovered ? COLORS.sage : 'transparent',
                    color: isHovered ? COLORS.darkRed : COLORS.sage,
                    border: `2px solid ${COLORS.sage}`,
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '400',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.4s ease'
                }}
                    onClick={() => window.location.href = '#contact'}
                >
                    Learn More
                    <ArrowRight size={18} style={{
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'transform 0.3s'
                    }} />
                </button>
            </div>
        </div>
    );
};

// Main Services Section
export const ServicesSection = () => {
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
            "safari safari day-tours day-tours"
            "city-tours transfers day-tours day-tours";
          gap: 1.5rem;
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
              "transfers";
          }
        }
      `}</style>

            <section id="services" style={{
                background: `linear-gradient(to bottom, ${COLORS.sage}, #fff)`,
                padding: '6rem 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '5%',
                    width: '300px',
                    height: '300px',
                    background: `${COLORS.darkRed}11`,
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    animation: 'float 6s ease-in-out infinite'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '250px',
                    height: '250px',
                    background: `${COLORS.sage}33`,
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 8s ease-in-out infinite'
                }} />

                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    {/* Section Header */}
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

                    {/* Bento Grid */}
                    <div className="bento-grid">
                        {SERVICES.map((service, index) => (
                            <BentoCard key={service.id} service={service} index={index} />
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div style={{
                        marginTop: '4rem',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: '1.1rem',
                            color: COLORS.brown,
                            fontFamily: '"Montserrat", sans-serif',
                            marginBottom: '2rem'
                        }}>
                            Ready to start your adventure?
                        </p>
                        <a
                            href="#contact"
                            style={{
                                display: 'inline-block',
                                padding: '1.2rem 3rem',
                                background: COLORS.darkRed,
                                color: COLORS.sage,
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontSize: '1.1rem',
                                fontFamily: '"Montserrat", sans-serif',
                                fontWeight: '400',
                                transition: 'all 0.3s',
                                boxShadow: '0 10px 30px rgba(139, 0, 0, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 15px 40px rgba(139, 0, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 10px 30px rgba(139, 0, 0, 0.3)';
                            }}
                        >
                            Contact Us Today
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};