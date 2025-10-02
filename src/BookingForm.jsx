import { useState, useEffect, useRef } from 'react';
import { Check, Plus, Minus } from 'lucide-react';
import { COLORS } from './COLORS';

import { ROAD_TOURS, AIR_TOURS } from './COLORS';

// Tour options dynamically generated from COLORS.jsx
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

// Counter Component
const Counter = ({ value, onChange, label, min = 0, max = 20 }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{
            fontSize: '0.9rem',
            color: COLORS.brown,
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: '400'
        }}>{label}</label>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem 1rem',
            border: `1px solid ${COLORS.brown}`,
            borderRadius: '8px',
            background: 'white',
            transition: 'all 0.3s'
        }}>
            <button
                type="button"
                onClick={() => onChange(Math.max(min, value - 1))}
                disabled={value <= min}
                style={{
                    background: value <= min ? '#ccc' : COLORS.darkRed,
                    color: 'white',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: value <= min ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                    opacity: value <= min ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                    if (value > min) e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                }}
            >
                <Minus size={16} />
            </button>

            <span style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: COLORS.brown,
                minWidth: '40px',
                textAlign: 'center',
                fontFamily: '"Montserrat", sans-serif'
            }}>{value}</span>

            <button
                type="button"
                onClick={() => onChange(Math.min(max, value + 1))}
                disabled={value >= max}
                style={{
                    background: value >= max ? '#ccc' : COLORS.darkRed,
                    color: 'white',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: value >= max ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                    opacity: value >= max ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                    if (value < max) e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                }}
            >
                <Plus size={16} />
            </button>
        </div>
    </div>
);

// Booking Form Component
export const BookingForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const formRef = useRef(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
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

    const inputStyle = (fieldName) => ({
        padding: '1rem',
        fontSize: '1rem',
        border: `1px solid ${focusedField === fieldName ? COLORS.darkRed : COLORS.brown}`,
        borderRadius: '8px',
        fontFamily: '"Montserrat", sans-serif',
        background: 'white',
        transition: 'all 0.3s ease',
        transform: focusedField === fieldName ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: focusedField === fieldName ? `0 4px 12px rgba(139, 0, 0, 0.15)` : 'none',
        outline: 'none'
    });

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
        
        .form-field {
          animation: slideUp 0.6s ease-out backwards;
        }
        
        .form-field:nth-child(1) { animation-delay: 0.1s; }
        .form-field:nth-child(2) { animation-delay: 0.2s; }
        .form-field:nth-child(3) { animation-delay: 0.3s; }
        .form-field:nth-child(4) { animation-delay: 0.4s; }
        .form-field:nth-child(5) { animation-delay: 0.5s; }
        .form-field:nth-child(6) { animation-delay: 0.6s; }
      `}</style>

            <div ref={formRef} style={{ width: '100%', maxWidth: '600px' }}>
                {submitted ? (
                    <div style={{
                        background: 'white',
                        padding: '3rem',
                        borderRadius: '12px',
                        border: `2px solid ${COLORS.darkRed}`,
                        textAlign: 'center',
                        animation: 'successPulse 0.6s ease-out'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: COLORS.darkRed,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem'
                        }}>
                            <Check size={40} color={COLORS.sage} strokeWidth={3} />
                        </div>
                        <h3 style={{
                            fontSize: '2rem',
                            color: COLORS.darkRed,
                            marginBottom: '1rem',
                            fontFamily: '"Montserrat", sans-serif',
                            fontWeight: '300'
                        }}>Booking Request Sent!</h3>
                        <p style={{
                            fontSize: '1.1rem',
                            color: COLORS.brown,
                            fontFamily: '"Montserrat", sans-serif',
                            lineHeight: '1.6'
                        }}>
                            Thank you for your interest. We'll get back to you within 24 hours to confirm your safari adventure.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease-out'
                    }}>
                        <h3 style={{
                            fontSize: '2.5rem',
                            color: COLORS.darkRed,
                            fontFamily: '"Montserrat", sans-serif',
                            marginBottom: '0.5rem',
                            fontWeight: '300'
                        }}>Book Your Safari</h3>

                        {/* Name Fields */}
                        <div className="form-field" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem'
                        }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem',
                                    color: COLORS.brown,
                                    fontFamily: '"Montserrat", sans-serif'
                                }}>First Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    onFocus={() => setFocusedField('firstName')}
                                    onBlur={() => setFocusedField(null)}
                                    style={inputStyle('firstName')}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem',
                                    color: COLORS.brown,
                                    fontFamily: '"Montserrat", sans-serif'
                                }}>Last Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    onFocus={() => setFocusedField('lastName')}
                                    onBlur={() => setFocusedField(null)}
                                    style={inputStyle('lastName')}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-field">
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                color: COLORS.brown,
                                fontFamily: '"Montserrat", sans-serif'
                            }}>Email *</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                style={inputStyle('email')}
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="form-field">
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                color: COLORS.brown,
                                fontFamily: '"Montserrat", sans-serif'
                            }}>Phone Number *</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    value={formData.phoneCode}
                                    onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                                    onFocus={() => setFocusedField('phoneCode')}
                                    onBlur={() => setFocusedField(null)}
                                    style={{ ...inputStyle('phoneCode'), width: '100px' }}
                                    placeholder="+254"
                                />
                                <input
                                    type="tel"
                                    required
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    onFocus={() => setFocusedField('phoneNumber')}
                                    onBlur={() => setFocusedField(null)}
                                    style={{ ...inputStyle('phoneNumber'), flex: 1 }}
                                    placeholder="712345678"
                                />
                            </div>
                        </div>

                        {/* Safari Type Selection */}
                        <div className="form-field">
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                color: COLORS.brown,
                                fontFamily: '"Montserrat", sans-serif'
                            }}>Safari Type *</label>
                            <select
                                required
                                value={formData.safariType}
                                onChange={(e) => setFormData({ ...formData, safariType: e.target.value, tourPlan: '' })}
                                onFocus={() => setFocusedField('safariType')}
                                onBlur={() => setFocusedField(null)}
                                style={inputStyle('safariType')}
                            >
                                <option value="">Select Safari Type</option>
                                <option value="By Road">Safari By Road</option>
                                <option value="By Air">Safari By Air</option>
                            </select>
                        </div>

                        {/* Tour Plan Selection - Only shows after safari type is selected */}
                        {formData.safariType && (
                            <div className="form-field" style={{ animation: 'slideUp 0.4s ease-out' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem',
                                    color: COLORS.brown,
                                    fontFamily: '"Montserrat", sans-serif'
                                }}>Tour Package *</label>
                                <select
                                    required
                                    value={formData.tourPlan}
                                    onChange={(e) => setFormData({ ...formData, tourPlan: e.target.value })}
                                    onFocus={() => setFocusedField('tourPlan')}
                                    onBlur={() => setFocusedField(null)}
                                    style={inputStyle('tourPlan')}
                                >
                                    <option value="">Select Tour Package</option>
                                    {TOUR_OPTIONS[formData.safariType].map(tour => (
                                        <option key={tour.value} value={tour.value}>{tour.label}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Date Selection */}
                        <div className="form-field">
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                color: COLORS.brown,
                                fontFamily: '"Montserrat", sans-serif'
                            }}>Travel Dates *</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <input
                                        type="date"
                                        required
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        onFocus={() => setFocusedField('startDate')}
                                        onBlur={() => setFocusedField(null)}
                                        style={inputStyle('startDate')}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    <span style={{
                                        display: 'block',
                                        fontSize: '0.8rem',
                                        color: COLORS.brown,
                                        opacity: 0.7,
                                        marginTop: '0.25rem',
                                        fontFamily: '"Montserrat", sans-serif'
                                    }}>Start Date</span>
                                </div>
                                <div>
                                    <input
                                        type="date"
                                        required
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        onFocus={() => setFocusedField('endDate')}
                                        onBlur={() => setFocusedField(null)}
                                        style={inputStyle('endDate')}
                                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                                    />
                                    <span style={{
                                        display: 'block',
                                        fontSize: '0.8rem',
                                        color: COLORS.brown,
                                        opacity: 0.7,
                                        marginTop: '0.25rem',
                                        fontFamily: '"Montserrat", sans-serif'
                                    }}>End Date</span>
                                </div>
                            </div>

                            {/* Duration Suggestions */}
                            {formData.startDate && (
                                <div style={{
                                    marginTop: '0.75rem',
                                    display: 'flex',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap',
                                    animation: 'slideUp 0.3s ease-out'
                                }}>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        color: COLORS.brown,
                                        fontFamily: '"Montserrat", sans-serif',
                                        alignSelf: 'center'
                                    }}>Quick select:</span>
                                    {DURATION_SUGGESTIONS.map(({ days, label }) => (
                                        <button
                                            key={days}
                                            type="button"
                                            onClick={() => applyDuration(days)}
                                            style={{
                                                padding: '0.4rem 0.8rem',
                                                fontSize: '0.85rem',
                                                background: 'white',
                                                border: `1px solid ${COLORS.darkRed}`,
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                fontFamily: '"Montserrat", sans-serif',
                                                color: COLORS.darkRed,
                                                transition: 'all 0.3s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.background = COLORS.darkRed;
                                                e.target.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.background = 'white';
                                                e.target.style.color = COLORS.darkRed;
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Participants */}
                        <div className="form-field" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem'
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

                        {/* Message */}
                        <div className="form-field">
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                color: COLORS.brown,
                                fontFamily: '"Montserrat", sans-serif'
                            }}>Special Requests or Questions</label>
                            <textarea
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                style={{
                                    ...inputStyle('message'),
                                    resize: 'vertical',
                                    minHeight: '100px'
                                }}
                                placeholder="Tell us about dietary requirements, special occasions, or any specific requests..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            style={{
                                background: COLORS.darkRed,
                                color: COLORS.sage,
                                border: 'none',
                                padding: '1.2rem 2rem',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                borderRadius: '50px',
                                fontFamily: '"Montserrat", sans-serif',
                                fontWeight: '400',
                                transition: 'all 0.3s',
                                boxShadow: '0 4px 15px rgba(139, 0, 0, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#6d0000';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(139, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = COLORS.darkRed;
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(139, 0, 0, 0.2)';
                            }}
                        >
                            Submit Booking Request
                        </button>
                    </form>
                )}
            </div>
        </>
    );
};