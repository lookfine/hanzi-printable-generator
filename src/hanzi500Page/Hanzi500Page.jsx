import React from 'react';
import "./hanzi500Page.css";
import TopBar from '../topbar/TopBar';
import ProjectList from '../projectList/ProjectList';
import Sidebar from '../sidebar/Sidebar';

export default function Hanzi500Page() {
  return (
    <div className='hanzi500Page'>
        <TopBar/>
        <div className="page">
            <ProjectList
                selectedCat={"HANZI 500"}
            />
            <Sidebar/>
        </div>
    </div>
  )
}
