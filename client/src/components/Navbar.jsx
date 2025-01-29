
    import React, {useState} from 'react'
    import { Link } from 'react-router-dom'
    import { NavLink } from 'react-router-dom'
    import "./Navbar.css"
    import {GiAbstract049} from "react-icons/gi" //find a seperate icon for logo
    import {FaBars, FaTimes} from "react-icons/fa"
    import {IconContext} from "react-icons"
    
    
    const Navbar = () => {
      const[click, setClick] = useState(false)
    
      const handleClick = () =>  setClick(!click)
      const closeMobileMenu = () => {setClick(false); window.scrollTo(0, 0)}
        
      
      
      return (
        <>
          <IconContext.Provider value={{color:"#fff"}}>
            <nav className="navbar">
                <div className="navbar-container container">
                    <Link to="/" className='navbar-logo' onClick={closeMobileMenu} style={{'marginBottom': '2%'}}>
                        <GiAbstract049 className='navbar-icon'
                        />
                        Hackworth
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                      {click? <FaTimes/>:<FaBars/>}
                    </div>
                    <ul className={click? "nav-menu active": "nav-menu"}>
                      <li className='nav-item'>
                        <NavLink to="/" className={({ isActive }) => "nav-links" + (isActive? " activated": '')} onClick={closeMobileMenu}>
                          Home
                        </NavLink>
                      </li>
                    </ul>
                </div>
            </nav>
          </IconContext.Provider>
        </>
      )
    }
    
    export default Navbar
    