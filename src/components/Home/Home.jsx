import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">

      {/* ==================== HEADER ==================== */}
      <header className="home-header">
        <div className="home-header-inner">
          <a href="/" className="home-logo">
            LOGO
          </a>

          <nav className="home-nav">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#cta" className="home-header-button">
            Get Started
          </a>
        </div>
      </header>


      {/* ==================== HERO ==================== */}
      <main>

        <section className="home-hero">
          <div className="home-container">
            <div className="home-hero-content">

              <span className="home-hero-label">
                HERO LABEL
              </span>

              <h1 className="home-hero-title">
                Your main headline goes here.
              </h1>

              <p className="home-hero-description">
                A short description explaining what your website, product,
                service, or project does.
              </p>

              <div className="home-hero-actions">
                <a href="#cta" className="home-button home-button-primary">
                  Get Started
                </a>

                <a href="#about" className="home-button home-button-secondary">
                  Learn More
                </a>
              </div>

            </div>

            <div className="home-hero-visual">
              <div className="home-placeholder">
                HERO IMAGE
              </div>
            </div>

          </div>
        </section>


        {/* ==================== FEATURES ==================== */}
        <section id="features" className="home-section home-features">
          <div className="home-container">

            <div className="home-section-header">
              <span className="home-section-label">
                FEATURES
              </span>

              <h2 className="home-section-title">
                Everything you need.
              </h2>

              <p className="home-section-description">
                Introduce the main benefits or features of your product.
              </p>
            </div>


            <div className="home-features-grid">

              <article className="home-feature-card">
                <div className="home-feature-icon">
                  01
                </div>

                <h3>
                  Feature One
                </h3>

                <p>
                  A short explanation of this feature and why it matters.
                </p>
              </article>


              <article className="home-feature-card">
                <div className="home-feature-icon">
                  02
                </div>

                <h3>
                  Feature Two
                </h3>

                <p>
                  A short explanation of this feature and why it matters.
                </p>
              </article>


              <article className="home-feature-card">
                <div className="home-feature-icon">
                  03
                </div>

                <h3>
                  Feature Three
                </h3>

                <p>
                  A short explanation of this feature and why it matters.
                </p>
              </article>

            </div>

          </div>
        </section>


        {/* ==================== ABOUT ==================== */}
        <section id="about" className="home-section home-about">
          <div className="home-container">

            <div className="home-about-grid">

              <div className="home-about-visual">
                <div className="home-placeholder">
                  IMAGE
                </div>
              </div>

              <div className="home-about-content">

                <span className="home-section-label">
                  ABOUT
                </span>

                <h2 className="home-section-title">
                  A section about your project.
                </h2>

                <p>
                  This section can explain who you are, what you are building,
                  why it exists, or what makes your project different.
                </p>

                <p>
                  Keep this area flexible so you can later replace it with
                  your actual story and content.
                </p>

                <a href="#contact" className="home-text-link">
                  Learn more →
                </a>

              </div>

            </div>

          </div>
        </section>


        {/* ==================== CTA ==================== */}
        <section id="cta" className="home-cta">
          <div className="home-container">

            <div className="home-cta-content">

              <span className="home-section-label">
                CALL TO ACTION
              </span>

              <h2>
                Ready to get started?
              </h2>

              <p>
                A simple final message encouraging visitors to take action.
              </p>

              <a href="#contact" className="home-button home-button-primary">
                Get Started
              </a>

            </div>

          </div>
        </section>

      </main>


      {/* ==================== FOOTER ==================== */}
      <footer id="contact" className="home-footer">
        <div className="home-container">

          <div className="home-footer-top">

            <div className="home-footer-brand">
              <div className="home-logo">
                LOGO
              </div>

              <p>
                A short description of your website or project.
              </p>
            </div>

            <div className="home-footer-links">

              <div>
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#about">About</a>
              </div>

              <div>
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>

              <div>
                <h4>Social</h4>
                <a href="#">Instagram</a>
                <a href="#">Twitter</a>
              </div>

            </div>

          </div>

          <div className="home-footer-bottom">
            <span>
              © 2026 Your Company
            </span>

            <div>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;