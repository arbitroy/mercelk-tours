import { useState, useEffect, useRef } from 'react';
import { Check, Plus, Minus, Sparkles } from 'lucide-react';
import { COLORS } from './COLORS';
import { ROAD_TOURS, AIR_TOURS } from './COLORS';

// Tour options
const TOUR_OPTIONS = {
    'By Road': ROAD_TOURS.map(tour => ({
        value: tour.name.toLowerCase().replace(/\s+/g, '-'),
        label: `${tour.name} (${tour.days})`
    })).concat([{ value: 'customized-road', label: 'Customized Tour' }]),
    'By Air': AIR_TOURS.map(tour => ({
        value: tour.name.toLowerCase().replace(/\s+/g, '-'),
        label: `${tour.name} (${tour.days})`
    })).concat([{ value: 'customized-air', label: 'Customized Tour' }])
};

const DURATION_SUGGESTIONS = [
    { days: 3, label: '3 Days' },
    { days: 5, label: '5 Days' },
    { days: 6, label: '6 Days' },
    { days: 7, label: '7 Days' },
    { days: 9, label: '9 Days' }
];

// Calculate progress
const calculateProgress = (formData) => {
    const fields = [
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phoneNumber,
        formData.safariType,
        formData.tourPlan,
        formData.startDate,
        formData.endDate
    ];
    const filledFields = fields.filter(field => field && field.length > 0).length;
    return Math.round((filledFields / fields.length) * 100);
};

// Counter Component
// Counter Component - IMPROVED VERSION
const Counter = ({ value, onChange, label, min = 0, max = 20 }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{
            fontSize: '0.9rem',
            color: COLORS.brown,
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: '600',
            opacity: 0.9
        }}>{label}</label>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1.25rem 1.5rem',
            border: '2px solid rgba(139,0,0,0.15)',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,248,240,0.98) 100%)',
            transition: 'all 0.3s',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
        }}>
            <button
                type="button"
                onClick={() => onChange(Math.max(min, value - 1))}
                disabled={value <= min}
                style={{
                    background: value <= min 
                        ? 'linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%)' 
                        : 'linear-gradient(135deg, #D4AF37 0%, #C9A961 100%)',
                    color: value <= min ? '#999' : 'white',
                    border: 'none',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    cursor: value <= min ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    opacity: value <= min ? 0.6 : 1,
                    boxShadow: value <= min ? 'none' : '0 4px 12px rgba(212, 175, 55, 0.3)',
                    transform: value <= min ? 'scale(0.95)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                    if (value > min) {
                        e.target.style.transform = 'scale(1.08)';
                        e.target.style.boxShadow = '0 6px 16px rgba(212, 175, 55, 0.4)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (value > min) {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)';
                    }
                }}
            >
                <Minus size={20} strokeWidth={2.5} />
            </button>
            
            <span style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: COLORS.darkRed,
                minWidth: '3.5rem',
                textAlign: 'center',
                fontFamily: '"Montserrat", sans-serif',
                letterSpacing: '-0.5px'
            }}>
                {value}
            </span>
            
            <button
                type="button"
                onClick={() => onChange(Math.min(max, value + 1))}
                disabled={value >= max}
                style={{
                    background: value >= max 
                        ? 'linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%)' 
                        : 'linear-gradient(135deg, #D4AF37 0%, #C9A961 100%)',
                    color: value >= max ? '#999' : 'white',
                    border: 'none',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    cursor: value >= max ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    opacity: value >= max ? 0.6 : 1,
                    boxShadow: value >= max ? 'none' : '0 4px 12px rgba(212, 175, 55, 0.3)',
                    transform: value >= max ? 'scale(0.95)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                    if (value < max) {
                        e.target.style.transform = 'scale(1.08)';
                        e.target.style.boxShadow = '0 6px 16px rgba(212, 175, 55, 0.4)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (value < max) {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)';
                    }
                }}
            >
                <Plus size={20} strokeWidth={2.5} />
            </button>
        </div>
    </div>
);

// Booking Form Component
export const BookingForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [progress, setProgress] = useState(0);
    const [showFixedButton, setShowFixedButton] = useState(false);
    const formRef = useRef(null);
    const submitButtonRef = useRef(null);

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneCode: '+254',
        phoneNumber: '',
        safariType: '',
        tourPlan: '',
        startDate: '',
        endDate: '',
        duration: '',
        adults: 1,
        kids: 0,
        message: ''
    });

    // Scroll animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (formRef.current) {
            observer.observe(formRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Fixed button visibility
    useEffect(() => {
        const handleScroll = () => {
            if (submitButtonRef.current) {
                const rect = submitButtonRef.current.getBoundingClientRect();
                setShowFixedButton(rect.top > window.innerHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update progress
    useEffect(() => {
        setProgress(calculateProgress(formData));
    }, [formData]);

    // Calculate duration when dates change
    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            if (days > 0) {
                setFormData(prev => ({ ...prev, duration: `${days} days` }));
            }
        }
    }, [formData.startDate, formData.endDate]);

    // WhatsApp submission handler
    const handleSubmit = () => {
        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email ||
            !formData.phoneNumber || !formData.safariType || !formData.tourPlan ||
            !formData.startDate || !formData.endDate) {
            alert('Please fill in all required fields');
            return;
        }

        // Format message for WhatsApp
        const whatsappMessage = `
🦁 *NEW SAFARI BOOKING REQUEST* 🦁

👤 *Personal Information:*
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phoneCode} ${formData.phoneNumber}

🌍 *Safari Details:*
Safari Type: ${formData.safariType}
Tour Package: ${formData.tourPlan}
Start Date: ${formData.startDate}
End Date: ${formData.endDate}
Duration: ${formData.duration}

👥 *Guests:*
Adults: ${formData.adults}
Children: ${formData.kids}

💬 *Message:*
${formData.message || 'No special requests'}
        `.trim();

        // WhatsApp business number (replace with your actual WhatsApp number)
        const whatsappNumber = '254700000000'; // Replace with your WhatsApp number
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Show success message
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneCode: '+254',
                phoneNumber: '',
                safariType: '',
                tourPlan: '',
                startDate: '',
                endDate: '',
                duration: '',
                adults: 1,
                kids: 0,
                message: ''
            });
        }, 3000);
    };

    const applyDuration = (days) => {
        if (formData.startDate) {
            const start = new Date(formData.startDate);
            const end = new Date(start);
            end.setDate(start.getDate() + days);
            setFormData(prev => ({
                ...prev,
                endDate: end.toISOString().split('T')[0],
                duration: `${days} days`
            }));
        }
    };

    return (
        <>
            <style>{`
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
                
                @keyframes successPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }

                @keyframes fadeInSlide {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .safari-pattern {
                    background-image: 
                        repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(139,0,0,0.02) 35px, rgba(139,0,0,0.02) 70px),
                        repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(139,0,0,0.02) 35px, rgba(139,0,0,0.02) 70px);
                }

                .luxury-gradient {
                    background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,248,240,0.95) 100%);
                    backdrop-filter: blur(10px);
                }

                .form-section {
                    animation: slideUp 0.6s ease-out backwards;
                }
                
                .form-section:nth-child(1) { animation-delay: 0.1s; }
                .form-section:nth-child(2) { animation-delay: 0.2s; }
                .form-section:nth-child(3) { animation-delay: 0.3s; }
                .form-section:nth-child(4) { animation-delay: 0.4s; }

                .floating-label {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    pointer-events: none;
                    color: ${COLORS.brown};
                    opacity: 0.6;
                    font-family: "Montserrat", sans-serif;
                    font-size: 1rem;
                }

                .floating-label.active {
                    top: 0.5rem;
                    font-size: 0.75rem;
                    opacity: 1;
                    color: #D4AF37;
                    transform: translateY(0);
                }

                .fixed-cta {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 1000;
                    animation: fadeInSlide 0.4s ease-out;
                    box-shadow: 0 10px 40px rgba(139, 0, 0, 0.4);
                }

                /* MOBILE RESPONSIVE STYLES */
                @media (max-width: 768px) {
                    .form-container {
                        padding: 1.5rem !important;
                    }

                    .form-section {
                        padding: 1.5rem !important;
                    }

                    .form-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.25rem !important;
                    }

                    .phone-input-wrapper {
                        flex-direction: column !important;
                        gap: 1rem !important;
                    }

                    .phone-code-input {
                        width: 100% !important;
                        text-align: left !important;
                    }

                    .counter-grid {
                        grid-template-columns: 1fr !important;
                    }

                    .submit-button {
                        padding: 1.25rem 2rem !important;
                        font-size: 1rem !important;
                        width: 100% !important;
                    }

                    .submit-button svg {
                        width: 18px !important;
                        height: 18px !important;
                    }

                    .fixed-cta {
                        bottom: 1rem !important;
                        right: 1rem !important;
                        left: 1rem !important;
                        padding: 1rem 1.5rem !important;
                        font-size: 0.95rem !important;
                    }

                    .section-title {
                        font-size: 1.1rem !important;
                    }

                    .duration-buttons {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }

                    .progress-bar-container {
                        margin-bottom: 1.5rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .form-container {
                        padding: 1rem !important;
                    }

                    .form-section {
                        padding: 1.25rem !important;
                    }

                    .section-title {
                        font-size: 1rem !important;
                    }

                    .submit-button {
                        padding: 1rem 1.5rem !important;
                        font-size: 0.9rem !important;
                    }

                    .fixed-cta {
                        padding: 0.875rem 1.25rem !important;
                        font-size: 0.875rem !important;
                    }

                    .counter-wrapper {
                        padding: 0.875rem 1rem !important;
                    }

                    .counter-button {
                        width: 32px !important;
                        height: 32px !important;
                    }
                }
            `}</style>

            {/* Fixed CTA Button */}
            {showFixedButton && !submitted && (
                <button
                    onClick={() => submitButtonRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="fixed-cta"
                    style={{
                        padding: '1rem 2.5rem',
                        background: 'linear-gradient(135deg, #D4AF37 0%, #C9A961 50%, #D4AF37 100%)',
                        color: COLORS.darkRed,
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px) scale(1.05)';
                        e.target.style.boxShadow = '0 15px 50px rgba(139, 0, 0, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0) scale(1)';
                        e.target.style.boxShadow = '0 10px 40px rgba(139, 0, 0, 0.4)';
                    }}
                >
                    <Sparkles size={20} />
                    Complete Your Booking
                </button>
            )}

            <div ref={formRef} className="form-container" style={{
                width: '100%',
                maxWidth: '900px',
                margin: '0 auto',
                padding: '3rem',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.8s ease-out'
            }}>
                {submitted ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        animation: 'successPulse 2s ease-in-out infinite'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #D4AF37 0%, #C9A961 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem',
                            boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)'
                        }}>
                            <Check size={40} color="white" strokeWidth={3} />
                        </div>
                        <h2 style={{
                            fontSize: '2rem',
                            color: COLORS.darkRed,
                            fontFamily: '"Montserrat", sans-serif',
                            fontWeight: '600',
                            marginBottom: '1rem'
                        }}>
                            Booking Request Sent!
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: COLORS.brown,
                            fontFamily: '"Montserrat", sans-serif',
                            lineHeight: '1.6'
                        }}>
                            Thank you for choosing Mercelk Tours! We'll get back to you shortly to confirm your safari adventure.
                        </p>
                    </div>
                ) : (
                    <div>
                        {/* Header */}
                        <div style={{
                            textAlign: 'center',
                            marginBottom: '3rem'
                        }}>
                            <h2 style={{
                                fontSize: '2.5rem',
                                color: COLORS.darkRed,
                                fontFamily: '"Montserrat", sans-serif',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                background: 'linear-gradient(135deg, #8B0000 0%, #D4AF37 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Book Your Safari Adventure
                            </h2>
                            <p style={{
                                fontSize: '1.1rem',
                                color: COLORS.brown,
                                fontFamily: '"Montserrat", sans-serif',
                                opacity: 0.8
                            }}>
                                Begin your journey to discover the wild beauty of Kenya
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="progress-bar-container" style={{
                            marginBottom: '2rem',
                            padding: '1.5rem',
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '12px',
                            border: '1px solid rgba(139,0,0,0.15)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.75rem'
                            }}>
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontFamily: '"Montserrat", sans-serif',
                                    color: COLORS.brown,
                                    fontWeight: '500'
                                }}>
                                    Booking Progress
                                </span>
                                <span style={{
                                    fontSize: '1.1rem',
                                    fontFamily: '"Montserrat", sans-serif',
                                    color: COLORS.darkRed,
                                    fontWeight: '600'
                                }}>
                                    {progress}%
                                </span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '8px',
                                background: 'rgba(139,0,0,0.2)',
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${progress}%`,
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #D4AF37 0%, #C9A961 100%)',
                                    borderRadius: '10px',
                                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 2px 10px rgba(212, 175, 55, 0.4)'
                                }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Section 1: Personal Information */}
                            <div className="form-section luxury-gradient" style={{
                                padding: '2rem',
                                borderRadius: '12px',
                                border: '1px solid rgba(139,0,0,0.15)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }}>
                                <h3 className="section-title" style={{
                                    fontSize: '1.3rem',
                                    color: '#8B0000',
                                    fontFamily: '"Montserrat", sans-serif',
                                    marginBottom: '1.5rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        background: '#D4AF37',
                                        borderRadius: '50%',
                                        display: 'inline-block'
                                    }} />
                                    Personal Information
                                </h3>

                                <div className="form-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '1.5rem'
                                }}>
                                    {/* First Name */}
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            onFocus={() => setFocusedField('firstName')}
                                            onBlur={() => setFocusedField(null)}
                                            style={{
                                                width: '100%',
                                                padding: '1.5rem 1rem 0.5rem',
                                                fontSize: '1rem',
                                                border: `2px solid ${focusedField === 'firstName' ? '#D4AF37' : 'rgba(139,0,0,0.2)'}`,
                                                borderRadius: '8px',
                                                fontFamily: '"Montserrat", sans-serif',
                                                background: 'white',
                                                transition: 'all 0.3s ease',
                                                outline: 'none'
                                            }}
                                        />
                                        <label className={`floating-label ${formData.firstName || focusedField === 'firstName' ? 'active' : ''}`}>
                                            First Name *
                                        </label>
                                    </div>

                                    {/* Last Name */}
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            onFocus={() => setFocusedField('lastName')}
                                            onBlur={() => setFocusedField(null)}
                                            style={{
                                                width: '100%',
                                                padding: '1.5rem 1rem 0.5rem',
                                                fontSize: '1rem',
                                                border: `2px solid ${focusedField === 'lastName' ? '#D4AF37' : 'rgba(139,0,0,0.2)'}`,
                                                borderRadius: '8px',
                                                fontFamily: '"Montserrat", sans-serif',
                                                background: 'white',
                                                transition: 'all 0.3s ease',
                                                outline: 'none'
                                            }}
                                        />
                                        <label className={`floating-label ${formData.lastName || focusedField === 'lastName' ? 'active' : ''}`}>
                                            Last Name *
                                        </label>
                                    </div>

                                    {/* Email */}
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            style={{
                                                width: '100%',
                                                padding: '1.5rem 1rem 0.5rem',
                                                fontSize: '1rem',
                                                border: `2px solid ${focusedField === 'email' ? '#D4AF37' : 'rgba(139,0,0,0.2)'}`,
                                                borderRadius: '8px',
                                                fontFamily: '"Montserrat", sans-serif',
                                                background: 'white',
                                                transition: 'all 0.3s ease',
                                                outline: 'none'
                                            }}
                                        />
                                        <label className={`floating-label ${formData.email || focusedField === 'email' ? 'active' : ''}`}>
                                            Email Address *
                                        </label>
                                    </div>

                                    {/* Phone */}
                                    <div className="phone-input-wrapper" style={{ position: 'relative', display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="text"
                                            value={formData.phoneCode}
                                            onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                                            className="phone-code-input"
                                            style={{
                                                width: '100px',
                                                padding: '1rem',
                                                fontSize: '1rem',
                                                border: '2px solid rgba(139,0,0,0.2)',
                                                borderRadius: '8px',
                                                fontFamily: '"Montserrat", sans-serif',
                                                background: 'white',
                                                textAlign: 'center',
                                                fontWeight: '600'
                                            }}
                                        />
                                        <div style={{ position: 'relative', flex: 1 }}>
                                            <input
                                                type="tel"
                                                value={formData.phoneNumber}
                                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                onFocus={() => setFocusedField('phoneNumber')}
                                                onBlur={() => setFocusedField(null)}
                                                style={{
                                                    width: '100%',
                                                    padding: '1.5rem 1rem 0.5rem',
                                                    fontSize: '1rem',
                                                    border: `2px solid ${focusedField === 'phoneNumber' ? '#D4AF37' : 'rgba(139,0,0,0.2)'}`,
                                                    borderRadius: '8px',
                                                    fontFamily: '"Montserrat", sans-serif',
                                                    background: 'white',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none'
                                                }}
                                            />
                                            <label className={`floating-label ${formData.phoneNumber || focusedField === 'phoneNumber' ? 'active' : ''}`}>
                                                Phone Number *
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Safari Details */}
                            <div className="form-section luxury-gradient" style={{
                                padding: '2rem',
                                borderRadius: '12px',
                                border: '1px solid rgba(139,0,0,0.15)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }}>
                                <h3 className="section-title" style={{
                                    fontSize: '1.3rem',
                                    color: '#8B0000',
                                    fontFamily: '"Montserrat", sans-serif',
                                    marginBottom: '1.5rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        background: '#D4AF37',
                                        borderRadius: '50%',
                                        display: 'inline-block'
                                    }} />
                                    Safari Experience
                                </h3>

                                <div className="form-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '1.5rem'
                                }}>
                                    {/* Safari Type */}
                                    <div style={{ position: 'relative' }}>
                                        <label style={{
                                            position: 'absolute',
                                            left: '1rem',
                                            top: '0.5rem',
                                            fontSize: '0.75rem',
                                            color: '#D4AF37',
                                            fontFamily: '"Montserrat", sans-serif',
                                            fontWeight: '500',
                                            zIndex: 1,
                                            pointerEvents: 'none'
                                        }}>
                                            Safari Type *
                                        </label>
                                        <select
                                            value={formData.safariType}
                                            onChange={(e) => setFormData({ ...formData, safariType: e.target.value, tourPlan: '' })}
                                            onFocus={() => setFocusedField('safariType')}
                                            onBlur={() => setFocusedField(null)}
                                            style={{
                                                width: '100%',
                                                padding: '1.5rem 1rem 0.5rem',
                                                fontSize: '1rem',
                                                border: `2px solid ${focusedField === 'safariType' ? '#D4AF37' : 'rgba(139,0,0,0.2)'}`,
                                                borderRadius: '8px',
                                                fontFamily: '"Montserrat", sans-serif',
                                                background: 'white',
                                                transition: 'all 0.3s ease',
                                                outline: 'none',
                                                cursor: 'pointer',
                                                appearance: 'none',
                                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238B0000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 1rem center',
                                                backgroundSize: '1.5em',
                                                paddingRight: '3rem'
                                            }}
                                        >
                                            <option value="">Select...</option>
                                            <option value="By Road">By Road</option>
                                            <option value="By Air">By Air</option>
                                        </select>
                                    </div>

                                    {/* Tour Plan */}
                                    {formData.safariType && (
                                        <div style={{ position: 'relative' }}>
                                            <label style={{
                                                position: 'absolute',
                                                left: '1rem',
                                                top: '0.5rem',
                                                fontSize: '0.75rem',
                                                color: '#D4AF37',
                                                fontFamily: '"Montserrat", sans-serif',
                                                fontWeight: '500',
                                                zIndex: 1,
                                                pointerEvents: 'none'
                                            }}>
                                                Tour Package *
                                            </label>
                                            <select
                                                value={formData.tourPlan}
                                                onChange={(e) => setFormData({ ...formData, tourPlan: e.target.value })}
                                                onFocus={() => setFocusedField('tourPlan')}
                                                onBlur={() => setFocusedField(null)}
                                                style={{
                                                    width: '100%',
                                                    padding: '1.5rem 1rem 0.5rem',
                                                    fontSize: '1rem',
                                                    border: `2px solid ${focusedField === 'tourPlan' ? '#D4AF37' : 'rgba(139,0,0,0.2)'}`,
                                                    borderRadius: '8px',
                                                    fontFamily: '"Montserrat", sans-serif',
                                                    background: 'white',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none',
                                                    cursor: 'pointer',
                                                    appearance: 'none',
                                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238B0000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 1rem center',
                                                    backgroundSize: '1.5em',
                                                    paddingRight: '3rem'
                                                }}
                                            >
                                                <option value="">Select...</option>
                                                {TOUR_OPTIONS[formData.safariType]?.map(tour => (
                                                    <option key={tour.value} value={tour.value}>
                                                        {tour.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div style={{ position: 'relative' }}>
                                        <label style={{
                                            position: 'absolute',
                                            left: '1rem',
                                            top: '0.5rem',
                                            fontSize: '0.75rem',
                                            color: '#D4AF37',
                                            fontFamily: '"Montserrat", sans-serif',
                                            fontWeight: '500',
                                            zIndex: 1,
                                            pointerEvents: 'none'
                                        }}>
                                            Start Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            onFocus={() => setFocusedField('startDate')}
                                            onBlur={() => setFocusedField(null)}
                                            min={new Date().toISOString().split('T')[0]}
                                            style={{
                                                width: '100%',
                                                padding: '1.5rem 1rem 0.5rem',
                                                fontSize: '1rem',
                                                border: `2px solid ${focusedField === 'startDate' ? '#D4AF37' : 'rgba(139,0,0,0.2)'}`,
                                                borderRadius: '8px',
                                                fontFamily: '"Montserrat", sans-serif',
                                                background: 'white',
                                                transition: 'all 0.3s ease',
                                                outline: 'none',
                                                cursor: 'pointer',
                                                colorScheme: 'light'
                                            }}
                                        />
                                    </div>

                                    <div style={{ position: 'relative' }}>
                                        <label style={{
                                            position: 'absolute',
                                            left: '1rem',
                                            top: '0.5rem',
                                            fontSize: '0.75rem',
                                            color: '#D4AF37',
                                            fontFamily: '"Montserrat", sans-serif',
                                            fontWeight: '500',
                                            zIndex: 1,
                                            pointerEvents: 'none'
                                        }}>
                                            End Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            onFocus={() => setFocusedField('endDate')}
                                            onBlur={() => setFocusedField(null)}
                                            min={formData.startDate || new Date().toISOString().split('T')[0]}
                                            style={{
                                                width: '100%',
                                                padding: '1.5rem 1rem 0.5rem',
                                                fontSize: '1rem',
                                                border: `2px solid ${focusedField === 'endDate' ? '#D4AF37' : 'rgba(139,0,0,0.2)'}`,
                                                borderRadius: '8px',
                                                fontFamily: '"Montserrat", sans-serif',
                                                background: 'white',
                                                transition: 'all 0.3s ease',
                                                outline: 'none',
                                                cursor: 'pointer',
                                                colorScheme: 'light'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Duration Suggestions */}
                                {formData.startDate && (
                                    <div style={{ marginTop: '1.5rem' }}>
                                        <label style={{
                                            display: 'block',
                                            marginBottom: '0.75rem',
                                            fontSize: '0.9rem',
                                            color: COLORS.brown,
                                            fontFamily: '"Montserrat", sans-serif',
                                            fontWeight: '500',
                                            opacity: 0.8
                                        }}>
                                            Quick Duration Select:
                                        </label>
                                        <div className="duration-buttons" style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                                            gap: '0.75rem'
                                        }}>
                                            {DURATION_SUGGESTIONS.map(({ days, label }) => (
                                                <button
                                                    key={days}
                                                    type="button"
                                                    onClick={() => applyDuration(days)}
                                                    style={{
                                                        padding: '0.75rem 1rem',
                                                        fontSize: '0.9rem',
                                                        background: formData.duration === `${days} days` ? 
                                                            'linear-gradient(135deg, #D4AF37 0%, #C9A961 100%)' : 
                                                            'white',
                                                        color: formData.duration === `${days} days` ? 'white' : COLORS.brown,
                                                        border: `2px solid ${formData.duration === `${days} days` ? '#D4AF37' : 'rgba(139,0,0,0.2)'}`,
                                                        borderRadius: '8px',
                                                        fontFamily: '"Montserrat", sans-serif',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (formData.duration !== `${days} days`) {
                                                            e.target.style.borderColor = '#D4AF37';
                                                            e.target.style.color = '#D4AF37';
                                                            e.target.style.transform = 'translateY(-2px)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (formData.duration !== `${days} days`) {
                                                            e.target.style.borderColor = 'rgba(139,0,0,0.2)';
                                                            e.target.style.color = COLORS.brown;
                                                            e.target.style.transform = 'translateY(0)';
                                                        }
                                                    }}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Section 4: Guests & Message */}
                            <div className="form-section luxury-gradient" style={{
                                padding: '2rem',
                                borderRadius: '12px',
                                border: '1px solid rgba(139,0,0,0.15)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }}>
                                <h3 className="section-title" style={{
                                    fontSize: '1.3rem',
                                    color: '#8B0000',
                                    fontFamily: '"Montserrat", sans-serif',
                                    marginBottom: '1.5rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        background: '#D4AF37',
                                        borderRadius: '50%',
                                        display: 'inline-block'
                                    }} />
                                    Guests & Special Requests
                                </h3>

                                <div className="counter-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '1.5rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    <Counter
                                        value={formData.adults}
                                        onChange={(val) => setFormData({ ...formData, adults: val })}
                                        label="Adults"
                                        min={1}
                                    />
                                    <Counter
                                        value={formData.kids}
                                        onChange={(val) => setFormData({ ...formData, kids: val })}
                                        label="Children"
                                        min={0}
                                    />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        style={{
                                            width: '100%',
                                            padding: '1.5rem 1rem 0.5rem',
                                            fontSize: '1rem',
                                            border: `2px solid ${focusedField === 'message' ? '#D4AF37' : 'rgba(139,0,0,0.2)'}`,
                                            borderRadius: '8px',
                                            fontFamily: '"Montserrat", sans-serif',
                                            background: 'white',
                                            transition: 'all 0.3s ease',
                                            outline: 'none',
                                            resize: 'vertical',
                                            minHeight: '120px'
                                        }}
                                    />
                                    <label className={`floating-label ${formData.message || focusedField === 'message' ? 'active' : ''}`}>
                                        Special Requests or Questions
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                ref={submitButtonRef}
                                onClick={handleSubmit}
                                className="submit-button"
                                style={{
                                    padding: '1.5rem 3rem',
                                    fontSize: '1.2rem',
                                    background: 'linear-gradient(135deg, #D4AF37 0%, #C9A961 50%, #D4AF37 100%)',
                                    backgroundSize: '200% 100%',
                                    color: '#8B0000',
                                    border: 'none',
                                    borderRadius: '50px',
                                    fontFamily: '"Montserrat", sans-serif',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    marginTop: '1rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-3px) scale(1.02)';
                                    e.target.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.5)';
                                    e.target.style.backgroundPosition = '100% 0';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0) scale(1)';
                                    e.target.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
                                    e.target.style.backgroundPosition = '0 0';
                                }}
                            >
                                <Sparkles size={22} />
                                Send to WhatsApp
                                <Sparkles size={22} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BookingForm;