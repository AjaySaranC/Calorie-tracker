import React from 'react';
import './home.css';
import mediclogo from './mediclogo.png';
import homeimage from './homeimage.png'
import Content from './content';


const Home = () => {

  

  return (
    <>
    <section id="home" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>

    <div className='homecontent'>
        <span className='hello'>Hello,</span>
        
        <div className='docweb'>
          <span className='introtext'>welcome to 
          <span className='introname'> Doc<span className='introname2'>Web!</span></span><br/></span>
          <span><img src={mediclogo} alt="logo" className="logo" /></span>
        </div>
        
        <p className='intropara'>Welcome to our holistic health hub, where you can seamlessly monitor your daily calorie intake, 
        engage with a supportive mental illness chatbot, 
        and assess your risk of heart disease. Take charge of your well-being all in one place</p>
    </div>

      <img src={homeimage} alt="logo" className="homeimage" /><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Content/>
   </section>
   
   </>
  );
}

export default Home;
