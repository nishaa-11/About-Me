import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [letterVisible, setLetterVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [submittedMessage, setSubmittedMessage] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const sections = [
    'Home',
    'About',
    'Interest',
    'Fun',
    'Contact'
  ]

  // Array of images - add up to 5 images here
  const heroImages = [
    '/slide1.png',
    '/slide2.png', // Replace with actual image paths
    '/slide4.JPG', // Your new photo
    '/slide3.jpg', // Replace with actual image paths
    '/slide5.jpg'  // Replace with actual image paths
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
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

  return (
    <div className="app">
      {/* Navigation - Show on all sections */}
      <nav className="section-nav">
        {sections.map((section, index) => (
          <button
            key={section}
            className={`section-nav-btn ${currentSection === index ? 'active' : ''}`}
            onClick={() => setCurrentSection(index)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </nav>

      {/* Home Section */}
      <section className={`section hero-section ${currentSection === 0 ? 'active' : ''}`}>
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
      <section className={`section about-section ${currentSection === 1 ? 'active' : ''}`}>
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
            <img src="/memory_box.png" alt="Memory Box Photo" className="memory-box-photo" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`section skills-section ${currentSection === 2 ? 'active' : ''}`}>
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

      {/* Gallery Section */}
      <section className={`section gallery-section ${currentSection === 3 ? 'active' : ''}`}>
        <div className="gallery-content">
          <div className="gallery-grid">
            <div className="image-placeholder gallery-img">
              <span>Gallery Image 1</span>
            </div>
            <div className="image-placeholder gallery-img">
              <span>Gallery Image 2</span>
            </div>
            <div className="image-placeholder gallery-img">
              <span>Gallery Image 3</span>
            </div>
            <div className="image-placeholder gallery-img">
              <span>Gallery Image 4</span>
            </div>
          </div>
          <div className="skills-showcase">
            <span className="skill-word skills">skills</span>
            <span className="skill-word work">work</span>
            <div className="work-samples">
              <div className="image-placeholder work-sample">
                <span>Work Sample</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`section contact-section ${currentSection === 4 ? 'active' : ''}`}>
        <div className="contact-content">
          <div className="lets-connect">
            <h1 className="connect-title">Let's Connect</h1>
            <p className="connect-subtitle">Find me on these platforms</p>
          </div>
          
          <div className="social-grid">
            <a href="#" className="social-button instagram">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            
            <a href="#" className="social-button twitter">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </a>
            
            <a href="#" className="social-button linkedin">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            
            <a href="#" className="social-button github">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            
            <a href="#" className="social-button email">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email
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
    </div>
  )
}

export default App
