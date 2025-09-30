import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, X, Phone, Mail, Instagram, MessageCircle, Globe } from 'lucide-react';

// Staggered Menu Component
const StaggeredMenu = ({ menuItems, socialItems }) => {
  const [open, setOpen] = useState(false);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const toggleMenu = () => {
    const newOpen = !open;
    setOpen(newOpen);
    
    // Text animation logic
    const currentLabel = newOpen ? 'Menu' : 'Close';
    const targetLabel = newOpen ? 'Close' : 'Menu';
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);
  };

  return (
    <>
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
        <div style={{ pointerEvents: 'auto' }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#F5E6D3',
            margin: 0,
            letterSpacing: '2px'
          }}>MERCELK TOURS</h1>
        </div>
        
        <button
          onClick={toggleMenu}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: open ? '#8B0000' : '#F5E6D3',
            fontWeight: '500',
            fontSize: '1rem',
            transition: 'color 0.3s'
          }}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <div style={{
            width: '14px',
            height: '14px',
            position: 'relative',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
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

      {/* Menu Panel */}
      <aside style={{
        position: 'fixed',
        top: 0,
        right: open ? 0 : '-100%',
        width: 'min(420px, 100vw)',
        height: '100vh',
        background: '#F5E6D3',
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
                fontFamily: 'Georgia, serif',
                fontSize: '3rem',
                fontWeight: '600',
                color: '#000',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '-1px',
                display: 'inline-block',
                transition: 'color 0.3s',
                position: 'relative'
              }}
              onMouseEnter={(e) => e.target.style.color = '#8B0000'}
              onMouseLeave={(e) => e.target.style.color = '#000'}>
                {item.label}
                <span style={{
                  position: 'absolute',
                  top: '0.3em',
                  right: '-1.5em',
                  fontSize: '0.4em',
                  color: '#8B0000',
                  fontWeight: '400'
                }}>0{idx + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <h3 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1rem',
            color: '#8B0000',
            marginBottom: '1rem'
          }}>Socials</h3>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {socialItems.map((item, idx) => (
              <a key={idx} href={item.link} style={{
                fontSize: '1.1rem',
                color: '#000',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#8B0000'}
              onMouseLeave={(e) => e.target.style.color = '#000'}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

// Lightbox Component
const Lightbox = ({ image, onClose }) => {
  if (!image) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.95)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }} onClick={onClose}>
      <button onClick={onClose} style={{
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        background: 'transparent',
        border: 'none',
        color: '#F5E6D3',
        cursor: 'pointer',
        fontSize: '2rem'
      }}>
        <X size={32} />
      </button>
      <img src={image} alt="Gallery" style={{
        maxWidth: '90%',
        maxHeight: '90vh',
        objectFit: 'contain'
      }} />
    </div>
  );
};

// Main App
const MercelkTours = () => {
  const [activeTab, setActiveTab] = useState('road');
  const [lightboxImage, setLightboxImage] = useState(null);
  const heroRef = useRef(null);

  const menuItems = [
    { label: 'Home', link: '#hero' },
    { label: 'About', link: '#about' },
    { label: 'Tours', link: '#tours' },
    { label: 'Gallery', link: '#gallery' },
    { label: 'Contact', link: '#contact' }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/mercelktours/' },
    { label: 'WhatsApp', link: 'https://wa.me/254748937141' },
    { label: 'Community', link: 'https://community-si.com/en/public/profile/mercelk-tours' }
  ];

  const masonryImages = [
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800',
    'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800',
    'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800',
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
    'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=800',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800'
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
    'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1200',
    'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200',
    'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=1200',
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200',
    'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=1200',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200',
    'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200',
    'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=1200',
    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200'
  ];

  const roadTours = [
    {
      name: 'Savannah Symphony',
      subtitle: 'Bush-Beach Adventure',
      days: '9 days, 8 nights',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      itinerary: 'Nairobi → Maasai Mara → Lake Naivasha → Amboseli → Tsavo West → Taita Hills → Coast'
    },
    {
      name: 'Peaks & Plains',
      subtitle: 'Kenya in Focus',
      days: '7 days, 6 nights',
      image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800',
      itinerary: 'Nairobi → Nyeri → Nanyuki → Meru → Samburu'
    },
    {
      name: 'Rift Valley Explorer',
      subtitle: 'Classic Safari',
      days: '5 days, 4 nights',
      image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800',
      itinerary: 'Nairobi → Maasai Mara → Lake Nakuru → Nairobi'
    },
    {
      name: 'Kenya Classic',
      subtitle: 'Essential Kenya',
      days: '6 days, 5 nights',
      image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800',
      itinerary: 'Nairobi → Maasai Mara → Lake Nakuru → Amboseli'
    }
  ];

  const airTours = [
    {
      name: 'Ethereal Kenya',
      subtitle: 'Luxury Air Safari',
      days: '6 days, 5 nights',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
      itinerary: 'Nairobi → Amboseli → Samburu → Maasai Mara (by air)'
    }
  ];

  const excursions = [
    { name: 'Hot Air Ballooning', location: 'Maasai Mara & Amboseli', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600' },
    { name: 'Out of Africa Experience', location: 'Karen Blixen & Giraffe Centre', image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=600' },
    { name: 'Nairobi Museums', location: 'Cultural Heritage Tours', image: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=600' },
    { name: 'Nairobi National Park', location: 'Wildlife in the City', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600' }
  ];

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#3d2817' }}>
      <StaggeredMenu menuItems={menuItems} socialItems={socialItems} />

      {/* Hero Section with Masonry */}
      <section id="hero" ref={heroRef} style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '1rem',
          padding: '1rem',
          animation: 'scroll 40s linear infinite'
        }}>
          {[...masonryImages, ...masonryImages, ...masonryImages].map((img, idx) => (
            <div key={idx} style={{
              gridRow: `span ${Math.floor(Math.random() * 2) + 1}`,
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <img src={img} alt="" style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(20%) brightness(0.8)'
              }} />
            </div>
          ))}
        </div>
        
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          background: 'rgba(0,0,0,0.5)',
          padding: '3rem 2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '700',
            color: '#8B0000',
            margin: '0 0 1rem 0',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            EXPLORE KENYA'S WILD BEAUTY
          </h1>
          <a href="#contact" style={{
            color: '#F5E6D3',
            fontSize: '1.5rem',
            textDecoration: 'none',
            borderBottom: '2px solid #F5E6D3',
            paddingBottom: '4px',
            display: 'inline-block',
            transition: 'color 0.3s, border-color 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#8B0000';
            e.target.style.borderColor = '#8B0000';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#F5E6D3';
            e.target.style.borderColor = '#F5E6D3';
          }}>
            Book Now
          </a>
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* About Section */}
      <section id="about" style={{
        background: '#F5E6D3',
        padding: '6rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'relative',
            height: '500px',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800" alt="Safari" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} />
          </div>

          <div>
            <h2 style={{
              fontSize: '3rem',
              color: '#8B0000',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>About Mercelk Tours</h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#3d2817',
              marginBottom: '2rem'
            }}>
              To create unforgettable travel experiences that connect people with Kenya's rich wildlife, culture, and landscapes while promoting sustainable and responsible tourism.
            </p>

            <div style={{
              display: 'grid',
              gap: '1.5rem',
              marginTop: '3rem'
            }}>
              {[
                { title: 'Authenticity', desc: 'Genuine experiences showcasing Kenya\'s unique heritage', color: '#8B0000' },
                { title: 'Sustainability', desc: 'Protecting environment & supporting communities', color: '#A0522D' },
                { title: 'Customer-Centric', desc: 'Prioritizing traveler satisfaction & safety', color: '#8B4513' },
                { title: 'Innovation', desc: 'Unique and memorable experiences', color: '#D2691E' }
              ].map((value, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: `2px solid ${value.color}`,
                  transform: `translateX(${idx * 10}px)`,
                  boxShadow: '0 4px 15px rgba(139,0,0,0.1)',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = `translateX(${idx * 10}px) translateY(-5px)`}
                onMouseLeave={(e) => e.currentTarget.style.transform = `translateX(${idx * 10}px)`}>
                  <h3 style={{ color: value.color, marginBottom: '0.5rem', fontSize: '1.3rem' }}>{value.title}</h3>
                  <p style={{ color: '#3d2817', margin: 0 }}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" style={{
        background: 'linear-gradient(to bottom, #F5E6D3, #fff)',
        padding: '6rem 2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3.5rem',
            color: '#8B0000',
            textAlign: 'center',
            marginBottom: '3rem',
            fontWeight: '600'
          }}>Featured Safari Packages</h2>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {['road', 'air'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: activeTab === tab ? '#8B0000' : 'transparent',
                color: activeTab === tab ? '#F5E6D3' : '#8B0000',
                border: `2px solid #8B0000`,
                padding: '1rem 3rem',
                fontSize: '1.2rem',
                cursor: 'pointer',
                borderRadius: '50px',
                transition: 'all 0.3s',
                fontFamily: 'Georgia, serif',
                fontWeight: '600'
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
            {(activeTab === 'road' ? roadTours : airTours).map((tour, idx) => (
              <div key={idx} style={{
                position: 'relative',
                height: '500px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '3px solid #8B0000',
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
                    color: '#F5E6D3',
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>{tour.name}</h3>
                  <p style={{
                    color: '#F5E6D3',
                    fontSize: '1.1rem',
                    marginBottom: '1rem',
                    opacity: 0.9
                  }}>{tour.subtitle}</p>
                  <p style={{
                    color: '#F5E6D3',
                    fontSize: '1rem',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>{tour.days}</p>
                  <p style={{
                    color: '#F5E6D3',
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    marginBottom: '1rem'
                  }}>{tour.itinerary}</p>
                  <button style={{
                    background: '#F5E6D3',
                    color: '#8B0000',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    alignSelf: 'flex-start'
                  }}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Excursions Section */}
      <section style={{
        background: '#8B0000',
        padding: '4rem 2rem',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#F5E6D3',
            marginBottom: '2rem',
            fontWeight: '600'
          }}>Special Excursions</h2>
          
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '1rem'
          }}>
            {excursions.map((exc, idx) => (
              <div key={idx} style={{
                minWidth: '300px',
                height: '200px',
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '2px solid #F5E6D3'
              }}>
                <img src={exc.image} alt={exc.name} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem'
                }}>
                  <h3 style={{
                    color: '#F5E6D3',
                    fontSize: '1.3rem',
                    marginBottom: '0.3rem'
                  }}>{exc.name}</h3>
                  <p style={{
                    color: '#F5E6D3',
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    margin: 0
                  }}>{exc.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={{
        background: '#F5E6D3',
        padding: '6rem 2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3.5rem',
            color: '#8B0000',
            textAlign: 'center',
            marginBottom: '3rem',
            fontWeight: '600'
          }}>Gallery</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {galleryImages.slice(0, 12).map((img, idx) => (
              <div key={idx} 
                onClick={() => setLightboxImage(img)}
                style={{
                  height: '250px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <img src={img} alt="" style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button style={{
              background: 'transparent',
              color: '#8B0000',
              border: '2px solid #8B0000',
              padding: '1rem 3rem',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderRadius: '50px',
              fontFamily: 'Georgia, serif',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#8B0000';
              e.target.style.color = '#F5E6D3';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#8B0000';
            }}>
              View More
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        minHeight: '600px'
      }}>
        <div style={{
          background: '#8B0000',
          padding: '4rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{
            fontSize: '3rem',
            color: '#F5E6D3',
            marginBottom: '2rem',
            fontWeight: '600'
          }}>Get In Touch</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Phone size={24} color="#F5E6D3" />
              <div>
                <p style={{ color: '#F5E6D3', margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>Phone</p>
                <a href="tel:+254748937141" style={{ color: '#F5E6D3', fontSize: '1.2rem', textDecoration: 'none' }}>+254 748 937 141</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Mail size={24} color="#F5E6D3" />
              <div>
                <p style={{ color: '#F5E6D3', margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>Email</p>
                <a href="mailto:mercelktours@gmail.com" style={{ color: '#F5E6D3', fontSize: '1.2rem', textDecoration: 'none' }}>mercelktours@gmail.com</a>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p style={{ color: '#F5E6D3', marginBottom: '1rem', fontSize: '1.1rem' }}>Connect With Us</p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="https://www.instagram.com/mercelktours/" target="_blank" rel="noopener noreferrer" style={{
                  color: '#F5E6D3',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <Instagram size={28} />
                </a>
                <a href="https://wa.me/254748937141" target="_blank" rel="noopener noreferrer" style={{
                  color: '#F5E6D3',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <MessageCircle size={28} />
                </a>
                <a href="https://community-si.com/en/public/profile/mercelk-tours" target="_blank" rel="noopener noreferrer" style={{
                  color: '#F5E6D3',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <Globe size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: '#F5E6D3',
          padding: '4rem 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <form style={{
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '2rem',
              color: '#8B0000',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>Book Your Safari</h3>

            <input
              type="text"
              placeholder="Your Name"
              style={{
                padding: '1rem',
                fontSize: '1rem',
                border: '2px solid #3d2817',
                borderRadius: '8px',
                fontFamily: 'Georgia, serif',
                background: 'white'
              }}
            />

            <input
              type="email"
              placeholder="Email Address"
              style={{
                padding: '1rem',
                fontSize: '1rem',
                border: '2px solid #3d2817',
                borderRadius: '8px',
                fontFamily: 'Georgia, serif',
                background: 'white'
              }}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              style={{
                padding: '1rem',
                fontSize: '1rem',
                border: '2px solid #3d2817',
                borderRadius: '8px',
                fontFamily: 'Georgia, serif',
                background: 'white'
              }}
            />

            <select style={{
              padding: '1rem',
              fontSize: '1rem',
              border: '2px solid #3d2817',
              borderRadius: '8px',
              fontFamily: 'Georgia, serif',
              background: 'white',
              color: '#3d2817'
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
                border: '2px solid #3d2817',
                borderRadius: '8px',
                fontFamily: 'Georgia, serif',
                background: 'white',
                resize: 'vertical'
              }}
            />

            <button type="submit" style={{
              background: '#8B0000',
              color: '#F5E6D3',
              border: 'none',
              padding: '1.2rem 2rem',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderRadius: '50px',
              fontFamily: 'Georgia, serif',
              fontWeight: '600',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#6d0000'}
            onMouseLeave={(e) => e.target.style.background = '#8B0000'}>
              Submit Booking Request
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #8B0000, #3d2817)',
        padding: '3rem 2rem',
        color: '#F5E6D3'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Mercelk Tours</h3>
            <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>Creating unforgettable Kenya safari experiences</p>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Contact</h4>
            <p style={{ opacity: 0.8, margin: '0.5rem 0', fontSize: '0.9rem' }}>+254 748 937 141</p>
            <p style={{ opacity: 0.8, margin: '0.5rem 0', fontSize: '0.9rem' }}>mercelktours@gmail.com</p>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <a href="https://www.instagram.com/mercelktours/" target="_blank" rel="noopener noreferrer" style={{
                color: '#F5E6D3',
                transition: 'opacity 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                <Instagram size={24} />
              </a>
              <a href="https://wa.me/254748937141" target="_blank" rel="noopener noreferrer" style={{
                color: '#F5E6D3',
                transition: 'opacity 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                <MessageCircle size={24} />
              </a>
              <a href="https://community-si.com/en/public/profile/mercelk-tours" target="_blank" rel="noopener noreferrer" style={{
                color: '#F5E6D3',
                transition: 'opacity 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                <Globe size={24} />
              </a>
            </div>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(245,230,211,0.2)'
        }}>
          <p style={{ opacity: 0.7, fontSize: '0.9rem', margin: 0 }}>
            © {new Date().getFullYear()} Mercelk Tours. All rights reserved.
          </p>
        </div>
      </footer>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
};

export default MercelkTours;