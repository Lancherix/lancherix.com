import { useState } from 'react';
import './Home.css';
import logoStudio from '../ArtWork/LancherixStudioLogoWhiteWhite.png';
import tasks from '../ArtWork/Tasks.png';
import notes from '../ArtWork/Notes.png';
import board from '../ArtWork/Board.png';
import home from '../ArtWork/Home.png';
import aspect from '../ArtWork/Aspect.png';

function Home() {
  const [activeFeature, setActiveFeature] = useState('tasks');

  const featureImages = {
    tasks,
    notes,
    board,
  };

  return (
    <div className="Home">
      <div className='Home-HeroStudio'>
        <img src={logoStudio} alt="" />
        <h1>Your Studio, Your Way.</h1>
        <p>Lancherix Studio is designed to support thoughtful work from idea to execution. It provides a unified space where projects, systems, and creative processes come together naturally. Organize your work with structure that adapts as your ideas evolve. Shape projects as complete systems, with context always within reach. Build, refine, and grow over time in a studio designed for clarity and focus. With Lancherix Studio, you can work with intention — every step of the way.</p>
        <div>
          <button
            onClick={() =>
              window.open(
                'https://studio.lancherix.com/register',
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            Register
          </button>
          <button
            onClick={() =>
              window.open(
                'https://studio.lancherix.com/login',
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            Login
          </button>
        </div>
      </div>

      <div className='Home-SecondaryStudio'>
        <h1>Designed around how work actually unfolds.</h1>
        <p>Work rarely moves in straight lines. Ideas evolve, priorities shift, and projects grow in complexity over time. Lancherix Studio is designed to support that natural process — giving structure when you need it, and flexibility when you don’t.</p>
      </div>

      <div className='Home-FeaturesStudio'>
        {/* Image changes based on active feature */}
        <img src={featureImages[activeFeature]} alt={activeFeature} />

        <div className='Home-FeaturesOptionsStudio'>
          <button
            className={activeFeature === 'tasks' ? 'active' : ''}
            onClick={() => setActiveFeature('tasks')}
          >
            Tasks
          </button>

          <button
            className={activeFeature === 'notes' ? 'active' : ''}
            onClick={() => setActiveFeature('notes')}
          >
            Notes
          </button>

          <button
            className={activeFeature === 'board' ? 'active' : ''}
            onClick={() => setActiveFeature('board')}
          >
            Board
          </button>
        </div>
      </div>
      <div className='Home-AspectStudio'>
        <img src={home} alt="" className='Home-AspectImg1Studio' />
        <div className='Home-AspectStudio2'>
          <h1>Make it Your Own</h1>
          <p>
            Your workspace should feel personal, not generic.
            Lancherix Studio lets you shape the environment you work in — from wallpapers and accent colors
            to light, glass, and dark modes.
            Adjust the look and feel to match your focus, your mood, and the way you think.
            When the space reflects you, work feels more natural and intentional.
          </p>
        </div>
        <img src={aspect} alt="" className='Home-AspectImg2Studio' />
      </div>
    </div>
  );
}

export default Home;