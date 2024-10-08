import React, { useState, useEffect } from 'react';
import './navbar.css';
import logo from './chatbot.png';
import { Link } from 'react-scroll';
import { useNavigate } from "react-router-dom";
import { database } from './firebase';
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // Declare useNavigate hook

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = database.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handlesignout = () =>{
    signOut(database).then(val=>{
        console.log(val,"val")
        navigate('/')
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100; // Adjust the value as needed
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    navigate("/");
  };

  const handleCon = () => {
    navigate("/contact");
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <img src={logo} alt="logo" className="logo" />
      <p className='title'>DocWeb</p>
      <div className='navmenu'>
        <Link activeClass='active' to='home' spy={true} smooth={true} offset={-100} duration={500} className='navmenulist' onClick={handleClick}>Home</Link>
        <Link to="/about" className='navmenulist' onClick={() => navigate('/about')}>About</Link> {/* Adjust this link to navigate to the correct route */}
        <Link to="/conduct" className='navmenulist' onClick={handleCon}>Conduct</Link> {/* Adjust this link to navigate to the correct route */}
      </div>
      {user ? (
        <button style={{ marginLeft: '20px', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handlesignout}>Sign Out</button>
      ) : (
        <button style={{ marginLeft: '20px', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => navigate('/signup')}>Sign In</button>
      )}
    </nav>
  );
}

export default Navbar;
