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
  /*
   * Add the first slide again at the end.
   *
   * This allows:
   *
   * 1 → 2 → 3 → 4 → 1
   *
   * to visually continue moving forward.
   */
  const carouselSlides = [...slides, slides[0]];

  const [activeSlide, setActiveSlide] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [timerKey, setTimerKey] = useState(0);

  /*
   * Automatic sliding
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => current + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [timerKey]);

  /*
   * When the carousel reaches the cloned first slide,
   * wait until the animation finishes and then instantly
   * move back to the real first slide.
   */
  useEffect(() => {
    if (activeSlide === slides.length) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveSlide(0);

        /*
         * Re-enable the transition after the position
         * has been reset.
         */
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionEnabled(true);
          });
        });
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [activeSlide]);

  /*
   * Restart timer after manual navigation
   */
  const restartTimer = () => {
    setTimerKey((current) => current + 1);
  };

  /*
   * Previous slide
   */
  const goToPrevious = () => {
    setTransitionEnabled(true);

    setActiveSlide((current) => {
      if (current === 0) {
        /*
         * If we're on the first slide, go to the
         * real last slide.
         */
        return slides.length - 1;
      }

      return current - 1;
    });

    restartTimer();
  };

  /*
   * Next slide
   */
  const goToNext = () => {
    setTransitionEnabled(true);

    setActiveSlide((current) => current + 1);

    restartTimer();
  };

  /*
   * Dots
   */
  const goToSlide = (index) => {
    setTransitionEnabled(true);

    /*
     * If we're currently on the last slide and the
     * user clicks the first dot, use the cloned first
     * slide so it still moves forward.
     */
    if (activeSlide === slides.length - 1 && index === 0) {
      setActiveSlide(slides.length);
    } else {
      setActiveSlide(index);
    }

    restartTimer();
  };

  /*
   * The visible dot should always correspond to
   * the original four slides.
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