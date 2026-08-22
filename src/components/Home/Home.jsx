import React, { useEffect, useState } from "react";
import "./Home.css";

import left from "../ArtWork/icons/arrowLeft.svg";
import right from "../ArtWork/icons/arrowRight.svg";

const slides = [
  { id: 1, color: "#0071e3" },
  { id: 2, color: "#34c759" },
  { id: 3, color: "#ff9f0a" },
  { id: 4, color: "#7c4dff" },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  /*
   * Automatic sliding
   *
   * The timerKey dependency means that whenever
   * the user manually changes the slide, this effect
   * is recreated and the 5-second timer starts again.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [timerKey]);

  /*
   * Change slide manually and restart timer
   */
  const changeSlide = (index) => {
    setActiveSlide(index);

    // Restart the automatic timer
    setTimerKey((current) => current + 1);
  };

  /*
   * Previous slide
   */
  const goToPrevious = () => {
    changeSlide(
      (activeSlide - 1 + slides.length) % slides.length
    );
  };

  /*
   * Next slide
   */
  const goToNext = () => {
    changeSlide(
      (activeSlide + 1) % slides.length
    );
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
              style={{
                backgroundColor: slide.color,
              }}
            />
          ))}
        </div>

        {/* Previous arrow */}
        <button
          className="hero-arrow hero-arrow-left"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <img src={left} alt="" />
        </button>

        {/* Next arrow */}
        <button
          className="hero-arrow hero-arrow-right"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <img src={right} alt="" />
        </button>

        {/* Pagination dots */}
        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot ${
                activeSlide === index ? "active" : ""
              }`}
              onClick={() => changeSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </section>
    </main>
  );
};

export default Home;