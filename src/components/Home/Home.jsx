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
  const carouselSlides = [...slides, slides[0]];

  const [activeSlide, setActiveSlide] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  /*
   * Automatic slide timer
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide((current) => current + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeSlide]);

  /*
   * When reaching the cloned first slide,
   * wait for the animation to finish and
   * silently return to the real first slide.
   */
  useEffect(() => {
    if (activeSlide !== slides.length) {
      return;
    }

    const resetTimer = setTimeout(() => {
      setTransitionEnabled(false);
      setActiveSlide(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }, 800);

    return () => clearTimeout(resetTimer);
  }, [activeSlide]);

  /*
   * Previous
   */
  const goToPrevious = () => {
    setTransitionEnabled(true);

    if (activeSlide === 0) {
      setActiveSlide(slides.length - 1);
    } else {
      setActiveSlide((current) => current - 1);
    }
  };

  /*
   * Next
   */
  const goToNext = () => {
    setTransitionEnabled(true);
    setActiveSlide((current) => current + 1);
  };

  /*
   * Dots
   */
  const goToSlide = (index) => {
    setTransitionEnabled(true);

    /*
     * If we're on slide 4 and choose slide 1,
     * use the cloned slide so the movement stays forward.
     */
    if (activeSlide === slides.length - 1 && index === 0) {
      setActiveSlide(slides.length);
    } else {
      setActiveSlide(index);
    }
  };

  /*
   * The cloned first slide still represents
   * the first pagination dot.
   */
  const visibleSlide =
    activeSlide === slides.length ? 0 : activeSlide;

  return (
    <main className="home">
      <section className="hero">

        {/* Slides */}
        <div
          className="hero-track"
          style={{
            transform: `translateX(-${activeSlide * 100}%)`,
            transition: transitionEnabled
              ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >
          {carouselSlides.map((slide, index) => (
            <div
              className="hero-slide"
              key={`${slide.id}-${index}`}
              style={{
                backgroundColor: slide.color,
              }}
            />
          ))}
        </div>

        {/* Previous */}
        <button
          className="hero-arrow hero-arrow-left"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <img src={left} alt="" />
        </button>

        {/* Next */}
        <button
          className="hero-arrow hero-arrow-right"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <img src={right} alt="" />
        </button>

        {/* Dots */}
        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot ${
                visibleSlide === index ? "active" : ""
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