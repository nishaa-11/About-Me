import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [letterVisible, setLetterVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [submittedMessage, setSubmittedMessage] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isHeartRain, setIsHeartRain] = useState(false)
  const [hearts, setHearts] = useState([])

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'interest', label: 'Interest' },
    { id: 'scrapbook', label: 'Scrapbook' },
    { id: 'contact', label: 'Contact' }
  ]

  // Refs for sections
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    interest: useRef(null),
    scrapbook: useRef(null),
    contact: useRef(null)
  }

  // Array of images - add up to 5 images here
  const heroImages = [
    '/slide1.png',
    '/slide2.png', // Replaced with actual image paths
    '/slide4.JPG', // Your new photo
    '/slide3.jpg', // Replaced with actual image paths
    '/slide5.jpg'  // Replaced with actual image paths
  ]

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = sectionRefs[sectionId].current
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  // Scrapbook functionality
  const scrapbookPages = [
    {
      id: 1,
      title: "Adventures & Memories",
      items: [
        { type: 'text', content: 'My favorite coffee shop moments ☕', style: { top: '10%', left: '15%', rotate: '-5deg', color: '#e91e63' } },
        { type: 'image', src: '/placeholder1.jpg', style: { top: '25%', left: '60%', width: '200px', rotate: '3deg' } },
        { type: 'text', content: 'Weekend vibes 🌻', style: { top: '45%', left: '10%', rotate: '8deg', color: '#9c27b0' } },
        { type: 'image', src: '/placeholder2.jpg', style: { top: '60%', left: '50%', width: '180px', rotate: '-7deg' } },
        { type: 'text', content: 'Good times with friends 💫', style: { top: '80%', left: '20%', rotate: '2deg', color: '#673ab7' } }
      ]
    },
    {
      id: 2,
      title: "Creative Moments",
      items: [
        { type: 'text', content: 'Art in progress 🎨', style: { top: '15%', left: '20%', rotate: '-3deg', color: '#ff5722' } },
        { type: 'image', src: '/placeholder3.jpg', style: { top: '30%', left: '55%', width: '190px', rotate: '5deg' } },
        { type: 'text', content: 'Late night creativity ✨', style: { top: '55%', left: '15%', rotate: '6deg', color: '#ff9800' } },
        { type: 'image', src: '/placeholder4.jpg', style: { top: '70%', left: '45%', width: '170px', rotate: '-4deg' } }
      ]
    },
    {
      id: 3,
      title: "Life Snapshots",
      items: [
        { type: 'text', content: 'Sunset walks 🌅', style: { top: '12%', left: '25%', rotate: '-6deg', color: '#2196f3' } },
        { type: 'image', src: '/placeholder5.jpg', style: { top: '28%', left: '50%', width: '210px', rotate: '2deg' } },
        { type: 'text', content: 'Random thoughts & dreams 💭', style: { top: '50%', left: '10%', rotate: '7deg', color: '#4caf50' } },
        { type: 'image', src: '/placeholder6.jpg', style: { top: '65%', left: '60%', width: '160px', rotate: '-8deg' } },
        { type: 'text', content: 'Life is beautiful 🌸', style: { top: '85%', left: '30%', rotate: '3deg', color: '#e91e63' } }
      ]
    }
  ]

  const openBook = () => {
    // Add opening class first for animation
    const bookWrapper = document.querySelector('.book-wrapper');
    if (bookWrapper) {
      bookWrapper.classList.add('opening');
    }
    
    // After animation completes, show the open book content
    setTimeout(() => {
      setIsBookOpen(true);
    }, 2000); // Match the CSS transition duration
  }

  const closeBook = () => {
    setIsBookOpen(false)
    setCurrentPage(0)
    
    // Remove opening class to reverse animation
    setTimeout(() => {
      const bookWrapper = document.querySelector('.book-wrapper');
      if (bookWrapper) {
        bookWrapper.classList.remove('opening');
      }
    }, 100);
  }

  const nextPage = () => {
    if (currentPage < scrapbookPages.length - 1 && !isFlipping) {
      setIsFlipping(true)
      
      // After flip animation completes, change page
      setTimeout(() => {
        setCurrentPage(currentPage + 1)
        setIsFlipping(false)
      }, 900) // Match CSS animation duration
    }
  }

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true)
      
      // For previous page, we simulate a reverse flip
      setTimeout(() => {
        setCurrentPage(currentPage - 1)
        setIsFlipping(false)
      }, 900) // Match CSS animation duration
    }
  }

  const handleEnvelopeClick = () => {
    setEnvelopeOpen(!envelopeOpen)
    if (!envelopeOpen) {
      setTimeout(() => setLetterVisible(true), 600)
    } else {
      setLetterVisible(false)
    }
  }

  const handleMessageSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setSubmittedMessage(message)
      setMessage('')
      // Animation for message being "sent"
      setTimeout(() => {
        setEnvelopeOpen(false)
        setLetterVisible(false)
      }, 1000)
    }
  }

  // Trigger a short heart rain when clicking the memory box image
  const triggerHeartRain = () => {
    // Generate a small set of hearts with random positions/sizes/delays
    const count = 28
    const newHearts = Array.from({ length: count }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 100, // percentage across the viewport
      delay: Math.random() * 0.6, // slight stagger
      size: 18 + Math.random() * 16, // 18px - 34px
      sway: (Math.random() * 60 - 30).toFixed(0) // -30px to 30px
    }))
  setHearts(newHearts)
  setIsHeartRain(true)
  // Stop after ~5 seconds
  setTimeout(() => setIsHeartRain(false), 5000)
  }

  return (
    <div className="app">
      {/* Fixed Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" ref={sectionRefs.home} className="section hero-section">
        <div className="hero-content">
          <div className="floating-text">
            <span className="greeting">Please dont go bald</span>
            <span className="guide-text">:(</span>
          </div>
          <div className="name-display">
            <span className="name-word this">This</span>
            <span className="name-word is">is</span>
            <span className="name-word nisha">Nisha</span>
            <span className="name-word b">☆ </span>
          </div>
          <div className="title-container">
            <span className="title"> :3</span>
            <span className="author"> :3</span>
          </div>
          <div className="browser-frame">
            <div className="browser-header">
              <div className="browser-controls">
                <div className="control-btn close"></div>
                <div className="control-btn minimize"></div>
                <div className="control-btn maximize"></div>
              </div>
              <div className="browser-url-bar">
                <div className="url-content">diva.com</div>
              </div>
            </div>
            <div className="browser-content">
              <div className="image-gallery">
                {heroImages.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img 
                      src={image} 
                      alt={`Nisha B - Photo ${index + 1}`} 
                      className="gallery-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="image-placeholder" style={{display: 'none'}}>
                      <span> Image {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRefs.about} className="section about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>ABOUT ME</h2>
            <p>
              ☆ Hi, I’m Nisha, a 19-year-old Computer Science Engineering student at BMSIT with a passion for software development and everything tech.<br></br>
              ☆ I love exploring how technology works and enjoy experimenting with design tools to bring creative ideas to life.<br></br>
              ☆ When I’m not coding, you’ll probably find me making crafts, playing games, or trying out new recipes.
            </p>
            <div className="about-images">
              <div className="about-img-1">
                <img src="/about2.jpg" alt="About Image 1" className="about-image" />
              </div>
              <div className="about-img-2">
                <img src="/jpeg(6).jpeg" alt="About Image 2" className="about-image" />
              </div>
            </div>
            <p className="highlight-text">
              Doomscrolling Final boss
            </p>
          </div>
          <div className="about-visual">
            <img 
              src="/memory_box.png" 
              alt="Memory Box Photo" 
              className="memory-box-photo" 
              onClick={triggerHeartRain}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="interest" ref={sectionRefs.interest} className="section skills-section">
        <div className="skills-content">
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Video Editing</h3>
              <div className="skill-details">
                <p>Content creating and editing</p>
                <p>I do social media editing long, edit growth, and interactive video editing</p>
                <p>Popular media user</p>
              </div>
            </div>
            <div className="image-placeholder skill-photo">
              <span>Skill Photo</span>
            </div>
          </div>
          <div className="tagline">
            <h2>It's not just editing, it's vibing with visuals.</h2>
            <div className="stats-images">
              <div className="image-placeholder stat-img-1">
                <span>Stats Image 1</span>
              </div>
              <div className="image-placeholder stat-img-2">
                <span>Stats Image 2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrapbook Section (Intentionally left empty) */}
      <section id="scrapbook" ref={sectionRefs.scrapbook} className="section scrapbook-section"></section>

      {/* Contact Section */}
      <section id="contact" ref={sectionRefs.contact} className="section contact-section">
        <div className="contact-content">
          <div className="lets-connect">
            <h1 className="connect-title">Let's Connect</h1>
            <p className="connect-subtitle">Find me on these platforms</p>
          </div>
          
          <div className="social-grid">
            <a href="https://www.instagram.com/ah_.sin/" target="_blank" rel="noopener noreferrer" className="social-button instagram">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>

            
            
            <a href="https://www.linkedin.com/in/nininisha/" target="_blank" rel="noopener noreferrer" className="social-button linkedin">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            
            <a href="https://discord.com/users/784708985462849547" target="_blank" rel="noopener noreferrer" className="social-button discord">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.608 1.249-1.843-.276-3.68-.276-5.486 0-.164-.398-.41-.874-.622-1.249a.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.045-.32 13.58.099 18.061a.082.082 0 00.031.056 19.9 19.9 0 006.001 3.058.078.078 0 00.084-.027c.462-.63.874-1.295 1.226-1.994a.077.077 0 00-.041-.107 13.1 13.1 0 01-1.868-.9.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.009c.12.099.246.197.372.291a.077.077 0 01-.006.128 12.299 12.299 0 01-1.869.9.077.077 0 00-.041.107c.36.699.773 1.364 1.226 1.994a.078.078 0 00.084.027 19.876 19.876 0 006.001-3.058.082.082 0 00.031-.056c.5-5.177-.838-9.673-3.548-13.665a.061.061 0 00-.031-.027zm-12.01 11.73c-1.185 0-2.156-1.085-2.156-2.419 0-1.333.951-2.418 2.156-2.418 1.216 0 2.177 1.096 2.156 2.418 0 1.334-.951 2.419-2.156 2.419zm7.386 0c-1.185 0-2.156-1.085-2.156-2.419 0-1.333.951-2.418 2.156-2.418 1.216 0 2.177 1.096 2.156 2.418 0 1.334-.94 2.419-2.156 2.419z"/>
              </svg>
              Discord
            </a>

            <a href="mailto:nishabinukumar11@gmail.com" className="social-button email">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email
            </a>

            <a href="https://open.spotify.com/user/31vdqxovus2a4x2i44sezkxmt4qa?si=429fbef622374926" target="_blank" rel="noopener noreferrer" className="social-button spotify">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12s12-5.372 12-12C24 5.373 18.627 0 12 0zm5.485 17.273a.75.75 0 01-1.03.247c-2.823-1.724-6.379-2.115-10.566-1.162a.75.75 0 01-.33-1.463c4.535-1.022 8.44-.58 11.542 1.284a.75.75 0 01.384 1.094zm1.472-3.297a.937.937 0 01-1.292.309c-3.228-1.98-8.153-2.558-11.965-1.404a.937.937 0 01-.537-1.796c4.242-1.267 9.633-.624 13.35 1.656.45.277.593.867.444 1.235zm.13-3.402a1.125 1.125 0 01-1.55.37c-3.695-2.243-9.33-2.747-13.648-1.507a1.125 1.125 0 01-.64-2.155c4.928-1.463 11.102-.896 15.331 1.727.53.322.69 1.023.507 1.565z"/>
              </svg>
              Spotify
            </a>

            <a href="https://github.com/nishaa-11" target="_blank" rel="noopener noreferrer" className="social-button github">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>

          <div className="envelope-section">
            <div className="envelope-icon">
              <svg viewBox="0 0 24 24" fill="none" className="envelope-svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#e91e63" strokeWidth="2" fill="white"/>
                <path d="m22 6-10 7L2 6" stroke="#e91e63" strokeWidth="2" fill="#e91e63"/>
              </svg>
            </div>
            
            <button 
              className="open-envelope-btn"
              onClick={handleEnvelopeClick}
            >
              {envelopeOpen ? "Close Envelope" : "Open Envelope"}
            </button>

            {envelopeOpen && letterVisible && (
              <div className="message-card">
                <div className="message-container">
                  <div className="message-tab"></div>
                  <form onSubmit={handleMessageSubmit} className="message-form">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      rows="6"
                      required
                      className="message-textarea"
                    />
                    <button type="submit" className="seal-send-btn">
                      Seal & Send ✉
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {submittedMessage && (
            <div className="message-confirmation">
              <p>Thank you for your message!</p>
              <div className="submitted-message">"{submittedMessage}"</div>
            </div>
          )}

          <div className="final-text">
            <span className="and">and</span>
            <span className="thats">that's</span>
            <span className="wrap">a wrap.</span>
          </div>
        </div>
      </section>
      {/* Heart Rain Overlay */}
      {isHeartRain && (
        <div className="heart-rain-overlay" aria-hidden="true">
          {hearts.map(h => (
            <span
              key={h.id}
              className="heart-emoji"
              role="presentation"
              style={{
                left: `${h.left}%`,
                animationDelay: `${h.delay}s`,
                fontSize: `${h.size}px`,
                ['--sway']: `${h.sway}px`
              }}
            >
              ★
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
