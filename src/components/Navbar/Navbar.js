import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar-bg-container'>
        <div className='nav-inner-cont'>
            <img src='/img/logo.svg' alt='logo' className='logo'/>
            <div className='nav-mid-section'>
                <p>For Business</p>
                <p>For Developers</p>
                <p>Blog</p>
                <p>Abous Us</p>
            </div>

            <div className='nav-last-sec'>
                <img src="/img/twitter.svg" alt="twitter" className='twitter-icon'/>
                <img src="/img/discord.svg" alt="discord" className='discord-icon'/>
                <button className='login-btn'>Login</button>
                <button className='signup-btn'>Sign Up</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar
