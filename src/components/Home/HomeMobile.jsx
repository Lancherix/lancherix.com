import { useState } from "react";
import "./HomeMobile.css";

import logoStudio from "../ArtWork/LancherixStudioLogoWhiteWhite.png";
import tasks from "../ArtWork/Tasks.png";
import notes from "../ArtWork/Notes.png";
import board from "../ArtWork/Board.png";
import home from "../ArtWork/Home.png";
import aspect from "../ArtWork/Aspect.png";

function HomeMobile() {

  const [activeFeature, setActiveFeature] = useState("tasks");

  const featureImages = {
    tasks,
    notes,
    board
  };

  return (
    <div className="HomeMobile">

      {/* HERO */}

      <section className="HomeMobile-Hero">

        <img src={logoStudio} alt="Studio Logo"/>

        <h1>Your Studio, Your Way.</h1>

        <p>Lancherix Studio is designed to support thoughtful work from idea to execution. It provides a unified space where projects, systems, and creative processes come together naturally. Organize your work with structure that adapts as your ideas evolve. Shape projects as complete systems, with context always within reach. Build, refine, and grow over time in a studio designed for clarity and focus. With Lancherix Studio, you can work with intention — every step of the way.</p>

        <div className="HomeMobile-HeroButtons">

          <button
            onClick={() =>
              window.open(
                "https://studio.lancherix.com/register",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Register
          </button>

          <button
            onClick={() =>
              window.open(
                "https://studio.lancherix.com/login",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Login
          </button>

        </div>

      </section>

      {/* SECONDARY */}

      <section className="HomeMobile-Secondary">

        <h2>Designed around how work actually unfolds.</h2>

        <p>
          Ideas evolve, priorities shift and projects grow in complexity.
          Lancherix Studio supports that natural process by combining
          structure with flexibility.
        </p>

      </section>

      {/* FEATURES */}

      <section className="HomeMobile-Features">

        <div className="HomeMobile-FeatureButtons">

          <button
            className={activeFeature === "tasks" ? "active" : ""}
            onClick={() => setActiveFeature("tasks")}
          >
            Tasks
          </button>

          <button
            className={activeFeature === "notes" ? "active" : ""}
            onClick={() => setActiveFeature("notes")}
          >
            Notes
          </button>

          <button
            className={activeFeature === "board" ? "active" : ""}
            onClick={() => setActiveFeature("board")}
          >
            Board
          </button>

        </div>

        <img
          src={featureImages[activeFeature]}
          alt={activeFeature}
        />

      </section>

      {/* ASPECT */}

      <section className="HomeMobile-Aspect">

        <img src={home} alt="" />

        <h2>Make it Your Own.</h2>

        <p>
          Your workspace should feel personal. Adjust wallpapers,
          accent colors and themes to match the way you think and work.
        </p>

        <img src={aspect} alt="" />

      </section>

    </div>
  );
}

export default HomeMobile;