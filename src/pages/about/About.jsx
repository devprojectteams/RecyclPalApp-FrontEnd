import React from 'react';
import Image1 from "./asset/about-us-web-header-design-icon-interconnected-vector-42531494.jpg";
import './AboutUs.css';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

const images = [
  Image1
  ];

const AboutUs = () => {
  return (
    <>
       <Navbar  className="navbar"/>
       <div className='main-content-start'></div>
    <div className="about-us">
     
       
      <div className="about-us-image">    

      <img src={images} alt="about us" />
      </div>

      <div className="about-us-inner">
      <h1 className='about title'> About Us </h1>
    
<h1>Welcome to RecyclPal! </h1>

At RecyclPal, we are passionate about making the world a greener and more sustainable place. 
Our mission is to empower individuals and businesses to contribute to environmental conservation 
by promoting responsible waste management and recycling practices.

<h1>Our Vision</h1>

We envision a future where waste is no longer seen as a burden but as a valuable resource that can be reused and repurposed. 
Our vision is to create a circular economy where products are designed with recycling in mind, waste is minimized, 
and the ecosystem thrives.

<h1> Our Mission</h1>

Our primary mission is to make recycling accessible, convenient, and rewarding for everyone. 
We aim to educate and engage individuals, communities, and businesses in adopting sustainable 
practices that have a positive impact on the environment.

<h1> Why RecyclPal? </h1>

Sustainability at the Core: Sustainability is not just a buzzword for us; it's at the heart of everything we do. 
We strive to make eco-friendly choices a seamless part of everyday life.

<h1> User-Friendly Platform: </h1>

We believe that sustainability should be easy and enjoyable. Our user-friendly platform ensures 
a hassle-free recycling experience for all.

<h1> Innovative Recycling Solutions: </h1>

We continuously seek innovative ways to encourage recycling and promote the responsible disposal of waste.

<h2> Community Engagement: </h2>

We value the power of communities in driving change. We actively engage and support local initiatives to create a 
larger positive impact.

<h2> Transparency and Trust: </h2>

Trust is paramount in what we do. We maintain transparency in our processes and provide regular updates on 
the impact we are making together.

<h1>Our Services </h1>
Recycling Resources: 

We provide a wealth of resources and information about recycling, helping individuals and businesses understand the 
importance of responsible waste management.

<h1> Recycling Collection Points:</h1>

Our platform connects you with nearby recycling centers, drop-off locations, and pick-up services, 
making recycling more convenient than ever.

<h1> Rewards Program:  </h1>

Recycling should be rewarding! Earn points and redeem exciting rewards for your eco-conscious efforts.

Educational Programs: We conduct workshops, webinars, and awareness campaigns to spread knowledge about sustainable practices and their positive effects on the environment.

<h1> Join Us in Our Journey  </h1>
At RecyclPal, we firmly believe that every small step counts towards a larger positive change. Join us in our journey to create a greener, cleaner, and more sustainable world for generations to come.

Together, let's RecyclPal our planet!

 For any inquiries or collaboration opportunities, feel free to reach out to us at contact <a href='#'> @recyclpal.com</a>.
 {/*<a href="mailto:contact@recyclpal.com">@recyclpal.com</a> */}
      </div>
      <div className='main-content-end'></div>

    <Footer className="footer"/>
    </div>
    </>
  );
};

export default AboutUs;
