import React from 'react';
import "./topbar.css";

export default function TopBar() {

  return (
    <div className='top'>
        <img className="topIcon" src="/assets/footprint.png" alt="logo" />
        <ul className="menu">
            <li className="menuItem"><a href="/">HOME</a></li>
            <li className="menuItem"><a href="/customize">CUSTOMIZE</a></li>
            <li className="menuItem"><a href="/hanzi500">HANZI 500</a></li>
        </ul>
    </div>
  )
}
