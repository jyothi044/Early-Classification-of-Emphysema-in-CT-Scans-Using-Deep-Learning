import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import menu from '../images/menu-icon.png'

const Header = () => {
  const [clicked,setClicked]=useState(false);
  const handleClick=()=>{
    if(clicked){
      setClicked(false)
    }else{
      setClicked(true)
    }
    
  }
  return (
    <div className="header">
        <h2 className='proj-name'>Emphysema Detection</h2>
        <div className='nav-links'>
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='typesofemphysema'>Types of Emphysema</Link></li>
          </ul>
        </div>
        <div className='menu' onClick={handleClick}><img src={menu } /></div>
        <div className='side-bar' style={clicked?{display:"block"}:{display:"none"}}>
        <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='typesofemphysema'>Types of Emphysema</Link></li>
        </ul>
        </div>
    </div>
    
  )
}
export default Header