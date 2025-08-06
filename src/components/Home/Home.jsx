import './Home.css';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="Home">
      <div className='Home-Hero'>
        <h1>Your Studio, Your Way.</h1>
        <a href="https://studio.lancherix.com/register" target='blanck_'>Discover the power of Lancherix Studio</a>
      </div>
    </div>
  );
}

export default Home;