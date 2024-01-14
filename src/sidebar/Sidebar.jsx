import "./sidebar.css"
import React from 'react'
export default function Sidebar({sendDataToApp}) {

  return (
    <div className="sidebar">

      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="/assets/aboutImg.jpeg" alt=""/>
        <p className="aboutDesc">All for my two lovely children. Hope for them to have enjoyable and enriching Chinese leaning journey while residing the United States.</p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">Flashcard</li>
          <li className="sidebarListItem">Bingo</li>
          <li className="sidebarListItem">Word Search</li>
        </ul>
      </div>
    </div>
  )
}
