import React from 'react';
import "./customizePage.css"
import TopBar from '../topbar/TopBar';
import ProjectList from '../projectList/ProjectList';
import Sidebar from '../sidebar/Sidebar';

export default function CustomizePage() {
  return (
    <div className='customizePage'>
        <TopBar/>
        <div className="page">
            <ProjectList
                selectedCat={"CUSTOMIZE"}
            />
            <Sidebar/>
        </div>
    </div>
  )
}
