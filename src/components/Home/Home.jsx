import React, { useEffect, useState } from "react";
import "./Home.css";

const slides = [
  { id: 1, color: "#0071e3" },
  { id: 2, color: "#34c759" },
  { id: 3, color: "#ff9f0a" },
  { id: 4, color: "#7c4dff" },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const goToPrevious = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <main className="home">
      <section className="hero">
        {/* Slides */}
        <div
          className="hero-track"
          style={{
            transform: `translateX(-${activeSlide * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              className="hero-slide"
              key={slide.id}
              style={{ backgroundColor: slide.color }}
            />
          ))}
        </div>

        {/* Left arrow */}
        <button
          className="hero-arrow hero-arrow-left"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <span>‹</span>
        </button>

        {/* Right arrow */}
        <button
          className="hero-arrow hero-arrow-right"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <span>›</span>
        </button>

        {/* Dots */}
        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot ${
                activeSlide === index ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;