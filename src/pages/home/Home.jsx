import { Link } from 'react-router-dom';
import '../../../src/pages/getStarted/GetStarted';
import Navbar from '../home/components/Navbar';
import HeroSection from  '../home/components/HeroSection';
import Footer from   '../home/components/Footer';

const HomePage = () => {
  return (
    <div>
  
      <Navbar />
      <HeroSection />
      
      <Footer />
    </div>
  );
};

export default HomePage;



